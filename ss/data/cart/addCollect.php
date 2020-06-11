<?php
//data/cart/addCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"] or die('{"code":300, "msg":"login required"}');
@$lid=$_REQUEST["lid"] or die('{"code":401,"msg":"lid required"}');
$sql="select * from ss_mycollect_item where user_id=$uid and product_id=$lid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
$iid=$row[0];
if($row==null){
	$sql="insert into ss_mycollect_item values (null, $uid, $lid, 1, 0)";
	$result=mysqli_query($conn,$sql);
  	echo '{"code":200, "msg":"add succ"}';
}else{
	$sql="delete from ss_mycollect_item where mid=$iid";
	$result=mysqli_query($conn,$sql);
  	echo '{"code":201, "msg":"add err"}';
}