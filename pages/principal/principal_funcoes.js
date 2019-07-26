async function get_dias_uteis(data_inicial, data_final) {
    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'dias-uteis-periodo',
            data_inicial: data_inicial,
            data_final: data_final,
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
        .done(function (retorno) {
            // return retorno;
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E001: teste 5");
            console.log(data_inicial);
            console.log(data_final);
            console.log("E001: Erro ao proessar requisição de dias-uteis-periodo");
            // console.log(xhr);
            // console.log(status);
            // console.log(errorThrown);
        });
}

async function get_ticket_medio_perfil() {
    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'ticket-medio-perfil',
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
        .done(function (retorno) {
            // return retorno.ticket_medio_perfil;
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E001: Erro ao proessar requisição de get_ticket_medio_perfil");
            // console.log(xhr);
            // console.log(status);
            // console.log(errorThrown);
        });
}

async function get_indice_contratos_digitados_pagos(mes, ano) {
    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'indice-contratos-digitados-pagos',
            mes: mes,
            ano: ano,
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
    .done(function (retorno) {
        // console.log('indice-contratos-digitados-pagos');
        // console.log(retorno);
    })
    .fail(function (xhr, status, errorThrown) {
        console.log("E001: Erro ao proessar requisição de indice-contratos-digitados-pagos");
    });
}


async function get_indice_contratos_digitados_pagos_sintetico(mes, ano) {
    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'indice-contratos-digitados-pagos-sintetico',
            mes: mes,
            ano: ano,
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
        .done(function (retorno) {
            // console.log('indice-contratos-digitados-pagos-sintetico');
            // console.log(retorno);
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E001: Erro ao proessar requisição de indice-contratos-digitados-pagos-sintetico");
        });
}


async function get_campanha_perfil() {
    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'campanha-perfil',
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
        .done(function (retorno) {
            // console.log('campanha-perfil');
            // console.log('get_campanha_perfil');
            // console.log(retorno);
            // objPrincipal.campanhas_perfil = retorno;
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E001: Erro ao proessar requisição de campanha-perfil");
        });
}

function get_metas_campanha_perfil(){

    visao = 0;
    codigo_campanha = 0;

    switch(objPrincipal.dados_usuario.perfil_atuacao){
        case 'DIRETOR':
            visao = 5;
        break;

        case 'REGIONAL':
            visao = 4;
        break;

        case 'COMERCIAL':
            visao = 3;
        break;

        case 'LOJA':
            visao = 2;
        break;

        case 'CONSULTOR':
            visao = 1;
        break;
    }

    // console.log(`visao: ${visao}`);

    // TODO melhorar isso. gamabiarra que varre o array das campanhas do perfil 
    // para pegar a CAMPANHA MENSAL DA LOJA , no mes atual
    // aqui antes de converter a string que vem da API, retirno o GMT que vem na string
    // pq quando criar o objeto data no javascript ele coloca a data no timezone da maquina
    // se deixar o GMT ele vai converter como se estivesse no fuso horario GMT 0 e nao -3 como eh o caso do brasil
    
    // campanhas_perfil
    // console.log('objPrincipal.campanhas_perfil');
    // console.log(objPrincipal.campanhas_perfil);

    // guarda o primeiro e ultimo dia do mes atual ########################### INICIO
    let agora = new Date();
    
    // console.log('dia');
    // console.log(agora);
    dia = agora.getDate();
    mes = agora.getMonth(); // 0 a 11
    ano = agora.getFullYear();
    
    let inicio_mes = new Date(ano, mes, 1); // primeiro dia do mes
    let final_mes = new Date(ano, mes + 1, 0); // ultimo dia do mes
    // console.log(`${inicio_mes.getDate()} / ${inicio_mes.getMonth()+1} / ${inicio_mes.getFullYear()}`);
    // console.log(`${final_mes.getDate()} / ${final_mes.getMonth()+1} / ${final_mes.getFullYear()}`);
   
    // console.log(`campanha tem que ser entre`);
    // console.log(`${inicio_mes}`);
    // console.log(`e`);
    // console.log(`${final_mes}`);
    // guarda o primeiro e ultimo dia do mes atual ########################### FIM

    for(let i = 0 ; i < objPrincipal.campanhas_perfil.length ; i++){

        // console.log('objPrincipal.campanhas_perfil[0].data_inicio_campanha');
        // TODO aqui antes de converter a string que vem da API, retirno o GMT que vem na string
        // pq quando criar o objeto data no javascript ele coloca a data no timezone da maquina
        // se deixar o GMT ele vai converter como se estivesse no fuso horario GMT 0 e nao -3 como eh o caso do brasil
        let data_inicio_campanha = objPrincipal.campanhas_perfil[i].data_inicio_campanha.replace('GMT','');
        let data_fim_campanha = objPrincipal.campanhas_perfil[i].data_fim_campanha.replace('GMT','');
        data_inicio_campanha = new Date(data_inicio_campanha);
        data_fim_campanha = new Date(data_fim_campanha);
        // console.log(`vai comparar campanha começa em ${data_inicio_campanha} e acaba em ${data_fim_campanha}`);

        // TODO arrumar essa gambiarra. como a data ven da api no fuso horario GMT 0
        // e o new Date do javascript cria no GMT -3
        // fiz uma gambiarra para criar as datas da campnha no mesmo timezone que o new Date()
        // console.log(`${data_inicio_campanha} == ${inicio_mes}`);
        // console.log(`${data_inicio_campanha.getTime()} == ${inicio_mes.getTime()}`);
        // console.log(`${data_fim_campanha} == ${final_mes}`);
        // console.log(`${data_fim_campanha.getTime()} == ${final_mes.getTime()}`);
        if( (
            data_inicio_campanha.getTime() == inicio_mes.getTime()
        //     // objPrincipal.campanhas_perfil[i].data_inicio_campanha.getDate() == inicio_campanha.getDate() &&
        //     // objPrincipal.campanhas_perfil[i].data_inicio_campanha.getMonth() == inicio_campanha.getMonth() &&
        //     // objPrincipal.campanhas_perfil[i].data_inicio_campanha.getFullYear() == inicio_campanha.getFullYear()
            )
            && 
            (
                data_fim_campanha.getTime() == final_mes.getTime()
        //     //     objPrincipal.campanhas_perfil[i].data_fim_campanha.getDate() == final_campanha.getDate() &&
        //     //     objPrincipal.campanhas_perfil[i].data_fim_campanha.getMonth() == final_campanha.getMonth() &&
        //     //     objPrincipal.campanhas_perfil[i].data_fim_campanha.getFullYear() == final_campanha.getFullYear()
            )
            &&
            (objPrincipal.campanhas_perfil[i].nome_campanha.includes('MENSAL'))
            &&
            (objPrincipal.campanhas_perfil[i].nome_campanha.includes('LOJA'))
        ){
            // console.log('########### BATEU ###################');
            // console.log('objPrincipal.campanhas_perfil[i]');
            // console.log(objPrincipal.campanhas_perfil[i]);
            // console.log('########### BATEU ###################');
            codigo_campanha = objPrincipal.campanhas_perfil[i].codigo_campanha;
        }
    }
    
    if ( visao == 0  || codigo_campanha == 0){
        console.error('erro ao selecionar visao ou campanha');
        alert('erro ao selecionar visao ou campanha');
        return false;
    }

    return $.ajax({
        url: "principal.php",
        data: {
            acao: 'metas-campanha-perfil',
            codigo_campanha: codigo_campanha,
            visao: visao,
            sid: Math.random()
        },
        type: "POST",
        dataType: "json",
    })
    .done(function (retorno){
        // console.log('metas-campanha-perfil');
        // console.log(retorno);
    })
    .fail(function (xhr, status, errorThrown){
        console.log("E001: Erro ao proessar requisição de metas-campanha-perfil");
    });
}

