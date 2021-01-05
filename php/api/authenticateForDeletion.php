<?php

$database = require '..\bootstrapLogin.php';
session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

// getting post data //
$username = $data['username'];
$password = $data['password'];

$returnJson = array();

$returnJson['status'] = "ERROR";
$returnJson['message'] = "Please check authentication.";

$results = $database->authenticateUser($username,$password);

if($results){

	if($results[0]['user_type'] == 3){ //if returns true

		
		$returnJson['status'] = "SUCCESS";
		$returnJson['message'] = "Successful";

	}
	else{

		$returnJson['message'] = "Only SA Account can void transaction";

	}
}

print_r(json_encode($returnJson));



?>