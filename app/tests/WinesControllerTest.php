<?php


class WinesControllerTest extends TestCase {

    var $mock;

    public function setUp()
    {
        parent::setUp();
        $this->mock = $this->mock('Acme\Repo\Wine\WineRepositoryInterface');
    }

    public function mock($class)
    {
        $mock = Mockery::mock($class);
        $this->app->instance($class, $mock);
        return $mock;
    }

    public function tearDown()
    {
        Mockery::close();
    }

    public function test_fetch_all_wines_successfully()
    {
        $this->mock
            ->shouldReceive("fetchAllWines")
            ->once()
            ->andReturnValues(array('good','bad'));

        $this->call('GET', 'api/wines');

        $this->assertResponseStatus(200);
    }

    /**
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     */
    public function test_fetch_specific_wine_with_fake_product_code()
    {
        $this->mock
            ->shouldReceive("fetchSpecificWine")
            ->with("fakeProductCode")
            ->andThrow('Illuminate\Database\Eloquent\ModelNotFoundException');

        $this->call('GET', 'api/wines/fakeProductCode');
    }

    public function test_fetch_specific_wine_successfully()
    {
        $this->mock
            ->shouldReceive("fetchSpecificWine")
            ->with("realProductCode")
            ->andReturnValues(array("good"));

        $this->call('GET', 'api/wines/realProductCode');

        $this->assertResponseStatus(200);
    }

    public function test_fetch_varieties_successfully()
    {
        Input::replace($input=['wine_types'=>[]]);
        $this->mock
            ->shouldReceive("fetchVarieties")
            ->with($input['wine_types'])
            ->andReturn('good');

        $this->call('POST', 'api/varieties', $input);

        $this->assertResponseStatus(200);
    }

    public function test_fetch_varieties_fails()
    {
        Input::replace($input=['wine_types'=>[]]);
        $this->mock
            ->shouldReceive("fetchVarieties")
            ->with($input['wine_types'])
            ->andReturnNull();

        $this->call('POST', 'api/varieties', $input);

        $this->assertResponseStatus(404);
    }

    public function test_fetch_types_successfully()
    {
        Input::replace($input=['wine_varieties'=>[]]);
        $this->mock
            ->shouldReceive("fetchTypes")
            ->with($input['wine_varieties'])
            ->andReturn('good');

        $this->call('POST', 'api/types', $input);

        $this->assertResponseStatus(200);
    }

    public function test_fetch_types_fails()
    {
        Input::replace($input=['wine_varieties'=>[]]);
        $this->mock
            ->shouldReceive("fetchTypes")
            ->with($input['wine_varieties'])
            ->andReturnNull();

        $this->call('POST', 'api/types', $input);

        $this->assertResponseStatus(404);
    }

    public function test_fetch_countries_successfully()
    {
        $this->mock
            ->shouldReceive("fetchCountries")
            ->andReturn('good');

        $this->call('GET', 'api/countries');

        $this->assertResponseStatus(200);
    }

    public function test_fetch_countries_fails()
    {
        $this->mock
            ->shouldReceive("fetchCountries")
            ->andReturnNull();

        $this->call('GET', 'api/countries');

        $this->assertResponseStatus(404);
    }
} 