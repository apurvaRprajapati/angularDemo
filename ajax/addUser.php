<?php
require_once "includes/config.php"; // The mysql database connection script
                                    // print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );
print_r($request);
@$name = $request->userName;
@$email = $request->userEmail;
@$password = $request->passWord;
@$group = $request->group;
$query = "INSERT INTO user(user_Name,email_Id,password,`GROUP`) VALUES ('$name', '$email', '$password','$group')";

$result = $mysqli->query ( $query ) or die ( $mysqli->error . __LINE__ );

$result = $mysqli->affected_rows;

echo $json_response = json_encode ( $result );