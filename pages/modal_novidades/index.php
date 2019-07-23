    <!-- modal das novidades -->
    <div class="modal" id="modal_novidades" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Novidades</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- carrossel das novidades -->
        <div class="box box-solid">
                        <!-- <div class="box-header with-border">
                        <h3 class="box-title">Carousel</h3>
                        </div> -->
                        <!-- /.box-header -->
                        <div class="box-body" style="padding:0;">
                        <div id="carousel_novidades" class="carousel slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                            <li data-target="#carousel_novidades" data-slide-to="0" class="active"></li>
                            <li data-target="#carousel_novidades" data-slide-to="1" class=""></li>
                            </ol>
                            <div class="carousel-inner">
                            <div class="item active">
                                <img style="margin:auto;" src="../principal/banner/1.jpg" alt="First slide">
                                <!-- <div class="carousel-caption">
                                First Slide
                                </div> -->
                            </div>
                            <div class="item ">
                                <img style="margin:auto;" src="../principal/banner/2.jpg" alt="Second slide">
                                <!-- <div class="carousel-caption">
                                Second Slide
                                </div> -->
                            </div>
                            </div>
                            <a class="left carousel-control" href="#carousel_novidades" data-slide="prev">
                            <span class="fa fa-angle-left"></span>
                            </a>
                            <a class="right carousel-control" href="#carousel_novidades" data-slide="next">
                            <span class="fa fa-angle-right"></span>
                            </a>
                        </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
        <!-- ./carrossel das novidades -->
      </div>
      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
        <button type="button" class="btn btn-primary" data-dismiss="modal">Entendi. Não mostrar novamente.</button>
      </div>
    </div>
  </div>
</div>
    <!-- ./modal das novidades -->

<script>
$('#carousel_novidades').carousel({interval: false});

//abre o modal das novidades
$('#modal_novidades').modal({backdrop:'static'});
</script>