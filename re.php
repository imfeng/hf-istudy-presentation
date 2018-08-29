<?php 

$db_host = 'localhost';
$db_user = 'ist';
$db_pwd = 'istt';
$db = 'ist';

// Find their IP and tell them what it is.
// Liberated from a google result.
if (getenv('HTTP_X_FORWARDED_FOR')) {
  $pip = getenv('HTTP_X_FORWARDED_FOR');
  $ip = getenv('REMOTE_ADDR');
  //echo "Your Proxy IP is: ".$pip."(via ".$ip.")";
} else {
  $ip = getenv('REMOTE_ADDR');
  //echo "Your IP is: ".$ip;
}
//echo "<br /><br />";

// Try to connect to mysql.
if(!$the_con = mysql_connect($db_host, $db_user, $db_pwd)) {
//  die("why u no connect to mysql? ".mysql_error());
  //die("why u no connect to mysql? ");
}

// Try to select the database.
if(!mysql_select_db($db)) {
 die("why u no use db? ".mysql_error());
  //die("why u no use db?");
}

// Try to perform query.
// This is a function so it may easily be called multiple times.
function do_query($query) { // Take in query.
  if(!$result = mysql_query($query)) {
  die("why u no query? ".mysql_error());
    //die("why u no query?");
  }
  return $result; // Give back result.
}

  do_query("set names 'utf8'");  
  do_query("insert into ips (ip,frompage) values ('".$ip."','re.php')");



 ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>i 世代讀書會</title>
	<link rel="stylesheet" href="">
</head>
<body>
<p>處理中，稍待片刻～～</p>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85229009-1', 'auto');
  ga('send', 'pageview');

setTimeout(function(){ window.location = "http://istudy.hwiic.com"; }, 1500);

</script>	
</body>
</html>

<?php

// $newURL = "https://docs.google.com/forms/d/e/1FAIpQLSdr_d4Y9j7DGQsmqjq8vix9836FuDPqcLQLSaXZYa5C-A0uUw/viewform?c=0&w=1";

// $newURL = "https://goo.gl/ZUa9Zc";

// header('Location: '.$newURL);

?>
