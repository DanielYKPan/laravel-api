<?php


namespace Acme\Service\Validations\Form;

use Illuminate\Support\ServiceProvider;
use Acme\Service\Validations\Form\User\UserLoginForm;
use Acme\Service\Validations\Form\User\UserLoginFormValidator;
use Acme\Service\Validations\Form\User\UserRegistrationForm;
use Acme\Service\Validations\Form\User\UserRegistrationFormValidator;

class FormServiceProvider extends ServiceProvider {

    public function register()
    {
        $app = $this->app;

        $app->bind('Acme\Service\Validations\Form\User\UserLoginForm', function($app){
            return new UserLoginForm(
                new UserLoginFormValidator($app['validator']),
                $app->make('Acme\Repo\User\UserRepositoryInterface')
            );
        });

        $app->bind('Acme\Service\Validations\Form\User\UserRegistrationForm', function($app){
            return new UserRegistrationForm(
                new UserRegistrationFormValidator($app['validator']),
                $app->make('Acme\Repo\User\UserRepositoryInterface')
            );
        });
    }
} 