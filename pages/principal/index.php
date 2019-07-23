<?php require_once('../header.php'); ?>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <i class="fa fa-home"></i> <span>Principal</span>
            </section>

            <!-- Main content -->
            <section class="content">
            <div class="row">
              <!-- <span class="info-box-number">40</span> 
              <div class="col-sm-12 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fa fa-file-text-o"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Pendências</span>

                <div  style="text-align:center;font-size:15px;">-</div>
              </div>
                </div>
              </div> -->         

              <!-- ./col -->
              <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-red">
                <div class="inner">
                  <h3>--</h3>

                  <p>Pendências</p>
                </div>
                <div class="icon">
                  <i class="ion ion-funnel"></i>
                </div>
                <a href="#" class="small-box-footer">
                  Mais Informações <i class="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-red">
                <div class="inner">
                  <h3>--</h3>

                  <p>Pendências</p>
                </div>
                <div class="icon">
                  <i class="ion ion-help"></i>
                </div>
                <a href="#" class="small-box-footer">
                  Mais Informações <i class="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-red">
                <div class="inner">
                  <h3>--</h3>

                  <p>Tabela de Comissão</p>
                </div>
                <div class="icon">
                  <i class="ion ion-chatbox"></i>
                </div>
                <a href="#" class="small-box-footer">
                  Mais Informações <i class="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>

            <div class="col-lg-3 col-xs-6">
              <div class="small-box bg-green">
                <div class="inner">
                  <h3>--</h3>

                  <p>Pendências</p>
                </div>
                <div class="icon">
                  <i class="ion ion-information-circled"></i>
                </div>
                <a href="#" class="small-box-footer">
                  Mais Informações <i class="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>

              <!-- ./col 
              <div class="col-sm-12 col-md-3">
                <a href="#">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fa fa-exclamation"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Pendências</span>
                <div  style="text-align:center;font-size:15px;">-</div>
              </div>
                </div>
              </a>

              </div>
              <div class="col-sm-12 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-red"><i class="fa fa-dollar"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Tabela Comissão</span>
                <div  style="text-align:center;font-size:15px;">-</div>
              </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-3">
              <div class="info-box">
                <span class="info-box-icon bg-green"><i class="fa fa-exclamation-triangle"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Pendências</span>
                <div  style="text-align:center;font-size:15px;">-</div>
              </div>
                </div>-->
              
            </div>

          <div class="row">

            <div class="col-sm-12 col-md-12" >
                <div class="box box-info"style="overflow-y: hidden;overflow-x: auto;">
                <div class="box-header with-border">
                <h3 class="box-title">Contratos Digitados x Pagos</h3>
                <!--<h3 class="box-title">Contratos digitados x pagos (<?php //echo date('m').'/'.date('Y');?>)</h3>-->
                <div class="box-footer clearfix">
                <ul class="pagination pagination-sm no-margin pull-left">
                  <!--<li><a href="#">&laquo;</a></li>-->
                  <li><a href="#"><?php echo date('m').'/'.date('Y');?></a></li>
                  <li><a href="#"><?php echo date('m', strtotime('-1 months')).'/'.date('Y');?></a></li>
                  <li><a href="#"><?php echo date('m', strtotime('-2 months')).'/'.date('Y');?></a></li>
                  <!--<li><a href="#">&raquo;</a></li>-->
                </ul>
                </div>

                <div class="box-tools pull-right">
                  <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                  </button>
                </div>
                </div>
                <div class="box-body grafico">
                  <div class="overlay">
                    <i class="fa fa-refresh fa-spin"></i>
                  </div>

                  <div style="display: flex;" class="detalhes">
                    <div style="font-family: monospace;">
                      <table class="table table-hover table-striped table-bordered w-auto" style="min-width: 350px;">
                        <tr class="w-25">
                          <th scope="row">Dias úteis (d.u.)</th>
                          <td style="text-align: right;padding-left: 4px;" class="dias_uteis">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Média Digitação (d.u.)</th>
                          <td style="text-align: right;padding-left: 4px;" class="media_digitacao">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                        <th scope="row">Ticket Médio</th>
                          <td style="text-align: right;padding-left: 4px;" class="ticket_medio_perfil">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Meta Mês</th>
                          <td style="text-align: right;padding-left: 4px;" class="meta_mes">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Realizado</th>
                          <td style="text-align: right;padding-left: 4px;" class="realizado">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">% realizado</th>
                          <td style="text-align: right;padding-left: 4px;" class="porcentagem_realizado">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Meta diária (d.u.)</th>
                          <td style="text-align: right;padding-left: 4px;" class="meta_diaria">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                      <!-- </table>

                      <table style="width: 100%;"> -->
                        <tr class="w-25">
                          <th scope="row">Propostas digitadas</th>
                          <td style="text-align: right;padding-left: 4px;" class="propostas_digitadas">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Propostas pagas</th>
                          <td style="text-align: right;padding-left: 4px;" class="propostas_pagas">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">Relação digitada X paga</th>
                          <td style="text-align: right;padding-left: 4px;" class="relacao_digitada_paga">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                      <!-- </table>

                      <table style="width: 100%;"> -->
                        <tr class="w-25">
                          <th scope="row">Projeção</th>
                          <td style="text-align: right;padding-left: 4px;" class="projecao">
                            <img src="../../dist/img/carregando_barras.gif" />
                          </td>
                        </tr>
                        <tr class="w-25">
                          <th scope="row">GAP</th>
                          <td style="text-align: right;padding-left: 4px;" class="gap">0</td>
                        </tr>
                    </table>
                  </div>                  
                  <div id="grafico_digitados_pagos" style="width: 100%;"></div>
                  </div>
                </div>
              </div>
            </div>              
          </div>

          <div class="row">

                    <!-- carrossel -->
                    <div class="col-sm-12">
                    <div class="box box-solid">
                        <!-- <div class="box-header with-border">
                        <h3 class="box-title">Carousel</h3>
                        </div> -->
                        <!-- /.box-header -->
                        <div class="box-body" style="padding:0;">
                        <div id="carousel_principal" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                            <li data-target="#carousel_principal" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel_principal" data-slide-to="1" class=""></li>
                            </ol>
                            <div class="carousel-inner">
                            <div class="item active">
                                <img style="margin:auto;" src="banner/1.jpg" alt="First slide">
                                <!-- <div class="carousel-caption">
                                First Slide
                                </div> -->
                            </div>
                            <div class="item ">
                                <img style="margin:auto;" src="banner/2.jpg" alt="Second slide">
                                <!-- <div class="carousel-caption">
                                Second Slide
                                </div> -->
                            </div>
                            </div>
                            <a class="left carousel-control" href="#carousel_principal" data-slide="prev">
                            <span class="fa fa-angle-left"></span>
                            </a>
                            <a class="right carousel-control" href="#carousel_principal" data-slide="next">
                            <span class="fa fa-angle-right"></span>
                            </a>
                        </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- carrossel -->
                </div>

                

            </div>

            </section>
            <!-- /.content -->

        </div>
        <!-- /.content-wrapper -->
        <?php require_once('../footer.php');?>

    <!-- <script src="../../dist/vendor/tiny-slider/tiny-slider.js"></script> -->
    <script src="../../dist/vendor/accounting/accounting.min.js"></script>
    <script src="../../dist/vendor/momentjs/moment.js"></script>

    <!-- google charts -->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script src="principal_funcoes.js"></script>
    <script src="principal.js"></script>

    <script>
        // $('#carousel_principal').carousel();    
    </script>

    <?php #require_once('../modal_novidades/index.php');?>

</body>

</html>