const objPrincipal = {
    dados_usuario : {},
    campanhas_perfil: {}
};

$(document).ready(function (){
    (async function (){
        //preenche as informacoes do usuario
        await $.ajax({
            url: "principal.php",
            data: {
                acao: 'dados-usuario',
                sid: Math.random()
            },
            type: "POST",
            dataType: "json",
        })
        .done(function (retorno) {
            console.log(retorno);
            objPrincipal.dados_usuario = retorno;
            $('.info-usuario').html(`${retorno.nome_usuario} [${retorno.perfil_atuacao}] `);
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E002: Erro ao processar requisição de dados-usuario");
        });

        //monta o grafico -- versao usando o chartjs - substituido pelo google charts
        // $.ajax({
        //     url: "principal.php",
        //     data: {
        //         acao: 'indice-contratos-digitados-pagos',
        //         sid: Math.random()
        //     },
        //     type: "POST",
        //     dataType: "json",
        // })
        //     .done(function (dados_grafico) {
        //         $('.grafico .overlay').hide();
        //         // processo para montar o grafico
        //         //1 - sempre vem um único mes no reotrno. pegar o numero do mes - ok
        //         //2 NAO PREICSA DESSE PASSO - pegar o valor maximo do 'total_valor_elegivel' para jogar no eixo y
        //         //3 - montar um array com todos os dias do mes e jogar no 'labels' do chartjs
        //         //4 - montar um array 'digitadas' com os indices sendo a quantidade de dias do mes 
        //         // e cada indice tem zero como valor inicial
        //         //4 - montar um array 'pagas' com os indices sendo a quantidade de dias do mes 
        //         // e cada indice tem zero como valor inicial
        //         //5 - fazer um loop e lendo o dados_grafico, atualiza o dia que tiver no dados_grafico parao valor correspondente
        //         // os dias que nao estiverem no dados_grafico vao ficar zerados
        //         //6 - passar os arrays 'digitadas' e 'pagas' para o datasets.data correspondente


        //         //como o array começa do indice zero. vai ter de 0 até o ultimo diado mes, por exempo 0 a 31
        //         //nas interações vai contar o indice como sendoo dia
        //         //antes de passar parao grafico.remover o primeiro elemento , que é o zero e todo array pra 

        //         // como o mes do retorno vem 1-12 e o mes no javascript sao 0-11
        //         // subtaio um para o mes do retorno bater com o atual
        //         let mes_grafico = (dados_grafico[0].mes) - 1;
        //         let ano_grafico = dados_grafico[0].ano;

        //         // var primeiro_dia = new Date(ano_grafico, mes_grafico, 1);
        //         var ultimo_dia = new Date(ano_grafico, mes_grafico + 1, 0);
        //         // console.log(`o grafico vai do dia ${primeiro_dia.getDate()} até ${ultimo_dia.getDate()}`);

        //         let eixo_x = [];
        //         let digitadas = [];
        //         let pagas = [];

        //         // criar os arrays com uma posição para cada dia do mes
        //         for (let i = 0; i <= ultimo_dia.getDate(); i++) {
        //             //joga no array do eixo_x
        //             eixo_x.push(i);
        //             // console.log(`eixo_x.push(${i});`);

        //             //insere os dias no array das digitadas, com valor 0
        //             digitadas.push(i);
        //             digitadas[i] = 0;
        //             //insere os dias no array das digitadas, com valor 0
        //             pagas.push(i);
        //             pagas[i] = 0;
        //         }

        //         // throw new Error("Stop script");

        //         // varre o retorno e preenche os dias que tem informação
        //         // criar os arrays com todos os dias do ano
        //         for (let i = 0; i < dados_grafico.length; i++) {

        //             let dia = dados_grafico[i].dia;

        //             // console.log(`processando dia:${dia}`);
        //             // console.log(`status : ${dados_grafico[i].status}`);

        //             if (dados_grafico[i].status == 'DIGITADAS') {
        //                 // digitadas.push(i);
        //                 digitadas[dia] = dados_grafico[i].total_valor_elegivel;
        //             }

        //             if (dados_grafico[i].status == 'PAGAS') {
        //                 // pagas.push(i);
        //                 pagas[dia] = dados_grafico[i].total_valor_elegivel;
        //             }
        //         }

        //         //remove os primeiros elementos que sao os indices zeros
        //         //pq aqui so trabalha com os indices representando os dias do mes
        //         eixo_x.splice(0, 1);
        //         digitadas.splice(0, 1);
        //         pagas.splice(0, 1);

        //         // console.log(`digitadas ${digitadas.length}`);
        //         // console.log(JSON.stringify(digitadas));
        //         // console.log(`pagas ${pagas.length}`);
        //         // console.log(JSON.stringify(pagas));

        //         var ctx = document.getElementById('grafico_pagas_digitadas');
        //         var myChart = new Chart(ctx, {
        //             type: 'line',
        //             data: {
        //                 labels: eixo_x,
        //                 datasets: [
        //                     {
        //                         label: 'DIGITADAS',
        //                         fill: false,
        //                         borderColor: 'rgba(60,141,188,1)', //cor dalinha
        //                         backgroundColor: 'rgba(60,141,188,1)', //cor do preenchimento da area da linha
        //                         pointBackgroundColor: 'rgba(60,141,188,1)', //cor do ponto no grafico
        //                         pointBorderColor: 'rgba(60,141,188,1)', //cor do ponto no grafico
        //                         data: digitadas
        //                     },
        //                     {
        //                         label: 'PAGAS',
        //                         fill: false,
        //                         borderColor: 'rgba(18, 181, 18, 1)', //cor dalinha
        //                         backgroundColor: 'rgba(18, 181, 18, 1)', //cor do preenchimento da area da linha
        //                         pointBackgroundColor: 'rgba(18, 181, 18, 1)', //cor do ponto no grafico
        //                         pointBorderColor: 'rgba(18, 181, 18, 1)', //cor do ponto no grafico
        //                         data: pagas
        //                     }
        //                 ]
        //             },
        //             options: {
        //                 responsive: true,
        //                 maintainAspectRatio: true,
        //                 tooltips: {
        //                     callbacks: {
        //                         label: function(tooltipItem, data) {
        //                             return accounting.formatMoney(tooltipItem.yLabel, {symbol : "R$",format: "%v",decimal : ",",thousand: ".",precision : 2});
        //                         }
        //                     }
        //                 },
        //                 scales: {
        //                     yAxes: [{
        //                         display: true,
        //                         ticks: {
        //                             callback: function(value, index, values) {
        //                                 //formata os numeros do eixo y como dinheiro
        //                                 return accounting.formatMoney(value, {symbol : "R$",format: "%v",decimal : ",",thousand: ".",precision : 0});
        //                             },
        //                             beginAtZero: true
        //                         }
        //                     }]
        //                 }
        //             }
        //         });
        //     })
        //     .fail(function (xhr, status, errorThrown) {
        //         console.log("E002: Erro ao proessar requisição de informacoes do grafico");
        //     });

        let agora = new Date();

        dia = agora.getDate();
        mes = agora.getMonth(); // 0 a 11
        ano = agora.getFullYear();

        $.ajax({
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
        .done(function (dados_grafico) {
            // Set a callback to run when the Google Visualization API is loaded.
            $('.grafico .overlay').hide();
            google.charts.setOnLoadCallback(drawChart(dados_grafico));
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E002: Erro ao proessar requisição de informacoes do grafico");
        });


        //let agora = new Date();

        console.log('passou aqui na pagina inicial');
        // console.log(agora);
        //dia = agora.getDate();
        //mes = agora.getMonth(); // 0 a 11
        //ano = agora.getFullYear();

        let ultimo_dia = new Date(ano, mes + 1, 0);
        u_dia = ultimo_dia.getDate();
        u_mes = ultimo_dia.getMonth(); // 0 a 11
        u_ano = ultimo_dia.getFullYear();

        objPrincipal.campanhas_perfil = await get_campanha_perfil();

        console.log('ed_new');
        console.log(ano);
        console.log(mes);
        console.log(dia);
        console.log('ud_new');
        console.log(ultimo_dia);
        console.log(u_ano);
        console.log(u_mes);
        console.log(u_dia);
        console.log(mes + 1);
        console.log(`${ano}-${mes}-01`);
        console.log('fim_new');
        // aqui vai chamar todas as funcoes ao mesmo tempo e seguir depois que todas estiverem retornado
        // a que demorar mais pra responder vai definir quando segue pq tudo esta sendo executado em paralelo
        // usando destructuring assignament cada posicao do array vai ficr com o retorno da promise da mesma posicao
        let [
            dias_uteis,
            ticket_medio_perfil,
            indice_contratos_digitados_pagos_sintetico,
            metas_campanha_perfil,
            qtd_dias_uteis_restantes,
            dias_uteis_ate_hoje
        ] = await Promise.all([
            get_dias_uteis(`${ano}-${mes + 1}-01`,`${u_ano}-${u_mes + 1}-${u_dia}`),
            get_ticket_medio_perfil(),
            get_indice_contratos_digitados_pagos_sintetico(`${mes}`, `${ano}`),
            get_metas_campanha_perfil(),
            get_dias_uteis(`${ano}-${mes + 1}-${dia}`,`${u_ano}-${u_mes + 1}-${u_dia}`),
            get_dias_uteis(`${ano}-${mes + 1}-01`,`${ano}-${mes + 1}-${dia}`)
        ]);

        // let dias_uteis = await get_dias_uteis(`${ano}-${mes + 1}-01`,`${u_ano}-${u_mes + 1}-${u_dia}`);
        dias_uteis = dias_uteis.qtd_dias_uteis;
        // console.log('dias_uteis');
        // console.log(dias_uteis);

        // let ticket_medio_perfil = await get_ticket_medio_perfil();
        ticket_medio_perfil = ticket_medio_perfil.ticket_medio_perfil;

        // let indice_contratos_digitados_pagos_sintetico = await get_indice_contratos_digitados_pagos_sintetico();
        indice_contratos_digitados_pagos_sintetico = indice_contratos_digitados_pagos_sintetico[0];
        // console.log(indice_contratos_digitados_pagos_sintetico);
        let qtd_total_digitado = indice_contratos_digitados_pagos_sintetico.qtd_total_digitado;
        let qtd_total_pago = indice_contratos_digitados_pagos_sintetico.qtd_total_pago;

        // let indice_contratos_digitados_pagos = await get_indice_contratos_digitados_pagos();
        // console.log('indice_contratos_digitados_pagos');
        // console.log(indice_contratos_digitados_pagos);

        // let campanha_perfil = await get_campanha_perfil();
        // console.log('campanha_perfil');
        // console.log(campanha_perfil);

        // let metas_campanha_perfil = await get_metas_campanha_perfil();
        // TODO arqui vai travar no reigstro 0. o metodo sera alterado para retornar somente a campanha correta
        metas_campanha_perfil = metas_campanha_perfil[0];
        meta_total_campanha = metas_campanha_perfil.meta_total_campanha;
        atingimento_total_campanha = metas_campanha_perfil.atingimento_total_campanha;
        // console.log('metas_campanha_perfil');
        // console.log(metas_campanha_perfil);

        $('.grafico .detalhes .dias_uteis').html(dias_uteis);

        let meta_digitacao = meta_total_campanha / dias_uteis;
        let meta_digitacao_formatada = accounting.formatMoney(meta_digitacao, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .media_digitacao').html(meta_digitacao_formatada);

        let ticket_medio_perfil_formatado = accounting.formatMoney(ticket_medio_perfil, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .ticket_medio_perfil').html(ticket_medio_perfil_formatado);
        
        let meta_total_campanha_formatada = accounting.formatMoney(meta_total_campanha, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .meta_mes').html(meta_total_campanha_formatada);

        let atingimento_total_campanha_formatado = accounting.formatMoney(atingimento_total_campanha, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .realizado').html(atingimento_total_campanha_formatado);

        let porcentagem_realizado = ( (atingimento_total_campanha / meta_total_campanha) *100);
        let porcentagem_realizado_formatada = accounting.formatMoney(porcentagem_realizado, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .porcentagem_realizado').html( `${porcentagem_realizado_formatada}%`);

        // console.log(`de ${ano}-${mes + 1}-${dia} até ${u_ano}-${u_mes + 1}-${u_dia}`);
        // let qtd_dias_uteis_restantes = await get_dias_uteis(`${ano}-${mes + 1}-${dia}`,`${u_ano}-${u_mes + 1}-${u_dia}`);
        qtd_dias_uteis_restantes = qtd_dias_uteis_restantes.qtd_dias_uteis;
        // console.log('qtd_dias_uteis_restantes');
        // console.log(qtd_dias_uteis_restantes);
        let meta_diaria = (meta_total_campanha - atingimento_total_campanha)/qtd_dias_uteis_restantes;
        let meta_diaria_formatada = accounting.formatMoney(meta_diaria, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .meta_diaria').html(meta_diaria_formatada);

        $('.grafico .detalhes .propostas_digitadas').html(qtd_total_digitado);
        $('.grafico .detalhes .propostas_pagas').html(qtd_total_pago);
        
        let relacao_valor_digitado_pago = indice_contratos_digitados_pagos_sintetico.relacao_valor_digitado_pago;
        let relacao_valor_digitado_pago_formatado = accounting.formatMoney(relacao_valor_digitado_pago, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .relacao_digitada_paga').html(relacao_valor_digitado_pago_formatado);
        
        //dias uteis do comeco do mes ate hoje
        // let dias_uteis_ate_hoje = await get_dias_uteis(`${ano}-${mes + 1}-01`,`${ano}-${mes + 1}-${dia}`);
        dias_uteis_ate_hoje = dias_uteis_ate_hoje.qtd_dias_uteis;
        let projecao = (indice_contratos_digitados_pagos_sintetico.valor_elegivel_total_pago/dias_uteis_ate_hoje)*dias_uteis;
        let projecao_formatada = accounting.formatMoney(projecao, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
        $('.grafico .detalhes .projecao').html(projecao_formatada);
    })();

});


async function get_indice_contratos_digitados_pagos_sintetico_mes(mes, ano) 
{
    $.ajax({
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
    .done(function (dados_grafico) {
        // Set a callback to run when the Google Visualization API is loaded.
        $('.grafico .overlay').hide();
        google.charts.setOnLoadCallback(drawChart(dados_grafico));
    })
    .fail(function (xhr, status, errorThrown) {
        console.log("E002: Erro ao proessar requisição de informacoes do grafico");
    });

    let agora = new Date();
    dia = agora.getDate();

    let ultimo_dia = new Date(ano, mes, 0);
    u_dia = ultimo_dia.getDate();
    u_mes = ultimo_dia.getMonth(); // 0 a 11
    u_mes = u_mes + 1;
    u_ano = ultimo_dia.getFullYear();

    objPrincipal.campanhas_perfil = await get_campanha_perfil();

    // aqui vai chamar todas as funcoes ao mesmo tempo e seguir depois que todas estiverem retornado
    // a que demorar mais pra responder vai definir quando segue pq tudo esta sendo executado em paralelo
    // usando destructuring assignament cada posicao do array vai ficr com o retorno da promise da mesma posicao
    let [
        dias_uteis,
        ticket_medio_perfil,
        indice_contratos_digitados_pagos_sintetico,
        metas_campanha_perfil,
        qtd_dias_uteis_restantes,
        dias_uteis_ate_hoje
    ] = await Promise.all([
        get_dias_uteis(`${ano}-${mes}-01`,`${u_ano}-${u_mes}-${u_dia}`),
        get_ticket_medio_perfil(),
        get_indice_contratos_digitados_pagos_sintetico(`${mes}`, `${ano}`),
        get_metas_campanha_perfil(),
        get_dias_uteis(`${ano}-${mes}-${dia}`,`${u_ano}-${u_mes}-${u_dia}`),
        get_dias_uteis(`${ano}-${mes}-01`,`${ano}-${mes}-${dia}`)
    ]);

    // let dias_uteis = await get_dias_uteis(`${ano}-${mes + 1}-01`,`${u_ano}-${u_mes + 1}-${u_dia}`);
    dias_uteis = dias_uteis.qtd_dias_uteis;
    // console.log('dias_uteis');
    // console.log(dias_uteis);

    // let ticket_medio_perfil = await get_ticket_medio_perfil();
    ticket_medio_perfil = ticket_medio_perfil.ticket_medio_perfil;

    // let indice_contratos_digitados_pagos_sintetico = await get_indice_contratos_digitados_pagos_sintetico();
    indice_contratos_digitados_pagos_sintetico = indice_contratos_digitados_pagos_sintetico[0];
    // console.log(indice_contratos_digitados_pagos_sintetico);
    let qtd_total_digitado = indice_contratos_digitados_pagos_sintetico.qtd_total_digitado;
    let qtd_total_pago = indice_contratos_digitados_pagos_sintetico.qtd_total_pago;

    // let indice_contratos_digitados_pagos = await get_indice_contratos_digitados_pagos();
    // console.log('indice_contratos_digitados_pagos');
    // console.log(indice_contratos_digitados_pagos);

    // let campanha_perfil = await get_campanha_perfil();
    // console.log('campanha_perfil');
    // console.log(campanha_perfil);

    // let metas_campanha_perfil = await get_metas_campanha_perfil();
    // TODO arqui vai travar no reigstro 0. o metodo sera alterado para retornar somente a campanha correta
    metas_campanha_perfil = metas_campanha_perfil[0];
    meta_total_campanha = metas_campanha_perfil.meta_total_campanha;
    atingimento_total_campanha = metas_campanha_perfil.atingimento_total_campanha;
    // console.log('metas_campanha_perfil');
    // console.log(metas_campanha_perfil);

    $('.grafico .detalhes .dias_uteis').html(dias_uteis);

    let meta_digitacao = meta_total_campanha / dias_uteis;
    let meta_digitacao_formatada = accounting.formatMoney(meta_digitacao, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .media_digitacao').html(meta_digitacao_formatada);

    let ticket_medio_perfil_formatado = accounting.formatMoney(ticket_medio_perfil, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .ticket_medio_perfil').html(ticket_medio_perfil_formatado);
    
    let meta_total_campanha_formatada = accounting.formatMoney(meta_total_campanha, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .meta_mes').html(meta_total_campanha_formatada);

    let atingimento_total_campanha_formatado = accounting.formatMoney(atingimento_total_campanha, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .realizado').html(atingimento_total_campanha_formatado);

    let porcentagem_realizado = ( (atingimento_total_campanha / meta_total_campanha) *100);
    let porcentagem_realizado_formatada = accounting.formatMoney(porcentagem_realizado, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .porcentagem_realizado').html( `${porcentagem_realizado_formatada}%`);

    // console.log(`de ${ano}-${mes + 1}-${dia} até ${u_ano}-${u_mes + 1}-${u_dia}`);
    // let qtd_dias_uteis_restantes = await get_dias_uteis(`${ano}-${mes + 1}-${dia}`,`${u_ano}-${u_mes + 1}-${u_dia}`);
    qtd_dias_uteis_restantes = qtd_dias_uteis_restantes.qtd_dias_uteis;
    // console.log('qtd_dias_uteis_restantes');
    // console.log(qtd_dias_uteis_restantes);
    let meta_diaria = (meta_total_campanha - atingimento_total_campanha)/qtd_dias_uteis_restantes;
    let meta_diaria_formatada = accounting.formatMoney(meta_diaria, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .meta_diaria').html(meta_diaria_formatada);

    $('.grafico .detalhes .propostas_digitadas').html(qtd_total_digitado);
    $('.grafico .detalhes .propostas_pagas').html(qtd_total_pago);
    
    let relacao_valor_digitado_pago = indice_contratos_digitados_pagos_sintetico.relacao_valor_digitado_pago;
    let relacao_valor_digitado_pago_formatado = accounting.formatMoney(relacao_valor_digitado_pago, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .relacao_digitada_paga').html(relacao_valor_digitado_pago_formatado);
    
    //dias uteis do comeco do mes ate hoje
    // let dias_uteis_ate_hoje = await get_dias_uteis(`${ano}-${mes + 1}-01`,`${ano}-${mes + 1}-${dia}`);
    dias_uteis_ate_hoje = dias_uteis_ate_hoje.qtd_dias_uteis;
    let projecao = (indice_contratos_digitados_pagos_sintetico.valor_elegivel_total_pago/dias_uteis_ate_hoje)*dias_uteis;
    let projecao_formatada = accounting.formatMoney(projecao, {symbol : "",format: "%v",decimal : ",",thousand: ".",precision : 2});
    $('.grafico .detalhes .projecao').html(projecao_formatada);


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
             console.log('indice-contratos-digitados-pagos-sintetico');
             console.log(retorno);
        })
        .fail(function (xhr, status, errorThrown) {
            console.log("E001: Erro ao proessar requisição de indice-contratos-digitados-pagos-sintetico teste no principal.js");
        });
}


function escreve_mesano(mes, ano, tag)
{
  var tag_li = document.getElementById('lista_meses');
  var tag_a  = tag_li.getElementsByTagName('a');
  for (i=0; i<tag_a.length; i++ )
  {
    tag_a[i].style.color = "";
    tag_a[i].style.fontWeight = "";
  }
  tag.style.color = "#ff0000";
  tag.style.fontWeight = "bolder";
}




