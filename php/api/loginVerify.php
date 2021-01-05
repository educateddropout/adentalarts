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

$results = $database->authenticateUser($username,$password);

if($results){ //if returns true

	$_SESSION['ada_username'] = $username;
	$_SESSION['ada_user_id'] = $results[0]['user_id'];
	$_SESSION['ada_user_type'] = $results[0]['user_type'];
	$_SESSION['ada_nickname'] = $results[0]['nickname'];
	$_SESSION['ada_name'] = $results[0]['name'];
	
	$returnJson['success'] = true;

}
else{

	$returnJson['success'] = false;
}

print_r(json_encode($returnJson));



?>