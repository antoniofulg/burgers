<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Snack extends Model
{
    use SoftDeletes;

    protected $appends = ['category'];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at', 'category_id'
    ];

    protected $fillable = [
        'name', 'description', 'status', 'price', 'category_id'
    ];

    public function orders() {
        return $this->belongsToMany('App\Order');
    }

    public function category() {
        return $this->belongsTo('App\Category', 'category_id');
    }

    public function getCategoryAttribute() {
        return $this->category()->first();
    }
}
