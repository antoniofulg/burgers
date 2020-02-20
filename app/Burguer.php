<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Burguer extends Model
{
    protected $appends = [
        'creation_date'
    ];

    protected $fillable = [
        'name', 'status', 'price'
    ];

    protected $hidden = [
        'created_at'
    ];

    public function getCreationDateAttribute() {
        return $this->created_at->format('H:i:s d/m/Y');
    }

    public function ingredients() {
        $this->belongsToMany('App/Ingredient');
    }

    public function orders() {
        $this->belongsToMany('App/Order');
    }
}
