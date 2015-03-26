<?php

class WineDetail extends \Eloquent {
	protected $fillable = [];

    protected $hidden = ['id', 'wine_id','created_at', 'updated_at'];

    public function wine()
    {
        return $this->belongsTo('Wine');
    }

    public function getUSPAttribute()
    {
        $USP = $this->select(['usp_1', 'usp_2', 'usp_3'])->firstOrFail()->toArray();
        return $USP;
    }

    public function getAlcoholAttribute($value)
    {
        return $value? $value."%" : null;
    }
}