<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $table = 'categories';

    protected $primaryKey = 'id';

    protected $fillable = [
        'name', 'description'
    ];

    public function snacks() {
        return $this->hasMany('App/Snack', 'category_id', 'id');
    }
}
