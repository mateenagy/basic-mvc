<?php

class HomeController extends Controller{

    public function index($name = '') {
        $user = $this->model('User');

        $user->name = User::find(2)->username;

        return $this->view('home/index', ['name' => $user->name]);
    }

    public function all() {
        $users = User::all();

        return $this->view('home/index', ['users' => $users]);
    }

}