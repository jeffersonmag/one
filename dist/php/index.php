<?php

error_reporting(0);

require_once('./rbc/datasnap.php');

$acao = $_POST['acao'];

switch($acao){
    case 'token':
        $usuario = $_POST['usuario'];
        $senha = $_POST['senha'];

        $retorno_token = get_token($usuario, $senha);
        echo $retorno_token;
        // echo '<pre>' . var_export(get_token($usuario, $senha), true) . '</pre>';
    break;
}