//grafico google
google.charts.load('current', { 'packages': ['corechart'], 'language': 'pt-br' });

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(dados_grafico) {

    // cria um array com todos os dias do mes. o array vai comecar no 0 mas como vai utilizar os indices como os dias
    // se o mes tiver 31 dias vai ter 32 elementos (0 ao 31)

    // como o mes do retorno vem 1-12 e o mes no javascript sao 0-11
    // subtaio um para o mes do retorno bater com o mes no javascript
    let mes_grafico = (dados_grafico[0].mes) - 1;
    let ano_grafico = dados_grafico[0].ano;

    //pega o ultimo dia do mes do retorno
    var ultimo_dia = new Date(ano_grafico, mes_grafico + 1, 0);

    // preenche o array com o valor digitado e pago de cada dia. os quenao tiverem producao vao ficar zerados
    let digitadas = [];
    let pagas = [];

    for (let i = 0; i <= ultimo_dia.getDate(); i++) {
        //insere os dias no array das digitadas, com valor 0
        digitadas.push(i);
        digitadas[i] = 0;
        //insere os dias no array das digitadas, com valor 0
        pagas.push(i);
        pagas[i] = 0;
    }

    // varre o retorno e preenche os dias que tem informação
    // criar os arrays com todos os dias do ano
    for (let i = 0; i < dados_grafico.length; i++) {
        let dia = dados_grafico[i].dia;

        if (dados_grafico[i].status == 'DIGITADAS') {
            digitadas[dia] = dados_grafico[i].total_valor_elegivel;
        }

        if (dados_grafico[i].status == 'PAGAS') {
            pagas[dia] = dados_grafico[i].total_valor_elegivel;
        }
    }

    data_grafico = [];
    // varre o array que vai pro grafico jogando os valores digitados e pagos dos dias
    for (let i = 1; i <= ultimo_dia.getDate(); i++) {
        data_grafico.push([i.toString(), digitadas[i], pagas[i]]);
    }

    // console.log(data_grafico);

    // console.log('digitadas');
    // console.log(digitadas);
    // console.log('pagas');
    // console.log(pagas);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Dia');
    data.addColumn('number', 'Digitado');
    data.addColumn('number', 'Pago');
    data.addRows(data_grafico);

    // Set chart options
    var options = {
        'title': '',
        'animation': {
            "startup": true,
            duration: 500,
            easing: 'out',
        },
        // explorer: {},
        legend: {
            position: 'top',
            alignment: 'center'
        },
        focusTarget: 'category',
        crosshair: { trigger: 'both', opacity: 0.5 },
        vAxis: { format: 'decimal' },
        hAxis: { title: 'Dia', format: 'decimal', textStyle: { fontSize: 9 } },
        width: '100%'
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.AreaChart(document.getElementById('grafico_digitados_pagos'));
    chart.draw(data, options);
}