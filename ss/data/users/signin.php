<?php

require_once('../init.php');

@$uname = $_REQUEST['uname'];
@$upwd = $_REQUEST['upwd'];
if($uname!=null&&$upwd!=null){
	$sql= "select * from ss_user where uname='$uname' and binary upwd='$upwd'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	if($row !=null){
		echo '登录成功';
		session_start();
		$_SESSION['uid']=$row[0];
	}else{
		echo '用户名或密码错误';
	}
}