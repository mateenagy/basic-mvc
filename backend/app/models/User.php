<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent {
    public $name;

    protected $fillable = ['username', 'full_name', 'email', 'access_token', 'password'];
}