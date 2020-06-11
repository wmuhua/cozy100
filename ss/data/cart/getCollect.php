<?php
//data/cart/getCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"] or die('{"code":300, "msg":"login required"}');
$sql="select *, (select md from ss_laptop_pic where laptop_id=lid limit 1) as md from ss_mycollect_item inner join ss_laptop on product_id=lid where user_id=$uid";
$result=mysqli_query($conn,$sql);
$all=mysqli_fetch_all($result,1);

// var_dump($all);
echo json_encode($all);

