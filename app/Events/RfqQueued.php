<?php

namespace App\Events;

use App\Models\Rfq;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RfqQueued
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Rfq $rfq;

    /**
     * Create a new event instance.
     */
    public function __construct(Rfq $rfq)
    {
        $this->rfq = $rfq;
    }
}
