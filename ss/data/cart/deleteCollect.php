<?php

require_once('../init.php');

@$pid = $_REQUEST['pid'] or die('{"code":401,"msg":"iid required"}');
session_start();
@$uid = $_SESSION['uid'];

$sql = "delete from ss_mycollect_item where user_id=$uid and product_id=$pid";
$result = mysqli_query($conn, $sql);

if($result){
  echo '{"code":200, "msg":"delete succ"}';
}else {
  echo '{"code":500, "msg":"delete err"}';
}