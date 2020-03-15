<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IngredientBurguer extends Model
{
    use SoftDeletes;

    protected $appends = ['ingredient_name'];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    protected $fillable = [
        'burguer_id', 'ingredient_id', 'category', 'amount'
    ];

    public function getIngredientNameAttribute() {
        return $this->ingredient()->name;
    }

    public function ingredient() {
        return $this->hasOne('App\Ingredient', 'id', 'ingredient_id')->first();
    }

}
