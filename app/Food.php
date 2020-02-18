<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'status', 'price'
    ];

    public function orders() {
        $this->belongsToMany('App/Order');
    }
}
