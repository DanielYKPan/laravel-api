<?php

class Variety extends \Eloquent {
	protected $fillable = [];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = array('id', 'created_at', 'updated_at');

    public function wines()
    {
        return $this->belongsToMany('Wine');
    }

    public function type()
    {
        return $this->belongsTo('Type');
    }
}