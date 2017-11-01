<?php

class Route {
    
    protected static $validRoute = [];
    protected static $controller = 'homeController';
    protected static $method = 'index';
    protected static $params = [];

    public static function get($route, $options) {
        if (isset($_GET['url'])) {

            if (preg_match('/{(\w+)}/', $route, $matches)) {
                $r = explode('/', $_GET['url']);
                $last = end($r);
                $route = str_replace($matches[0], $last, $route);
            }

            if ($_GET['url'] == $route) {
                $url = $_GET['url'];
                $url = rtrim($url, '/');
                self::$validRoute[$route] = $route;
                $url = explode('/', $url);
                
                $options = explode('@', rtrim($options, '@'));
                if(file_exists('app/controllers/' . $options[0] . '.php')) {
                    self::$controller = $options[0];
                    unset($url[0]);
                }
    
                require_once('app/controllers/' . self::$controller . '.php');
                self::$controller = new self::$controller;
    
                if(isset($url[1])) {
                    if(method_exists(self::$controller, $options[1])) {
                        self::$method = $options[1];
                        unset($url[1]);
                    }
                }
    
                self::$params = $url ? array_values($url) : [];

            }
            
        } else {

            require_once('app/controllers/HomeController.php');
            self::$controller = new self::$controller;

            call_user_func_array([self::$controller,self::$method], self::$params);

        }
    }

    public static function execute($route) {

        if (isset(self::$validRoute[$route])) {
            if (self::$validRoute[$route] == $_GET['url']) {
                call_user_func_array([self::$controller,self::$method], self::$params);
            }

        } else {
            require_once('app/controllers/errorController.php');
            self::$controller = "errorController";
            self::$controller = new self::$controller;

            call_user_func_array([self::$controller,self::$method], self::$params);

        }
    }
}