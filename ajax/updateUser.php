<?php
require_once "includes/config.php"; // The mysql database connection script
                                    // print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );


@$name = $request->userName;
@$email = $request->userEmail;
@$password = $request->passWord;
@$group = $request->group;

$query = "UPDATE user SET user_Name='$name',password ='$password',`GROUP`= '$group' WHERE email_Id='$email'";

$result = $mysqli->query ( $query ) or die ( $mysqli->error . __LINE__ );

$result = $mysqli->affected_rows;

echo $result;

/* if (mysqli_query($conn, $sql)) {
	echo "Record updated successfully";
} else {
	echo "Error updating record: " . mysqli_error($conn);
} */