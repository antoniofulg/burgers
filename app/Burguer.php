<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Burguer extends Model
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
        return $this->ingredients();
    }

    public function ingredients() {
        return $this->hasMany('App\IngredientBurguer')->get();
    }

//     public function orders() {
//         return $this->belongsToMany('App\Order');
//     }
}
