<?php
require_once "includes/config.php"; // The mysql database connection script
                                    // print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );


/* print_r($request->username); */

//$email = $request->username;

@$email =  $request->username;


$sql = "SELECT user_Id,user_Name,password,email_Id,`GROUP` FROM user WHERE email_Id ='" .$email."'";

$result = $mysqli->query ( $sql ) or die ( $mysqli->error . __LINE__ );



if ($result->num_rows > 0) {
	
	$associativeArray = array();
	
	// output data of each row
	while($row = $result->fetch_assoc()) {
	
		/* echo "id: " . $row["email_Id"]. " - Name: " . $row["user_Name"]. " " . $row["password"]. "; */
		
		$associativeArray["userEmail"] = $row["email_Id"];
		$associativeArray["userName"] = $row["user_Name"];
		$associativeArray["passWord"] = $row["password"];
		
		$associativeArray["group"] = $row["GROUP"];
		
		$UserObj [] = $associativeArray;
	}
	echo json_encode($UserObj);
} else {
	echo "0";
}



