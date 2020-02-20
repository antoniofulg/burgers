<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $appends = [
        'creation_date'
    ];

    protected $fillable = [
        'type', 'status', 'price', 'name'
    ];

    protected $hidden = [
        'created_at'
    ];

    public function getCreationDateAttribute() {
        return $this->created_at->format('H:i:s d/m/Y');
    }
}
