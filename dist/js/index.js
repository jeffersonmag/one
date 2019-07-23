$(document).ready(function () {

    let campo_usuario = document.querySelector('.campo-usuario');
    campo_usuario.focus();

    Mousetrap(campo_usuario).bind('enter', function(e, combo) {
        document.querySelector('.campo-senha').focus();
    });

    let campo_senha = document.querySelector('.campo-senha');
    Mousetrap(campo_senha).bind('enter', function(e, combo) {
        document.querySelector('.btn-logar').click();
    });

    $('.btn-logar').on('click', function (ev) {

        $('.msg-login').html(`
            <img style="margin:auto;" src="./dist/img/carregando.gif" />
        `);

        // usuario 20362665000152
        let usuario = document.querySelector('.campo-usuario').value;
        // senha DV2208
        let senha = document.querySelector('.campo-senha').value.toUpperCase();

        $.ajax({
            url: "dist/php/index.php",
            data: {
                acao: 'token',
                usuario: usuario,
                senha: senha,
                sid: Math.random()
            },

            type: "POST",
            dataType: "json",
        })
            .done(function (retorno) {
                if(retorno == 1){
                    document.location = './pages/principal/index.php';
                }
                else{
                    $('.msg-login').html(`
                      <div class="alert alert-danger" role="alert">
                        Verifique o usuário e senha e tente novamente!
                      </div>
                    `);

                    document.querySelector('.campo-usuario').focus();
                }
            })
            .fail(function (xhr, status, errorThrown) {
                console.log("E001: Erro ao proessar requisição de login");
            });
    });

})
