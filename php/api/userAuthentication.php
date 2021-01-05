<?php

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// /header('Content-Type: application/download; charset=utf-8');

$returnJson = array();

if(isset($_SESSION['ada_username'])){

	$returnJson['username'] = $_SESSION['ada_username'];
	$returnJson['id'] = $_SESSION['ada_user_id'];
	$returnJson['userType'] = $_SESSION['ada_user_type'];
	$returnJson['nickname'] = $_SESSION['ada_nickname'];
	$returnJson['name'] = $_SESSION['ada_name'];
	$returnJson['allowedAccess'] = 1; // true
}
else{
	
	$returnJson['allowedAccess'] = 0; //false

}

print_r(json_encode($returnJson));


?>