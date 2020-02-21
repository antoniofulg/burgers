<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use SoftDeletes;

    protected $appends = [
        'creation_date'
    ];

    protected $fillable = [
        'category', 'status', 'price', 'name'
    ];

    protected $hidden = [
        'created_at'
    ];

    public function getCreationDateAttribute() {
        return $this->created_at->format('d/m/Y');
    }
}
