<?php
require_once "includes/config.php"; // The mysql database connection script
                                    // print_r($_GET ['taskID']);
$postdata = file_get_contents ( "php://input" );
$request = json_decode ( $postdata );


@$userID = $request;

$query = "DELETE FROM user WHERE user_Id='$userID'";

$result = $mysqli->query ( $query ) or die ( $mysqli->error . __LINE__ );

$result = $mysqli->affected_rows;

echo $result;
