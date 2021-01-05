<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$userId = $_SESSION['ada_user_id'];

$returnValue = array();
$returnValue["status"] = "ERROR";

$particularDetails = $data['particularDetails'];

try {

	$results = $database->saveParticulars($particularDetails, $userId);
	if($results == 1) $returnValue["status"] = "SUCCESS";
	else {
		$returnValue["status"] = "ERROR";
		$returnValue["message"] = $results;
	}

} 
catch(PDOException $e){

	$returnValue["status"] = "ERROR";
	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));

?>