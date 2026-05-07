<?php

namespace App\Http\Controllers;

use App\Models\Rfq;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{
    public function track(string $token)
    {
        $rfq = Rfq::where('tracking_token', $token)
            ->with(['category', 'assignedAgent:id,name,whatsapp_number', 'customer:id,name'])
            ->firstOrFail();

        return view('tracking.show', compact('rfq'));
    }
}
