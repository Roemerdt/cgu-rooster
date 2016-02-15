<?php

$beginTime = strtotime('31-01-2016');
$endTime = strtotime('08-02-2016');

$auth_token = $_POST['auth'];

$encoded = json_decode($resultAT[0]);
$access_token = $encoded->access_token;
// var_dump($access_token);

$cmdSC = 'curl "https://cgu.zportal.nl/api/v2/appointments?user=~me&start='.$beginTime.'&end='.$endTime.'&access_token='. $auth_token .'"';
exec($cmdSC, $resultSC);

// var_dump($resultSC);
echo "\n";
echo "\n";
echo "\n";
$bla = json_decode($resultSC[0]);
$res = $bla->response;
$data = $res->data;

$masterArray = [];

foreach ($data as $key => $value) {
	// echo implode('', $value->subjects);
	// echo " ";
	// echo implode('', $value->locations);
	// echo " ";
	// echo implode('', $value->teachers);
	// echo " ";
	// echo $value->startTimeSlot;
	// echo "-";
	// echo $value->endTimeSlot;
	// echo " ";
	// echo date('H:i d/m/Y', $value->start);
	// echo "<br/>";
	// var_dump($value);
	// echo "<br/>";

	$tempArr = array($value->start, $value->startTimeSlot, $value->endTimeSlot, implode($value->subjects), implode($value->locations), implode($value->teachers), implode($value->groups));
	$nice_arr = json_encode($tempArr);
	array_push($masterArray, $nice_arr);
}

echo json_encode($masterArray);

?>