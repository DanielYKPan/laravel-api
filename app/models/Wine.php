<?php

class Wine extends \Eloquent {
	protected $fillable = [];

    protected $hidden = ['created_at', 'updated_at'];


    public function wineDetail()
    {
        return $this->hasOne('WineDetail');
    }

    public function country()
    {
        return $this->belongsTo('Country');
    }

    public function type()
    {
        return $this->belongsTo('Type');
    }

    public function varieties()
    {
        return $this->belongsToMany('Variety')->withTimestamps();
    }

    public function scopeWineType($query, array $wine_types)
    {
        return $query->whereHas('type', function($q) use ($wine_types){
                                                    $q->whereIn('name', $wine_types);
                                                }
        );
    }

    public function scopeWineVariety($query, array $wine_varieties)
    {
        return $query->whereHas('varieties', function($q) use ($wine_varieties){
                                                    $q->whereIn('name', $wine_varieties);
                                                }
        );
    }

    public function scopeWineCountry($query, array $wine_countries)
    {
        return $query->whereHas('countries', function($q) use ($wine_countries){
                $q->whereIn('name', $wine_countries);
            }
        );
    }

    public function scopeWinePrice($query, array $wine_price_range)
    {
        return $query->whereBetween('price', $wine_price_range);
    }
}