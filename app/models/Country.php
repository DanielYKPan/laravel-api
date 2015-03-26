<?php

class Country extends \Eloquent {
	protected $fillable = [];

    protected $hidden = ['created_at', 'updated_at'];

    public function wines()
    {
        return $this->hasMany('Wine');
    }
}