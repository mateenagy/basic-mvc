# Basic PHP MVC

This is a basic MVC. I make it for school so it is not perfect but I am currently working on it. I use it with Angular 4. It also contains token verification. Which is a very very simple JWT kind authentication.

## Usage

Run ```composer install``` in the backend folder.

Run ```npm install``` in the frontend folder.

Run ```npm start``` for the server.

### Database config
app/backend.php:

```
$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'host',
    'database'  => 'database_name',
    'username'  => 'root',
    'password'  => 'root',
    'charset'   => 'utf8',
    'prefix'    => '',
]);
```
### Routing

Use ```Route::get``` for initialize a route.

Example:

```Route::get('api/users', 'aboutController@index')```

### Route wildcard

```Route::get('api/users/{id}')```

For database connection I use Laravel Eloquent model so you can read the documentation about it on the Laravel official site.

### Frontend

The frontend uses Angular 4 with the Angular CLI.

You can generate

-components:

```ng generate component ComponentName```

-services:

```ng generate service ServiceName```

 For more read the Angular CLI documentation

