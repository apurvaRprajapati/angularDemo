<?php
require_once "includes/config.php"; // The mysql database connection script
// print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );
/* $data = json_decode(file_get_contents('php://input'), true);
print_r($data);die; */

/* echo $request->userName ; die; */

@$email = $request->userName;
/* @$password = $request->passWord; */
$sql = "SELECT user_Id,user_Name,password,email_Id FROM user WHERE email_Id = '$email'";
$result = $mysqli->query ($sql);



if ($result->num_rows > 0) {
	$associativeArray = array();

	while($row = $result->fetch_assoc()) {
		  $associativeArray["uname"] = $row["user_Name"];
	  $associativeArray["email"] = $row["email_Id"];
	  $associativeArray["password"] = $row["password"];
	  $associativeArray["uid"] = $row["user_Id"];
	

	  $UserObj [] = $associativeArray;
	}
	
	echo json_encode($UserObj);
}else {
		
	
	echo  '1'; 
}





