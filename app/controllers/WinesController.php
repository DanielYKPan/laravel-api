<?php

use Acme\Repo\Wine\WineRepositoryInterface;
use Acme\Service\Transformers\WineTransformer;
use Acme\Service\Transformers\WineDetailTransformer;

/**
 * Class WinesController
 */
class WinesController extends \BaseController {

    /**
     * @var WineRepositoryInterface
     */
    private $wine;

    /**
     * @var Acme\Service\Transformers\WineTransformer
     */
    protected $wineTransformer;

    /**
     * @var Acme\Service\Transformers\WineDetailTransformer
     */
    protected $wineDetailTransformer;


    public function __construct(
                                    WineRepositoryInterface $wine,
                                    WineTransformer $wineTransformer,
                                    WineDetailTransformer $wineDetailTransformer
                                )
    {
        $this->wine = $wine;
        $this->wineTransformer = $wineTransformer;
        $this->wineDetailTransformer = $wineDetailTransformer;
    }
	/**
	 * Display a listing of the resource.
	 * GET /wines
	 *
	 * @return Response
	 */
	public function index()
	{
        $allWines = $this->wine->fetchAllWines();
        return Response::json([
            'data' => $allWines
        ], 200);
	}

    /**
     * Show a specific wine resource
     *
     * @param $product_code
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($product_code)
	{
        $wine = $this->wine->fetchSpecificWine($product_code);
        $wine['wine_detail'] = $this->wineDetailTransformer->transform($wine['wine_detail']);
        return Response::json([
            'data'=>  $this->wineTransformer->transform($wine)
        ], 200);
	}

    /**
     * Fetch all wine varieties
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchVarieties()
    {
        $fetch_rules = Input::all();
        $varieties = $this->wine->fetchVarieties($fetch_rules['wine_types']);

        if(! $varieties) {
            return Response::json([
                    'error' => 'There is no result'
                ],
                404);
        }

        return Response::json([
            'data'=> $varieties
        ], 200);
    }

    /**
     * Fetch all wine types
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public  function fetchTypes()
    {
        $fetch_rules = Input::all();
        $result = $this->wine->fetchTypes($fetch_rules['wine_varieties']);

        if(! $result) {
            return Response::json([
                    'error' => 'There is no result from the server'
                ],
                404);
        }

        return Response::json([
            'data'=> $result
        ], 200);
    }

    /**
     * Fetch all wine countries
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchCountries()
    {
        $countries = $this->wine->fetchCountries();

        if(! $countries) {
            return Response::json([
                    'error' => 'There is no result from the server'
                ],
                404);
        }

        return Response::json([
            'data'=> $countries
        ], 200);
    }

    public function searchWines()
    {
        $fetch_rules = Input::all();

        $result = $this->wine->fetchWineCollection($fetch_rules);
        if(! $result) {
            return Response::json([
                    'error' => 'There is no result from the server.'
                ],
                404);
        }

        $wine = Paginator::make(
                                    $this->wineTransformer->transformCollection($result->items),
                                    $result->totalItems,
                                    $fetch_rules['perPage']
                                );
        return $wine;
    }
}