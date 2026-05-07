<?php

namespace App\Http\Controllers;

use App\Models\Rfq;
use Illuminate\Http\Request;
use Illuminate\View\View;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on the user role.
     */
    public function index(Request $request): Response|\Illuminate\View\View
    {
        $user = $request->user();

        if ($user->hasRole('admin') || $user->hasRole('owner')) {
            return $this->adminDashboard($user);
        }

        // For now, keep others as Blade or update them later
        if ($user->hasRole('super_agent') || $user->hasRole('agent')) {
            return $this->agentDashboard($user);
        }

        return $this->customerDashboard($user);
    }

    private function adminDashboard($user): Response
    {
        $stats = [
            [
                'title' => 'Total RFQs',
                'value' => Rfq::count(),
                'icon' => 'rfq',
                'color' => 'blue'
            ],
            [
                'title' => 'Pending RFQs',
                'value' => Rfq::where('status', 'pending')->count(),
                'icon' => 'pending',
                'color' => 'orange'
            ],
            [
                'title' => 'Assigned RFQs',
                'value' => Rfq::where('status', 'assigned')->count(),
                'icon' => 'assigned',
                'color' => 'green'
            ],
            [
                'title' => 'Total Users',
                'value' => \App\Models\User::count(),
                'icon' => 'users',
                'color' => 'purple'
            ]
        ];

        $recent_rfqs = Rfq::with('assignedAgent')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function($rfq) {
                return [
                    'id' => $rfq->id,
                    'product_name' => $rfq->product_name,
                    'status' => $rfq->status,
                    'created_at_formatted' => $rfq->created_at->format('M d, Y'),
                    'assigned_agent' => $rfq->assignedAgent ? ['name' => $rfq->assignedAgent->name] : null
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_rfqs' => $recent_rfqs
        ]);
    }

    private function agentDashboard($user): Response
    {
        $rfqs = Rfq::where('assigned_agent_id', $user->id)
            ->with(['customer:id,name,whatsapp_number,email'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($rfq) => [
                'id'                     => $rfq->id,
                'tracking_token'         => $rfq->tracking_token,
                'product_name'           => $rfq->product_name,
                'specifications'         => $rfq->specifications,
                'additional_requirements'=> $rfq->additional_requirements,
                'quantity'               => $rfq->quantity->value,
                'delivery_method'        => $rfq->delivery_method->value,
                'target_price'           => $rfq->target_price,
                'location'               => $rfq->location,
                'company_name'           => $rfq->company_name,
                'status'                 => $rfq->status->value,
                'created_at_formatted'   => $rfq->created_at->format('M d, Y'),
                'customer'               => $rfq->customer ? [
                    'name'             => $rfq->customer->name,
                    'email'            => $rfq->customer->email,
                    'whatsapp_number'  => $rfq->customer->whatsapp_number,
                ] : null,
            ]);

        $stats = [
            ['title' => 'Total Assigned',  'value' => $rfqs->count(),                                                        'color' => 'blue'],
            ['title' => 'Pending / New',   'value' => $rfqs->whereIn('status', ['pending','assigned','queued'])->count(),     'color' => 'orange'],
            ['title' => 'In Progress',     'value' => $rfqs->whereIn('status', ['sourcing','purchased','shipped'])->count(),  'color' => 'purple'],
            ['title' => 'Completed',       'value' => $rfqs->where('status', 'completed')->count(),                           'color' => 'green'],
        ];

        return Inertia::render('Agent/Dashboard', [
            'rfqs'  => $rfqs,
            'stats' => $stats,
        ]);
    }

    private function customerDashboard($user): Response
    {
        $rfqs = Rfq::where('customer_id', $user->id)
            ->with(['assignedAgent:id,name,whatsapp_number'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($rfq) => [
                'id'                     => $rfq->id,
                'tracking_token'         => $rfq->tracking_token,
                'product_name'           => $rfq->product_name,
                'status'                 => $rfq->status->value,
                'created_at_formatted'   => $rfq->created_at->format('M d, Y'),
                'assigned_agent'         => $rfq->assignedAgent ? [
                    'name'             => $rfq->assignedAgent->name,
                    'whatsapp_number'  => $rfq->assignedAgent->whatsapp_number,
                ] : null,
            ]);

        $stats = [
            ['title' => 'Total Requests', 'value' => $rfqs->count(), 'color' => 'blue'],
            ['title' => 'Pending',        'value' => $rfqs->where('status', 'pending')->count() + $rfqs->where('status', 'assigned')->count(), 'color' => 'orange'],
            ['title' => 'In Progress',    'value' => $rfqs->whereIn('status', ['sourcing', 'purchased', 'shipped'])->count(), 'color' => 'purple'],
            ['title' => 'Completed',      'value' => $rfqs->where('status', 'completed')->count(), 'color' => 'green'],
        ];

        return Inertia::render('Customer/Dashboard', [
            'rfqs'  => $rfqs,
            'stats' => $stats,
        ]);
    }
}
