<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*Route::get('/test', array('after'=>'json_protect', function(){
    $test = array(
        'foo' => 'bar',
        'bar' => 'foo'
    );
    return Response::json($test);
}));*/

/*Route::get('/test', function(){
   $user = User::find(1)->get()->toJson();
    dd(json_decode($user));
});*/

Route::get('/shit', array('uses'=>'UsersController@fetch_user_by_email'));

Route::get('/protected', array('before'=> 'auth',function(){
    return View::make('tests.protectedPage');
}));

Route::get('/login', function(){
   return View::make('tests.login');
});

Route::get('/logout', array('uses'=>'UsersController@logout'));

Route::post('/login', array('uses'=>'UsersController@authenticate'));

Route::get('/', function()
{
   return View::make('layout.index');
});

Route::group(array('prefix' => 'api'), function()
{
    Route::post('wines/search', array('uses'=>'WinesController@searchWines'));
    Route::get('wines/inform/{product_code}', array('uses'=>'WinesController@show'));
    Route::resource('wines', 'WinesController',array('only' => array('index')));
    Route::post('varieties', array('as'=>'fetch_varieties', 'uses'=>'WinesController@fetchVarieties'));
    Route::post('types', array('as'=>'fetch_types', 'uses'=>'WinesController@fetchTypes'));
    Route::get('countries', array('as'=>'fetch_countries', 'uses'=>'WinesController@fetchCountries'));
    Route::post('login', array('as'=>'user_authentication', 'before'=>'csrf_json', 'uses'=>'UsersController@authenticate'));
    Route::get('logout', array('uses'=>'UsersController@logout'));
    Route::get('current-user', array('as'=>'current-user', 'uses'=>'UsersController@currentUser'));
    Route::post('users', array('as'=>'fetch_users', 'uses'=>'UsersController@fetch_user_by_email'));
    Route::post('register', array('as'=>'register_users', 'uses'=>'UsersController@register_user'));
});

App::missing(function()
{
    return View::make('layout.index');
});