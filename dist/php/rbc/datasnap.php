<?php

error_reporting(0);

if(!isset($_SESSION)){
    session_start();
}

$servidor_autenticacao = "rbcautenticador.dyndns.org";
$servidor_api = "191.232.38.197";

function get_token($usuario, $senha){
    #"at_cliente": "RIBERCRED" -- subdomninio que o cliente usa

    global $servidor_autenticacao;

    $caminho = "http://".$servidor_autenticacao.":10720/autenticador/v1/TServerMetodoToken/Token";
 
    #"at_cliente": "RIBERCRED" -- subdomninio que o cliente usa
    $argumentos = array('http' =>
        array(
            'method'  => 'POST',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8"
            ),
            'content' => '{"cpf": "'.$usuario.'",
                "senha": "'.$senha.'",
                "projeto": "CORBAN",
                "at_cliente": "RIBERCRED"
            }'
        )
    );
    
    $context = stream_context_create($argumentos);
    $token = file_get_contents($caminho, null, $context);
    $header = ($http_response_header);

    //tira as aspas duplas que vem no comeco e no fim do token
    $token = substr($token,1,strlen($token)-2);

    //se gerou o token o status do retorno eh 200-ok
    if($header[0] === "HTTP/1.1 200 OK"){
        $_SESSION['token'] = $token;
        echo 1;
    }
    else{
        session_destroy();
        echo 0;
    }

    die();

}

function get_dados_usuario(){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/dados-usuario";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            )
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        )
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}


function get_ticket_medio_global(){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/ticket-medio-global";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            )
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        )
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_ticket_medio_perfil(){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/ticket-medio-perfil";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            )
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        )
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_indice_contratos_digitados_pagos($mes, $ano){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/indice-contratos-digitados-pagos";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: application/json;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            ),
            'content' => '{
                "ano": "'.$mes.'",
                "mes": "'.$ano.'"
              }'
           // 'content' => '{
           //     "ano": "'.date('Y').'",
           //     "mes": "'.date('m').'"
           // }'
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        ),
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_indice_contratos_digitados_pagos_sintetico($mes, $ano){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/indice-contratos-digitados-pagos-sintetico";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: application/json;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            ),
            'content' => '{
                "ano": "'.$mes.'",
                "mes": "'.$ano.'"
              }'

            //'content' => '{
            //    "ano": "'.date('Y').'",
            //    "mes": "'.date('m').'"
            //}'
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        ),
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_dias_uteis_periodo($data_inicial, $data_final){

    global $servidor_api;
    
    $caminho = "https://".$servidor_api.":10740/api/dias-uteis-periodo";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: application/json;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            ),
            'content' => '{
                "data_inicial": "'.$data_inicial.'",
                "data_final": "'.$data_final.'"
            }'
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        ),
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_campanhas_perfil(){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/campanhas-perfil";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            )
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        )
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}

function get_metas_campanha_perfil($codigo_campanha,$visao){
    global $servidor_api;
    $caminho = "https://".$servidor_api.":10740/api/metas-campanha-perfil";

    $argumentos = array(
        'http' => array(
            'method'  => 'GET',
            'header' => array(
                "Content-type: text/plain;charset=UTF-8",
                "Authorization: " . $_SESSION['token']
            ),
            'content' => '{
                "codigo_campanha":"'.$codigo_campanha.'",
                "visao":"'.$visao.'"
            }'
        ),
        //aqui serve para usar ssl desabilitando a verificacao do certificado
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false
        )
    );

    $context = stream_context_create($argumentos);
    $retorno = file_get_contents($caminho, null, $context);

    return $retorno;
}