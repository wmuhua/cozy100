<?php

require_once('../init.php');
@$lid = $_REQUEST['lid'];
$output = [
	'product'=>[],
	'pics'=>[],//图片
	'specs'=>[]//规格
];
if($lid != null){
	$sql = "SELECT * FROM `ss_laptop` where lid=$lid";
	$result = mysqli_query($conn,$sql);
	$output['product'] = mysqli_fetch_all($result,1)[0];

	$sql = "SELECT * FROM `ss_laptop_pic` where laptop_id=$lid";
	$result = mysqli_query($conn,$sql);
	$output['pics'] = mysqli_fetch_all($result,1);
	
	$fid=$output['product']['family_id'];
	$sql = "SELECT lid,area FROM `ss_laptop` where family_id=$fid";
	$result = mysqli_query($conn,$sql);
	$output['specs'] = mysqli_fetch_all($result,1);

}
echo json_encode($output);

//$_REQUEST[''];