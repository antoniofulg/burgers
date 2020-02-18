<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Burguer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status', 'price'
    ];

    public function ingredients() {
        $this->belongsToMany('App/Ingredient');
    }

    public function orders() {
        $this->belongsToMany('App/Order');
    }
}
