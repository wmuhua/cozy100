<?php
//header("Content-Type:applicaton/json");
//data/1_menu.php
require_once("../init.php");
@$kw=$_REQUEST["kw"];
$products=[];
if($kw!=null){
	//$sql="select title as label from xz_laptop ";
	$sql="select lid, title, sold_count from ss_laptop ";
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%".$kws[$i]."%' ";
	}
	$where=" where ".implode(" and ",$kws);
	$sql.=$where;
	$sql.=" order by sold_count desc limit 10 ";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
}
echo json_encode($products);