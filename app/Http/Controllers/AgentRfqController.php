<?php

namespace App\Http\Controllers;

use App\Enums\RfqStatusEnum;
use App\Models\Rfq;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AgentRfqController extends Controller
{
    /**
     * Update the sourcing status of an assigned RFQ.
     * Only the assigned agent may update.
     */
    public function updateStatus(Request $request, Rfq $rfq)
    {
        if ($rfq->assigned_agent_id !== auth()->id()) {
            abort(403, 'You are not assigned to this RFQ.');
        }

        $validated = $request->validate([
            'status' => ['required', Rule::enum(RfqStatusEnum::class)],
            'notes'  => ['nullable', 'string', 'max:1000'],
        ]);

        $rfq->update(['status' => $validated['status']]);

        return back()->with('success', "RFQ #{$rfq->product_name} status updated to " . ucfirst($validated['status']) . '.');
    }

    /**
     * Update the agent's own profile info (name, whatsapp).
     */
    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'name'             => ['required', 'string', 'max:255'],
            'whatsapp_number'  => ['nullable', 'string', 'max:20'],
        ]);

        auth()->user()->update($validated);

        return back()->with('success', 'Profile updated successfully.');
    }
}
