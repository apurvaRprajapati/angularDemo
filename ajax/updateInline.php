<?php
require_once "includes/config.php"; // The mysql database connection script
                                    // print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );


@$name = $request->userName;
@$email = $request->userEmail;
@$group = $request->Group;


$query = "UPDATE user SET user_Name='$name',`GROUP`='$group' WHERE email_Id='$email'";

$result = $mysqli->query ( $query ) or die ( $mysqli->error . __LINE__ );

$result = $mysqli->affected_rows;

echo $result;

