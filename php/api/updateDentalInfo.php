<?php

$database = require '..\bootstrap.php';



$returnValue = array();
$returnValue["status"] = "ERROR";


	$results = $database->fetchJO();
	

	foreach ($results as $r) {
		$r = $database->updateDentalInfo($r['job_order_id'], $r['last_modified'], $r['last_modified_by']);
	}
	print_r(json_encode($results));


?>