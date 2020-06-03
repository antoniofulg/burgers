<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Burger extends Model
{
    use SoftDeletes;

    protected $appends = ['ingredients'];
    
    protected $fillable = [
        'name', 'status', 'price'
    ];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    public function getCreationDateAttribute() {
        return $this->created_at->format('H:i:s d/m/Y');
    }

    public function getIngredientsAttribute() {
        return $this->ingredient()->get();
    }

    public function ingredient() {
        return $this->hasMany('App\IngredientBurger');
    }

//     public function orders() {
//         return $this->belongsToMany('App\Order');
//     }
}
