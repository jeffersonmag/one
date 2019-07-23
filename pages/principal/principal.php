<?php
if(!isset($_SESSION)){
    session_start();
}


require_once('../../dist/php/rbc/datasnap.php');

$acao = $_POST['acao'];

switch($acao){
    case "dados-usuario":
        echo get_dados_usuario();
    break;

    case "indice-contratos-digitados-pagos":
        $mes = $_POST['mes'];
        $ano = $_POST['ano'];
        echo get_indice_contratos_digitados_pagos($mes, $ano);
    break;

    case "indice-contratos-digitados-pagos-sintetico":
        $mes = $_POST['mes'];
        $ano = $_POST['ano'];
        echo get_indice_contratos_digitados_pagos_sintetico($mes, $ano);
    break;

    case "dias-uteis-periodo":
        $data_inicial = $_POST['data_inicial'];
        $data_final = $_POST['data_final'];
        echo get_dias_uteis_periodo($data_inicial, $data_final);
    break;

    case "campanha-perfil":
        echo get_campanhas_perfil();
    break;

    case "ticket-medio-perfil":
        echo get_ticket_medio_perfil();
    break;

    case "metas-campanha-perfil":
        $codigo_campanha = $_POST['codigo_campanha'];
        $visao = $_POST['visao'];
        echo get_metas_campanha_perfil($codigo_campanha,$visao);
    break;
}


// [11:10] Rafael Bizio | RBC Tecnologia
//     método: indice-contratos-digitados-pagos-sintetico

// parametros: Token, ano(int), mes(int)

// ​[11:12] Rafael Bizio | RBC Tecnologia
//     metodo: campanhas-perfil

// parametros: token 

