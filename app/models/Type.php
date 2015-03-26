<?php

class Type extends \Eloquent {
	protected $fillable = [];

    protected $hidden = ['created_at', 'updated_at'];

    public function wines()
    {
        return $this->hasMany('Wine');
    }

    public function varieties()
    {
        return $this->hasMany('Variety');
    }
}