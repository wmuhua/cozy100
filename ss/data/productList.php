<?php

require_once('init.php');

@$pno = $_REQUEST['pno'];
if(!$pno){
	$pno =1;
}
@$pageSize = $_REQUEST['pageSize'];
if(!$pageSize){
	$pageSize = 8;
}

// echo $pno."|".$pageSize;

$reg = '/^[0-9]{1,}$/';

$rs = preg_match($reg,$pno);
if(!$rs){
	die('{"code":-1,"msg":"页码格式不正确"}');
}

$rs = preg_match($reg,$pageSize);
if(!$rs){
	die('{"code":-1,"msg":"页大小格式不正确"}');
}

$sql = "SELECT count(lid) as c FROM xz_laptop";

$rs = mysqli_query($conn,$sql);

if(mysqli_error($conn)){//错误提示
	echo mysqli_error($conn);
}

$row = mysqli_fetch_row($rs);

$pageCount = ceil($row[0]/$pageSize);

$offset = ($pno-1)*$pageSize;

$sql = " SELECT lid,lname,price,title FROM xz_laptop";

$sql .= " LIMIT $offset,$pageSize";

$rs = mysqli_query($conn,$sql);

$rows = mysqli_fetch_all($rs,MYSQLI_ASSOC);

$output = ['pno'=>$pno,'pageSize'=>$pageSize,'pageCount'=>$pageCount,'data'=>$rows];

echo json_encode($output);

// var_dump($rows);

// echo $pageCount;


// $sql = "select user_laptop limt $pageSize,$aaa";

// $sql = "SELECT * FROM xz_user limit $s,$pageSize";

// $result = mysqli_query($con,$sql);

// $arr = mysqli_fetch_all($result,1);//显示的条数

// $sql = "SELECT COUNT(*) FROM xz_user";//查询总条数

// $result = mysqli_query($con,$sql);//执行语句

// $str = mysqli_fetch_row($result);//返回的总条数是一个数组形式，一条数据

// $total = $str[0];//得到用户总条数

// $totals = ceil($total/$pageSize);//得到总页数  ceil向上取整

// $output = ['totals'=>$totals,'array'=>$arr];//两个返回值拼成关联数组  页数和显示的条数

// echo json_encode($output);//响应给前端

// if($result == false){
// 	echo "请检查语法：$sql";
// }


//sclect * from emp where deptid=10 order by limit start,count;
