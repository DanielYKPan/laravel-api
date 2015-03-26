<?php

class WinesTest extends \PHPUnit_Framework_TestCase
{
    protected function setUp()
    {
        parent::setup();
        $this->mock = $this->mock('Acme\Repo\Wine\WineRepositoryInterface');
    }

    public function mock($class)
    {
        $mock = Mockery::mock($class);
        $this->app->instance($class, $mock);

        return $mock;
    }

    protected function tearDown()
    {
        Mockery::close();
    }

    // tests
    public function testMe()
    {
    }

}