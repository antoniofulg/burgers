<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Burguer extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'name', 'status', 'price'
    ];

    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];

    public function getCreationDateAttribute() {
        return $this->created_at->format('H:i:s d/m/Y');
    }

    public function ingredients() {
        $this->belongsToMany('App\Ingredient');
    }

    public function orders() {
        $this->belongsToMany('App\Order');
    }
}
