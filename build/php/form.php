<?php

date_default_timezone_set('Europe/Amsterdam');
$date = new DateTime();

$auth_token = $_POST['auth'];
$week_to_get = $_POST['week'];

$beginTime = strtotime( date('Y') . 'W' . $week_to_get);
$endTime = strtotime( date('Y') . 'W' . $week_to_get . ' +6 days');

$cmdSC = 'curl "https://cgu.zportal.nl/api/v2/appointments?user=~me&start='.$beginTime.'&end='.$endTime.'&access_token='. $auth_token .'"';
exec($cmdSC, $resultSC);

$rooster = json_decode($resultSC[0], true);
$roosterData = $rooster['response']['data'];

$count = 0;

$roosterArray = array();

foreach ($roosterData as $key => $value) {
	$count += 1;
	$startTimeStamp = $value['start'];
	$endTimeStamp = $value['end'];
	$subject = $value['subjects'][0];
	$teacher = $value['teachers'][0];
	$group = $value['groups'][0];
	$location = $value['locations'][0];
	$cancelled = $value['cancelled'];
	$moved = $value['moved'];

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