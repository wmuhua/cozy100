<?php

require_once('../init.php');

@$iid=$_REQUEST['iid'];
@$count = $_REQUEST['count'];
if($iid !=null && $count !=null){
	if($count>0){//购物车商品数量
		$sql = "update ss_shoppingcart_item set count=$count where iid=$iid";
	}else{//数量为0时  从购物车中删除
		$sql = "delete from ss_shoppingcart_item where iid=$iid";
	}
	$result = mysqli_query($conn,$sql);
}