<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');


// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$returnValue = array();
$returnValue["status"] = "ERROR";
$numberOfMonths = $data['numberOfMonths'];

try{

	$resultsTotal = $database->fetchCostSummary($numberOfMonths);

	$dateTime = new DateTime('first day of this month');
	$dateTime->modify('-'.($numberOfMonths-1).' month');

	$months = array();
	$years = array();

	for ($i = 1; $i <= $numberOfMonths; $i++) {
	   
	    array_push($months, $dateTime->format('n'));
	    array_push($years, $dateTime->format('Y'));

	    $dateTime->modify('+1 month');
	}


	$tData = array();

	for ($i = 0; $i < $numberOfMonths; $i++) {

		$y = $years[$i];
		$m = $months[$i];

		$tAmount = 0;
		foreach ($resultsTotal as $rk) {
	    	if($y == $rk['year'] && $m == $rk['month']) $tAmount = $rk['total_amount'];
	    }

	    array_push($tData, $tAmount);


	}

	$returnValue["status"] = "SUCCESS";
	$returnValue['message']['tData'] = $tData;


}
catch(PDOException $e){

	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>