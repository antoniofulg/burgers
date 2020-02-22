<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Snack extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'status', 'price'
    ];

    public function orders() {
        return $this->belongsToMany('App/Order');
    }

    public function categories() {
        return $this->belongsTo('App/Category', 'id', 'category_id');
    }
}
