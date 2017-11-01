<?php
    unset($argv[0]);

    $methods = explode(':', $argv[1]);

    //MAKE METHOD
    if($methods[0] === 'make' ) {
        switch($methods[1]) {
            // MAKE CONTROLLER
            case 'controller':
                makeController($argv[2]);
                break;
            // MAKE MODEL
            case 'model':
                if (isset($argv[3]) && $argv[3] === '-c') {
                    makeModel($argv[2]);
                    makeController($argv[2] . 'Controller');
                    echo 'model and controller successfully created';
                    break;
                } else {
                    makeModel($argv[2]);
                    break;
                }
            default:
                echo 'Not a valid instance';
                break;
        }
    } else {
        echo 'Some other method';
    }

    function makeController($argument) {
        $template = file_get_contents(__DIR__ . '/vendor/templates/controller.template.php');
        $template = str_replace("#CLNAME#", $argument, $template);
        $file = fopen(__DIR__ . '/app/controllers/' . $argument . '.php', 'w');
        fwrite($file, $template);
        fclose($file);
        echo $argument . ' was successfully created';
    }

    function makeModel($argument) {
        $template = file_get_contents(__DIR__ . '/vendor/templates/model.template.php');
        $template = str_replace("#MDNAME#", $argument, $template);
        $file = fopen(__DIR__ . '/app/models/' . $argument . '.php', 'w');
        fwrite($file, $template);
        fclose($file);
        echo $argument . ' was successfully created';
    }

?>