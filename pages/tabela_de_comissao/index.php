<?php require_once('../header.php'); ?>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <span>Relatórios <i class="fa fa-angle-right"></i> Tabela de comissão</span>
            </section>

            <!-- Main content -->
            <section class="content">

            <div class="row">
                <div class="col-sm-12">
                    <!-- formulario -->
                    <div class="box box-warning">
                    <div class="box-header ">
                    <!-- <h3 class="box-title">Horizontal Form</h3> -->
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form class="form-horizontal">
                    <div class="box-body">

                        <div class="form-group">
                            <label for="data_vigencia" class="col-sm-2 control-label">Data de vigência</label>

                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="data_vigencia" placeholder="00/00/0000">
                            </div>

                        </div>

                        <div class="form-group">
                            <label for="instituicao" class="col-sm-2 control-label">Instituição</label>

                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="instituicao" placeholder="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="convenio" class="col-sm-2 control-label">Convênio</label>

                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="convenio" placeholder="">
                            </div>
                        </div>

                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer">
                        <!-- <button type="submit" class="btn btn-default">Cancel</button> -->
                        <button type="submit" class="btn btn-success pull-right">Pesquisar</button>
                    </div>
                    <!-- /.box-footer -->
                    </form>
                </div>
                    <!-- ./formulario -->
                </div>
            </div>
            </section>
            <!-- /.content -->

        </div>
        <!-- /.content-wrapper -->
        <?php require_once('../footer.php');?>


    <script src="../../dist/vendor/tiny-slider/tiny-slider.js"></script>

    <!-- https://validatejs.org/ vaidacao do formulario -->
    <script src="../../dist/vendor/validatejs/validate.js"></script>
    <!-- https://momentjs.com/  trabalhar com data e hora -->
    <script src="../../dist/vendor/momentjs/moment.js"></script>
    <!-- https://github.com/uNmAnNeR/imaskjs mascaras dos campos do fomulario -->
    <script src="../../dist/vendor/imaskjs/imask.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            $('#carousel_principal').carousel();

            $('#data_vigencia').datepicker({
                language: 'pt-BR', 
                forceParse: false,
                autoclose: true,
                keyboardNavigation: false});

            // seta a data do datepicker para a data atual
            $('#data_vigencia').datepicker('setDate',moment().format('DD/MM/YYYY'));

            // configura a mascara dos campos
            let el_data_vigencia = document.querySelector('#data_vigencia');
            var data_vigencia_mask = {
                mask: '00/00/0000'
            };
            mask = new IMask(el_data_vigencia, data_vigencia_mask);

        },false);
    </script>

</body>

</html>