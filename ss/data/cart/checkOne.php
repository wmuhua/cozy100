<?php

require_once('../init.php');

@$iid = $_REQUEST['iid'];
@$is_checked = $_REQUEST['is_checked'];

if($iid !=null && $is_checked != null){
	$sql = "update ss_shoppingcart_item set is_checked=$is_checked where iid=$iid";
	mysqli_query($conn,$sql);
}