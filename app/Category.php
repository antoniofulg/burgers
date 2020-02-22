<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $appends = ['snacks_count'];

    protected $table = 'categories';

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $fillable = [
        'name', 'description'
    ];

    public function snacks() {
        return $this->hasMany('App\Snack', 'category_id');
    }

    public function getSnacksCountAttribute() {
        return $this->snacks()->count();
    }
}
