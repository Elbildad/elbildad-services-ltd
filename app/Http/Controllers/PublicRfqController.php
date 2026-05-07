<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubmitRfqRequest;
use App\Services\Rfq\RfqService;
use Illuminate\Http\JsonResponse;

use App\Models\Rfq;
use App\Models\User;
use App\Models\AgentRfqAssignment;
use App\Jobs\ProcessRfqWithAI;
use App\Events\RfqQueued;
use App\Enums\RfqStatusEnum;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PublicRfqController extends Controller
{
    public function submit(SubmitRfqRequest $request)
    {
        $data = $request->validated();
        
        $user = auth()->user();

        if (!$user) {
            // Try to find by WhatsApp first
            $user = User::where('whatsapp_number', $data['whatsapp_number'])->first();
            
            // If not found by WhatsApp, try by email (if provided)
            if (!$user && !empty($data['email'])) {
                $user = User::where('email', $data['email'])->first();
            }

            if (!$user) {
                $randomPassword = Str::random(10);
                $user = User::create([
                    'name' => $data['full_name'],
                    'whatsapp_number' => $data['whatsapp_number'],
                    'email' => $data['email'] ?? null,
                    'password' => bcrypt($randomPassword),
                ]);
                
                // $user->assignRole('customer');
                Log::info("WhatsApp Stub: Account created for {$user->whatsapp_number}. Password: {$randomPassword}");
            }
        }

        $rfq = Rfq::create([
            'customer_id' => $user->id,
            'product_name' => $data['product_name'],
            'specifications' => $data['specifications'],
            'additional_requirements' => $data['additional_requirements'] ?? null,
            'quantity' => $data['quantity'],
            'delivery_method' => $data['delivery_method'],
            'target_price' => $data['target_price'] ?? null,
            'location' => $data['location'] ?? null,
            'company_name' => $data['company_name'] ?? null,
            'status' => RfqStatusEnum::PENDING->value,
            'tracking_token' => Str::uuid()->toString(),
        ]);

        // Direct Assignment Logic
        $this->assignRfq($rfq);

        ProcessRfqWithAI::dispatch($rfq);

        return redirect()->route('rfq.track', $rfq->tracking_token)
            ->with('success', 'RFQ submitted successfully! Your tracking token is: ' . $rfq->tracking_token);
    }

    private function assignRfq(Rfq $rfq): void
    {
        $agent = $this->findAgent('agent', $rfq->category_id);

        if (!$agent) {
            $agent = $this->findAgent('super_agent');
        }

        if ($agent) {
            AgentRfqAssignment::create([
                'rfq_id' => $rfq->id,
                'agent_id' => $agent->id,
                'assigned_at' => now(),
                'is_active' => true,
            ]);

            $rfq->update([
                'assigned_agent_id' => $agent->id,
                'status' => RfqStatusEnum::ASSIGNED->value,
            ]);
        } else {
            $rfq->update(['status' => RfqStatusEnum::QUEUED->value]);
            event(new RfqQueued($rfq));
        }
    }

    private function findAgent(string $role, ?string $categoryId = null): ?User
    {
        $query = User::role($role)
            ->withCount(['rfqAssignments as active_count' => function ($q) {
                $q->where('is_active', true);
            }])
            ->having('active_count', '<', 5)
            ->orderBy('active_count', 'asc');

        if ($categoryId && $role === 'agent') {
            $query->whereHas('categories', fn($q) => $q->where('categories.id', $categoryId));
        }

        return $query->first();
    }
}
