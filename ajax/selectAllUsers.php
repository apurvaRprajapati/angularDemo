
<?php
require_once "includes/config.php"; // The mysql database connection script

$sql = "SELECT user_Id,user_Name,`GROUP`,password,email_Id FROM user";

/* $sql = "SELECT * FROM user"; */

$result = $mysqli->query ($sql);



if ($result->num_rows > 0) {
	$associativeArray = array();

	while($row = $result->fetch_assoc()) {
		$associativeArray["uname"] = $row["user_Name"];
		$associativeArray["email"] = $row["email_Id"];
		$associativeArray["password"] = $row["password"];
		$associativeArray["uid"] = $row["user_Id"];
		$associativeArray["group"] = $row['GROUP'];


		$UserObj [] = $associativeArray;
	}

	echo json_encode($UserObj);
}else {


	echo  'error';
}





