<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'access_level', 'facebook_uid', 'google_uid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'facebook_uid', 'google_uid', 'password', 'remember_token', 
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //Talvez dê pal pela nomenclatura do model
    public function addresses() {
        return $this->hasMany('App\Address');
    }

    public function orders() {
        return $this->hasMany('App\Order');
    }

    public function phones() {
        return $this->hasMany('App\Phone');
    }
}
