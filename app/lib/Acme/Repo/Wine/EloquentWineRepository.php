<?php


namespace Acme\Repo\Wine;


use Illuminate\Database\Eloquent\Model;

/**
 * Class EloquentWineRepository
 * @package Acme\Repo\Wine
 */
class EloquentWineRepository implements WineRepositoryInterface {

    /**
     * @var Model
     */
    private $wine;

    /**
     * @var Model
     */
    private $variety;

    /**
     * @var Model
     */
    private $type;
    /**
     * @var Model
     */
    private $country;

    /**
     * @param Model $wine
     * @param Model $variety
     * @param Model $type
     * @param Model $country
     */
    public function __construct(
                                    Model $wine,
                                    Model $variety,
                                    Model $type,
                                    Model $country
                                )
    {

        $this->wine = $wine;
        $this->variety = $variety;
        $this->type = $type;
        $this->country = $country;
    }

    /**
     * Get all wines
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function fetchAllWines()
    {
        return $this->wine->all();
    }

    /**
     * Get a specific wine
     *
     * @param $product_code
     * @return mixed
     */
    public function fetchSpecificWine($product_code)
    {
        $wine =  $this->wine->where('product_code','=', $product_code)->firstOrFail();
        $wine->load('type', 'country', 'wineDetail');
        return $wine;
    }

    /**
     * @param array $wine_types
     * @return array
     */
    public function fetchVarieties(array $wine_types = null)
    {
        if(! $wine_types) {
            $wine_varieties =  $this->variety->all();
        } else {
            $wine_varieties = $this->variety->whereHas('type', function($q) use ($wine_types){
                                                                $q->whereIn('name', $wine_types);
                                                            }
            )->get();
        }
        $wine_varieties->load('type');
        $result = array();
        foreach($wine_varieties as $wine_variety)
        {
            $variety_name_and_amount = array(
                'name' => $wine_variety->name,
                'type' => $wine_variety->type->name,
                'amount' => $this->wine->whereHas('varieties', function($q) use ($wine_variety){
                                                                    $q->where('name', $wine_variety->name);
                                                                }
                )->count()
            );

            $result[] = $variety_name_and_amount;
        }
        return $result;
    }

    /**
     * Fetch wine types and their amount
     *
     * @param array $wine_varieties
     * @return array
     */
    public function fetchTypes(array $wine_varieties = null)
    {
        if(! $wine_varieties){
            $wine_types = $this->type->all();
        }else{
            $wine_types = $this->type->whereHas('varieties', function($q) use ($wine_varieties){
                    $q->whereIn('name', $wine_varieties);
                }
            )->get();
        }

        if(! $wine_types)
            return null;

        $result = array();

        foreach($wine_types as $wine_type)
        {
            $type_name_and_amount = array(
                'name'=>$wine_type->name,
                'amount'=>$this->wine->whereHas('type', function($q) use ($wine_type){
                                                            $q->where('name', '=', $wine_type->name);
                                                        }
                )->count()
            );
            $result[] = $type_name_and_amount;
        }
        return $result;
    }

    /**
     * Fetch all wine countries
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function fetchCountries()
    {
        return $this->country->all();
    }

    /**
     * Fetch wines based on the rules
     *
     * Rules include the wine types,
     * wine varieties and wine countries.
     *
     * @param array $fetch_rule
     * @return mixed
     */
    public function fetchWineCollection(array $fetch_rule)
    {
        $result = new \StdClass;
        $query = $this->buildQuery($fetch_rule);
        $result->totalItems = $query->count();
        $result->items = $query
                                ->orderBy($fetch_rule['sort_name'], $fetch_rule['sort_order'])
                                ->skip($fetch_rule['perPage']*($fetch_rule['currentPage']-1))
                                ->take($fetch_rule['perPage'])
                                ->get()
                                ->all();

        return $result;
    }

    /**
     * Build the query
     * Used in the fetch wine result method
     *
     * @param array $fetch_rule
     * @return Model
     */
    private function buildQuery(array $fetch_rule)
    {
        $query = $this->wine->with('wineDetail');

        if($fetch_rule['wine_types'])
            $query = $query->wineType($fetch_rule['wine_types']);
        if($fetch_rule['wine_varieties'])
            $query = $query->wineVariety($fetch_rule['wine_varieties']);
        if($fetch_rule['wine_countries'])
            $query = $query->wineCountry($fetch_rule['wine_countries']);
        if($fetch_rule['wine_price_range'])
            $query = $query->winePrice($fetch_rule['wine_price_range']);

        return $query;
    }
}