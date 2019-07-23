<?php

require_once ('barcode.inc.php');
$code_number = $_GET['numero'];
$print_numero = $_GET['print_numero'];

if ($print_numero == 'false') {
	new barCodeGenerator($code_number, 0, $code_number . '.gif', 50, 20, false);
} else {
	new barCodeGenerator($code_number, 0, $code_number . '.gif', 50, 20, true);
}
?>