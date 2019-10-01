<?php
    session_start();
    Header("content-type: text/plain");
    
    // get cookies ID
    $x = explode("=", $_SERVER['HTTP_COOKIE']);
    
    $remoteIP = $_SERVER["REMOTE_ADDR"];
    $_SESSION['bots'][$x[1]]["id"] = $x[1];
    $_SESSION['bots'][$x[1]]["ip"] = 1;
    
?>