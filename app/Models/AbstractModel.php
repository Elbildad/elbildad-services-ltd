<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

abstract class AbstractModel extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = [];

    public $incrementing = false;

    protected $keyType = 'string';
}
