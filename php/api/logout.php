<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

	unset($_SESSION['ada_username']);
	unset($_SESSION['ada_user_id']);
	unset($_SESSION['ada_user_type']);
	unset($_SESSION['ada_nickname']);
	unset($_SESSION['ada_name']);

?>