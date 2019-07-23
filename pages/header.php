<?php
if(!isset($_SESSION)){
    session_start();
}

//se ja tiver com um roken registrado vai para a pagina principal
if(!isset($_SESSION['token'])){
    header("location: ../../index.php");
}

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>STARK</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
    
    <link rel="stylesheet" href="../../dist/vendor/tiny-slider/tiny-slider.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-yellow sidebar-mini sidebar-collapse">
    <div class="wrapper">

    <header class="main-header">
            <!-- Logo -->
            <a href="#" class="logo" data-toggle="push-menu" role="button">
                <!-- mini logo for sidebar mini 50x50 pixels -->
                <!-- <span class="logo-mini"><img src="../dist/img/logo_stark_mini.png"></span> -->
                <span class="logo-mini"><img src="../../dist/img/logo_empresa_mini.png"></span>
                <!-- logo for regular state and mobile devices -->
                <!-- <span class="logo-lg"><img src="../dist/img/logo_stark.png"></span> -->
                <span class="logo-lg"><img src="../../dist/img/logo_empresa.png"></span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top">
                <!-- Sidebar toggle button-->
                <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span class="sr-only">Abrir e fechar menu</span>
                </a>

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li><a href="#" class="info-usuario"><img src="../../dist/img/carregando_barras.gif" /></a></li>
                    </ul>
                </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
                <?php require_once('../menu.php'); ?>
            </section>
            <!-- /.sidebar -->
        </aside>