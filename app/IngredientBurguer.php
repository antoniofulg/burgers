<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IngredientBurguer extends Model
{
    use SoftDeletes;

    protected $appends = ['name'];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $fillable = [
        'burguer_id', 'ingredient_id', 'category', 'amount'
    ];

    public function getNameAttribute() {
        return $this->ingredient() ? $this->ingredient()->name : null;
    }

    public function ingredient() {
        return $this->hasOne('App\Ingredient', 'id', 'ingredient_id')->first();
    }

}
