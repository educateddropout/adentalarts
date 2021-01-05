<?php

class QueryBuilder

{

	protected $pdo;
	public $defaulPassword = "ampongdental";

	public function __construct($pdo)

	{

		$this->pdo = $pdo;

	}

	public function checkIfUsernameExist($username){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id
											FROM tbl_users
											WHERE username = ?");

		$statement->execute([$username]);

		return $statement->rowCount();
		//return $statement->errorInfo();

	}


	public function authenticateUser($username, $password){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT user_type, name, nickname, user_id, username
											FROM tbl_users
											WHERE username = ? and password = MD5(?) and archive = ?");

		$statement->execute([$username, $password, $archive]);

		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveClientDetails($clientDetails, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO tbl_clients
												(client_name, address, contact_number, email_address,
												last_modified, last_modified_by, date_added, archive)
											VALUES (?,?,?,?,
														?,?,?,?)");

		$statement->execute([strtoupper($clientDetails["name"]["value"]), strtoupper($clientDetails["address"]["value"]), 
								$clientDetails["contactNumber"]["value"], $clientDetails["emailAddress"]["value"],
								$currentDate, $userId, $currentDate, $archive]);

		return $statement->rowCount();


	}

	public function fetchCostSummary($months){

		$archive = 0; // active
		$type_of_transaction = "O";

		$statement = $this->pdo->prepare("SELECT SUM(total_price) as 'total_amount', YEAR(date_added) as 'year', MONTH(date_added) as 'month' from tbl_job_order 
											WHERE date_added > curdate() - interval (dayofmonth(curdate()) - 1) day - interval ? month AND archive = ?
											GROUP BY YEAR(date_added), MONTH(date_added)
											ORDER BY year,month");

		$transaction = $statement->execute([$months, $archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function updateClientDetails($clientDetails, $userId, $clientId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE tbl_clients
											SET client_name = ?, address = ?, contact_number = ?,
											email_address = ?, last_modified = ?, last_modified_by = ?
											WHERE client_id = ?");

		$statement->execute([strtoupper($clientDetails["name"]["value"]), strtoupper($clientDetails["address"]["value"]), $clientDetails["contactNumber"]["value"], 
										$clientDetails["emailAddress"]["value"], $currentDate, $userId, $clientId]);

		return $statement->rowCount();


	}

	public function archiveClientDetails($userId, $clientId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted

		$statement = $this->pdo->prepare("UPDATE tbl_clients
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE client_id = ?");

		$statement->execute([$archive,$currentDate, $userId, $clientId]);

		return $statement->rowCount();


	}

	public function fetchClients(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT client_id, client_name, address, contact_number, email_address, last_modified
											FROM tbl_clients 
											WHERE archive = ?
											ORDER BY client_name ASC");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}




	public function saveParticulars($particularDetails, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO lib_particulars
												( description, price, date_added, last_modified,
												last_modified_by, archive)
											VALUES (?,?,?,?,
														?,?)");

		$statement->execute([strtoupper($particularDetails["description"]["value"]), $particularDetails["price"]["value"], 
								$currentDate, $currentDate, $userId, $archive]);

		return $statement->rowCount();


	}

	public function updateParticulars($particularDetails, $userId, $particularId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE lib_particulars
											SET description = ?, price = ?, last_modified = ?, last_modified_by = ?
											WHERE particular_id = ?");

		$statement->execute([strtoupper($particularDetails["description"]["value"]), 
										$particularDetails["price"]["value"], $currentDate, $userId, $particularId]);

		return $statement->rowCount();


	}

	public function archiveParticulars($userId, $particularId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted

		$statement = $this->pdo->prepare("UPDATE lib_particulars
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE particular_id = ?");

		$statement->execute([$archive,$currentDate, $userId, $particularId]);

		return $statement->rowCount();


	}

	public function fetchParticulars(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT particular_id, description, price, last_modified
											FROM lib_particulars 
											WHERE archive = ?
											ORDER BY description ASC");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveTechnicians($technicianDetails, $userId){

		
		$id = guidv4();
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO tbl_technicians
												(technician_name, date_added, last_modified,
												last_modified_by, archive)
											VALUES (?,?,?,?,?)");

		$statement->execute([ strtoupper($technicianDetails["name"]["value"]), 
								$currentDate, $currentDate, $userId, $archive]);

		return $statement->rowCount();


	}

	public function updateTechnicians($technicianDetails, $userId, $technicianId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("UPDATE tbl_technicians
											SET technician_name = ?, last_modified = ?, last_modified_by = ?
											WHERE technician_id = ?");

		$statement->execute([strtoupper($technicianDetails["name"]["value"]), $currentDate, $userId, $technicianId]);

		return $statement->rowCount();


	}

	public function archiveTechnicians($userId, $technicianId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted

		$statement = $this->pdo->prepare("UPDATE tbl_technicians
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE technician_id = ?");

		$statement->execute([$archive,$currentDate, $userId, $technicianId]);

		return $statement->rowCount();


	}

	public function fetchTechnicians(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT technician_id, technician_name, last_modified
											FROM tbl_technicians 
											WHERE archive = ?
											ORDER BY technician_name ASC");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function updateJobOrderStatus($jobOrderId, $userId){

		$status = "C"; // Closed
		$currentDate = date("Y-m-d H:i:s");

		$statement = $this->pdo->prepare("UPDATE tbl_job_order
											SET status = ?, last_modified_by = ?, last_modified = ?
											WHERE job_order_id = ?");

		$statement->execute([$status, $userId, $currentDate, $jobOrderId]);

		return $statement->rowCount();


	}

	public function saveJobOrder($form, $userId){

		$clientId = $form["client"]["value"];
		$technicianId = $form["client"]["value"];
		$patientName = $form["patientName"]["value"];
		$particulars = $form["particulars"];
		$totalPrice = $form["totalPrice"];
		$tPercentage = $form["tPercentage"]["value"];

		$currentDate = date("Y-m-d H:i:s");
		$dateReceived = date("Y-m-d");
		$archive = 0; // active

		$rv = array();
		$status = "O"; //ongoing

		$jobOrderId = "AD-".date("Y").date("m")."-".uniqidReal(6);
		$remarks = "JOB ORDER RECEIVED"; // initial remarks
		$transactionType = "RECEIVED";

		try {

	        $this->pdo->beginTransaction();

	        // prepare the pdo query
			$statement = $this->pdo->prepare("INSERT INTO tbl_job_order
												(job_order_id, client_id, technician_id, patient_name, total_price, status,
													technician_percentage,

													date_received, date_added, last_modified, last_modified_by, archive)
											VALUES (?,?,?,?,?,?,
														?,
														?,?,?,?,?)");
						
			$statement->execute([$jobOrderId,$clientId, $technicianId, strtoupper($patientName), $totalPrice, $status,
									$tPercentage,
									$dateReceived, $currentDate, $currentDate, $userId, $archive]);

			$statement = $this->pdo->prepare("INSERT INTO tbl_job_order_history
												(job_order_id, transaction_type, remarks, date_added, 
													last_modified, last_modified_by, archive)
											VALUES (?,?,?,?,?,?,?)");
						
			$statement->execute([$jobOrderId, $transactionType, strtoupper($remarks), $currentDate, $currentDate, $userId,$archive]);
			        
		    
			foreach ($particulars as $p) {
				$statement = $this->pdo->prepare("INSERT INTO tbl_particulars
												(job_order_id, particular_id, particular_description, price, quantity, archive)
											VALUES (?,?,?,?,?,?)");
						
				$statement->execute([$jobOrderId,$p["id"], $p["description"], $p["price"], $p["quantity"], $archive]);
			}
		       
		    $this->pdo->commit();

		    $rv["message"] = "SUCCESS";

		 } catch (PDOException $e) {

		       $this->pdo->rollback();

		       $rv["message"] = $e;
		}

			

		return $rv;

	}

	public function fetchJobOrders($dateFrom, $dateTo){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT j.job_order_id, j.client_id, j.date_received, j.patient_name, j.technician_id,
												j.total_price, j.date_added, t.technician_name, c.client_name, c.contact_number, c.email_address,
												c.address, j.status, j.technician_percentage
												
											FROM tbl_job_order j
											INNER JOIN tbl_clients c ON c.client_id = j.client_id
											INNER JOIN tbl_technicians t ON t.technician_id = j.technician_id
											WHERE j.archive = ? AND DATE(j.date_received) >= ? AND DATE(j.date_received) <= ?
											ORDER BY date_added");

		$transaction = $statement->execute([$archive, $dateFrom, $dateTo]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function fetchOngoingJobOrders(){

		$archive = 0; // active
		$status = "O";

		$statement = $this->pdo->prepare("SELECT j.job_order_id, j.client_id, j.date_received, j.patient_name, 
												j.technician_id,
												j.total_price, j.date_added, c.client_name, c.contact_number, c.email_address,
												c.address, j.status, j.technician_percentage
												
											FROM tbl_job_order j
											INNER JOIN tbl_clients c ON c.client_id = j.client_id
											WHERE j.archive = ? AND j.status = ?
											ORDER BY date_added DESC");

		$transaction = $statement->execute([$archive, $status]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function archiveJobOrder($userId, $jobOrderId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted
		$rv = array();

		try {

	        $this->pdo->beginTransaction();
			$statement = $this->pdo->prepare("UPDATE tbl_job_order
												SET archive = ?, last_modified = ?, last_modified_by = ?
												WHERE job_order_id = ?");

			$statement->execute([$archive,$currentDate, $userId, $jobOrderId]);

			$statement = $this->pdo->prepare("UPDATE tbl_particulars
												SET archive = ?
												WHERE job_order_id = ?");

			$statement->execute([$archive, $jobOrderId]);

			$this->pdo->commit();

		    $rv["message"] = "SUCCESS";

		 } catch (PDOException $e) {

		       $this->pdo->rollback();
		       $rv["message"] = $e;

		}

			

		return $rv;


	}


	public function fetchParticularsPerJobOrder($jobOrderId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT particular_id as 'id', particular_description as 'description', price, quantity
											FROM tbl_particulars 
											WHERE archive = ? AND job_order_id = ?
											ORDER BY particular_description ASC");

		$transaction = $statement->execute([$archive, $jobOrderId]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function archiveJobOrderHistory($id, $userId){

		
		$currentDate = date("Y-m-d H:i:s");
		$archive = 1; // deleted

		$statement = $this->pdo->prepare("UPDATE tbl_job_order_history
											SET archive = ?, last_modified = ?, last_modified_by = ?
											WHERE id = ?");

		$statement->execute([$archive,$currentDate, $userId, $id]);

		return $statement->rowCount();


	}

	public function fetchJobOrderHistory($jobOrderId){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT id, job_order_id, transaction_type, remarks, date_added
											FROM tbl_job_order_history 
											WHERE archive = ? AND job_order_id = ?
											ORDER BY date_added ASC");

		$transaction = $statement->execute([$archive, $jobOrderId]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}

	public function saveJobOrderHistory($form, $userId, $jobOrderId){

		$transactionType = $form["transactionType"]["value"];
		$remarks = $form["remarks"]["value"];
		$currentDate = date("Y-m-d H:i:s");
		$archive = 0; // active

		$statement = $this->pdo->prepare("INSERT INTO tbl_job_order_history
												(job_order_id, transaction_type, remarks, date_added, 
													last_modified, last_modified_by, archive)
											VALUES (?,?,?,?,?,?,?)");
						
		$statement->execute([$jobOrderId, $transactionType, strtoupper($remarks), $currentDate, $currentDate, $userId,$archive]);

		return $statement->rowCount();


	}

	public function fetchMostSoldProducts(){

		$archive = 0; // active

		$statement = $this->pdo->prepare("SELECT SUM(quantity) AS 'total_sales', particular_description 
											FROM tbl_particulars
											WHERE archive = ?								
											GROUP BY particular_description LIMIT 10");

		$transaction = $statement->execute([$archive]);
		
		return $statement->fetchAll(PDO::FETCH_ASSOC);

	}


		

}

function guidv4($data = null)
{	
	$data = $data ?? random_bytes(16);
	
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function uniqidReal($lenght = 6) {
    // uniqid gives 13 chars, but you could adjust it to your needs.
    if (function_exists("random_bytes")) {
        $bytes = random_bytes(ceil($lenght / 2));
    } elseif (function_exists("openssl_random_pseudo_bytes")) {
        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
    } else {
        throw new Exception("no cryptographically secure random function available");
    }
    return substr(bin2hex($bytes), 0, $lenght);
}