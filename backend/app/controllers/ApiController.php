<?php
class ApiController extends Controller {

    public function index() {
        //GET ALL USER
        $user = User::all();
        header('Content-Type: application/json');
        //PUT USERS IN A JSON
        $json_user = [
            "users" => $user
        ];
        //SEND RESPONSE
        echo json_encode($json_user);
    }

    public function getUser($id) {
        //GET USER
        $user = User::find($id);
        //HANDLE ERROR
        $json_error = [
                "error" => "user_not_found"
        ];
        //PUT RESPONSE TO JSON
        $json_user = [
            "user" => $user
        ];
        header('Content-Type: application/json');
        if ($user != null) {
            //SEND RESPONSE
            echo json_encode($json_user);
        } else {
            //SEND RESPONSE
            echo json_encode($json_error);
        }
    }

    public function addUser($username = '', $email = '', $full_name = '') {
        // GET RAW POST DATA
        $data = file_get_contents("php://input");
        $request = json_decode($data);
        $username = $request->username;
        $email = $request->email;
        $full_name = $request->full_name;
        //CREATE USER
        User::create([
            'username' => $username,
            'email' => $email,
            'full_name' => $full_name
        ]);
    }

    public function updateUser($id) {
        //GET RAW DATA
        $data = file_get_contents("php://input");
        $request = json_decode($data);
        $username = $request->username;
        $email = $request->email;
        $full_name = $request->full_name;
        //UPDAT USER
        $model = new User();
        $user = $model->find($id);
        $user->username = $username;
        $user->email = $email;
        $user->full_name = $full_name;
        $user->save();
    }

    public function deleteUser($id) {
        //DELTE USER
        $user = User::find($id);
        $user->delete();
    }

    public function logIn($username = '', $token = '') {
        //START SESSION
        session_start();
        //GET RAW DATA
        $data = file_get_contents("php://input");
        $request = json_decode($data);
        $username = $request->username;
        $token = $request->token;
        //DECODE TOKEN
        $decoded_token = base64_decode($token);
        $decoded_json = json_decode($decoded_token);
        if( isset( $decoded_json->exp ) ) {
            $exp = $decoded_json->exp;
        }

        header('Content-Type: application/json');
        //GET USER
        $user = User::where('username', $username)->get();
        if (sizeof($user) == 0) {
            //ERROR HANDLE
            echo json_encode('user_not_found');
        } else {
            //CHECK TOKEN IS VALID AND NOT EXPIRED
            if ($token != null && !($exp < time())) {
                if (isset($_SESSION['token']) == $token) {
                    echo json_encode($token);
                }
            } else {
                //GENERATE TOKEN
                $token = $this->generateKey($username);
                $_SESSION['token'] = $token;

                $data = [
                    "users" => $user,
                    "token" => $token
                ];
                // echo json_encode($this->generateKey($username));
                echo json_encode($data);
            }
        }
    }

    public function logInToken($token = '') {
        //GET RAW DATA
        $data = file_get_contents("php://input");
        $request = json_decode($data);
        $token = $request->token;
        header('Content-Type: application/json');
        //DECODE TOKEN
        $decoded_token = base64_decode($token);
        $decoded_json = json_decode($decoded_token);
        //CHECK TOKEN
        if ($token != null) {
            $username = $decoded_json->user_name;
            $exp = $decoded_json->exp;
            //CHECK VALID TOKEN
            if ($exp < time()) {
                echo json_encode('not_authorized');
            } else {
                $user = User::where('username', $username)->get();
                echo json_encode($user);
            }
        } else {
            echo json_encode('not_authorized');
        }


    }
    public function generateKey($user_name) {
        //SET CREATED AT
        $cat = time();
        //SET EXPIRE DATE
        $exp = $cat + 20;
        //PUT DATA TO JSON
        $data = [
            'user_name' => $user_name,
            'cat' => $cat,
            'exp' => $exp
        ];

        // ENCODE JSON TO BASE64
        return base64_encode(json_encode($data));
    }
} 