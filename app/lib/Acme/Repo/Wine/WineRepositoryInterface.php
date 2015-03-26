<?php
namespace Acme\Repo\Wine;

interface WineRepositoryInterface {

    /**
     * Get all wines
     * @return mixed
     */
    public function fetchAllWines();

    /**
     * Fetch wines based on the rules
     *
     * Rules include the wine types,
     * wine varieties and wine countries.
     *
     * @param array $fetch_rule
     * @return mixed
     */
    public function fetchWineCollection(array $fetch_rule);


    /**
     * Fetch all wine countries
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function fetchCountries();

    /**
     * @param array $wine_types
     * @return array
     */
    public function fetchVarieties(array $wine_types = null);

    /**
     * Fetch wine types and their amount
     *
     * @param array $wine_varieties
     * @return array
     */
    public function fetchTypes(array $wine_varieties = null);

    /**
     * Get a specific wine
     *
     * @param $product_code
     * @return mixed
     */
    public function fetchSpecificWine($product_code);

}