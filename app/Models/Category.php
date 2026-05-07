<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends AbstractModel
{
    public function rfqs(): HasMany
    {
        return $this->hasMany(Rfq::class);
    }

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
