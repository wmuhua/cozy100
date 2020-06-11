<?php
//data/cart/addCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
if($uid!=null&&$lid!=null&&$count!=null){
	$sql="select * from ss_shoppingcart_item where user_id=$uid and product_id=$lid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	$iid=$row[0];
	if($row==null)
		$sql="insert into ss_shoppingcart_item values (null, $uid, $lid, $count, 0)";
	else
		$sql="update ss_shoppingcart_item set count=count+$count where iid=$iid";
	$result=mysqli_query($conn,$sql);
}