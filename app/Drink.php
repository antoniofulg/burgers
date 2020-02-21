<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'category', 'status', 'volume', 'price'
    ];

    public function orders() {
        $this->belongsToMany('App/Order');
    }
}
