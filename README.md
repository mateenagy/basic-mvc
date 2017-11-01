# Basic PHP MVC

This is a basic MVC. I make it for school so it is not perfect but I am currently working on it. I use it with Angular 4. It also contains token verification. Which is a very very simple JWT kind authentication.

## Usage

Run ```composer install``` in the backend folder.

Run ```npm install``` in the frontend folder.

Run ```npm start``` for the server.

### Routing

Use ```Route::get``` for initialize a route.

Example:

```Route::get('api/users', 'aboutController@index')```

### Route wildcard

```Route::get('api/users/{id}')```

For database connection I use Laravel Eloquent model so you can read the documentation about it on the Laravel official site.

