
<html>
  <head>
    <title>Your IP!</title>

    <script src="bower_components/ua-parser-js/dist/ua-parser.min.js"></script>
        <script>
    var x = document.referrer;
    console.log('REFERRER');
    console.log(x);

    console.log(document.URL);
    console.log('document.URL:');
console.log(window.location.href);
console.log('window.location.href:');
console.log(document.location.href);
console.log('document.location.href:');
console.log(window.location.pathname);
console.log('window.location.pathname:');
    
    var parser = new UAParser();
    parser.setUA(navigator.userAgent);
    var result = parser.getResult();
    // this will also produce the same result (without instantiation):
    // var result = UAParser(uastring);

    console.log(result.browser);        // {name: "Chromium", version: "15.0.874.106"}
    console.log(result.device);         // {model: undefined, type: undefined, vendor: undefined}
    console.log(result.os);             // {name: "Ubuntu", version: "11.10"}
    //console.log(result.os.version);     // "11.10"
    //console.log(result.engine.name);    // "WebKit"
    //console.log(result.cpu.architecture);   // "amd64"
  
    </script>
  </head>
  <body>
<?php

// All you need for mysql:
//
// create database <DATABASE>;
// use <DATABASE>;
// create table ips(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ip VARCHAR(15), timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
// grant all on <DATABASE> to user '<USERNAME>'@'localhost' identified by '<PASSWORD>';

$db_host = 'localhost';
$db_user = 'ist';
$db_pwd = 'istt';
$db = 'ist';

// Find their IP and tell them what it is.
// Liberated from a google result.
if (getenv('HTTP_X_FORWARDED_FOR')) {
  $pip = getenv('HTTP_X_FORWARDED_FOR');
  $ip = getenv('REMOTE_ADDR');
  echo "Your Proxy IP is: ".$pip."(via ".$ip.")";
} else {
  $ip = getenv('REMOTE_ADDR');
  echo "Your IP is: ".$ip;
}
echo "<br /><br />";

// Try to connect to mysql.
if(!$the_con = mysql_connect($db_host, $db_user, $db_pwd)) {
//  die("why u no connect to mysql? ".mysql_error());
  die("why u no connect to mysql? ");
}

// Try to select the database.
if(!mysql_select_db($db)) {
//  die("why u no use db? ".mysql_error());
  die("why u no use db?");
}

// Try to perform query.
// This is a function so it may easily be called multiple times.
function do_query($query) { // Take in query.
  if(!$result = mysql_query($query)) {
//    die("why u no query? ".mysql_error());
    die("why u no query?");
  }
  return $result; // Give back result.
}

// Try to see if they are in the database already,
// and if not, then add them.
/*
$result = do_query("select ip from ips where ip='".$ip."'");
$rows = mysql_num_rows($result);
if($rows == 0) {
  do_query("insert into ips (ip) values ('".$ip."')");
}else{

}*/
//do_query("insert into ips (ip) values ('".$ip."')");

// Now, display the table.
$result = do_query("select * from ips");
$cols = mysql_num_fields($result);
echo "<table cellpadding=\"5\" bgcolor=\"#7F7F7F\"><tr>";
for($i = 0; $i < $cols; $i++) {
  echo "<td>".mysql_fetch_field($result)->name."</td>";
}
echo "</tr>";
while($row = mysql_fetch_row($result)) {
  echo "<tr>";
  for($i = 0; $i < $cols; $i++) {
    if($row[$i] == $ip) { // bold their IP.
      echo "<td><b>".$row[$i]."</b></td>";
    } else {
      echo "<td>".$row[$i]."</td>";
    }
  }
  echo "</tr>";
}
echo "</table>";

?>
  </body>
</html>