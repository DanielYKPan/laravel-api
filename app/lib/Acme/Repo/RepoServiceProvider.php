<?php


namespace Acme\Repo;


use Acme\Repo\Wine\EloquentWineRepository;
use Acme\Repo\User\EloquentUserRepository;
use Illuminate\Support\ServiceProvider;
use Wine;
use Variety;
use Type;
use Country;
use User;

class RepoServiceProvider extends ServiceProvider {

    public function register()
    {
        $app = $this->app;

        $app->bind('Acme\Repo\Wine\WineRepositoryInterface', function($app){
            return new EloquentWineRepository(new Wine, new Variety, new Type, new Country);
        });

        $app->bind('Acme\Repo\User\UserRepositoryInterface', function($app){
            return new EloquentUserRepository(new User);
        });
    }
} 