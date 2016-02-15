<?php 

$koppelcode = $_POST['k_id'];
$lln = $_POST['lln'];

$cmdAT = 'curl --data "grant_type=authorization_code&code='.$koppelcode.'" https://cgu.zportal.nl/api/v2/oauth/token';
exec($cmdAT, $resultAT);

var_dump(json_encode($resultAT[0]));

?>