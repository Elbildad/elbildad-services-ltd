<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgentRfqAssignment extends AbstractModel
{
    protected function casts(): array
    {
        return [
            'assigned_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function rfq(): BelongsTo
    {
        return $this->belongsTo(Rfq::class);
    }

    public function agent(): BelongsTo
    {
        return $this->belongsTo(User::class, 'agent_id');
    }
}
