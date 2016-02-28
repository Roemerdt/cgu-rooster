<?php

date_default_timezone_set('Europe/Amsterdam');

$beginTime = strtotime('last sunday');
$endTime = strtotime('next saturday');

$auth_token = $_POST['auth'];

$cmdSC = 'curl "https://cgu.zportal.nl/api/v2/appointments?user=~me&start='.$beginTime.'&end='.$endTime.'&access_token='. $auth_token .'"';
exec($cmdSC, $resultSC);

$rooster = json_decode($resultSC[0], true);
$roosterData = $rooster['response']['data'];

$count = 0;

$roosterArray = array();

foreach ($roosterData as $key => $value) {
	$count += 1;
	// echo $count . ': ';
	// var_dump($value['start']);
	$startTimeStamp = $value['start'];
	// echo ", ";
	// var_dump($value['end']);
	$endTimeStamp = $value['end'];
	// echo ", ";
	// var_dump($value['subjects'][0]);
	$subject = $value['subjects'][0];
	// echo ", ";
	// var_dump($value['teachers'][0]);
	$teacher = $value['teachers'][0];
	// echo ", ";
	// var_dump($value['groups'][0]);
	$group = $value['groups'][0];
	// echo ", ";
	// var_dump($value['locations'][0]);
	$location = $value['locations'][0];
	// echo ", ";
	// var_dump($value['cancelled']);
	$cancelled = $value['cancelled'];
	// echo ", ";
	// var_dump($value['moved']);
	$moved = $value['moved'];
	// echo ", ";
	// var_dump(date('D d-m-y H:i:s', $value['start']));
	// echo ", ";
	// var_dump(date('D d-m-y H:i:s', $value['end']));
	// echo ", ";
	// var_dump($value['startTimeSlot']);
	// echo ", ";
	// var_dump($value['endTimeSlot']);
	// echo "<br>";

	$baseUnix = strtotime('today', $startTimeStamp);
	$weekDay = date('N', $startTimeStamp);

	$tempRoosterArray = array(
		'start' => $startTimeStamp, 
		'end' => $endTimeStamp,
		'baseUnix' => $baseUnix,
		'weekDay' => $weekDay,
		'moved' => $moved, 
		'cancelled' => $cancelled, 
		'subject' => $subject, 
		'location' => $location, 
		'teacher' => $teacher, 
		'group' => $group
		);
	array_push($roosterArray, $tempRoosterArray);
}

echo json_encode($roosterArray);

?>