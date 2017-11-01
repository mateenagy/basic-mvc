<?php 
// ROUTES

Route::get('home', 'homeController@index');

Route::get('api/users', 'ApiController@index');

Route::get('api/users/{id}', 'ApiController@getUser');

Route::get('api/addUser', 'ApiController@addUser');

Route::get('api/updateUser/{id}', 'ApiController@updateUser');

Route::get('api/deleteUser/{id}', 'ApiController@deleteUser');

Route::get('api/login', 'ApiController@logIn');

Route::get('api/loginToken', 'ApiController@logInToken');

if(isset($_GET['url'])) {
    Route::execute($_GET['url']);
}