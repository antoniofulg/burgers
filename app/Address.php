<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'city', 'district', 'number', 'street', 'reference', 'user_id', 'zip_code'
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'addresses';

    public function user() {
        return $this->belongsTo('App\User');
    }
}
