<html>
<head>
    <title> Manrix.net </title>
    <link href="php.css" rel="stylesheet"/>
    <script src='funcs.js'></script>
    <script>
      if(!document.createElement("canvas").getContext) {
        alert("You dont have canvas on your browser, try different browser like chrome or firefox.");
      }
    </script>
</head>
<body>
    
    <div id="php">
    <a href="."><h2 >Go back</h2></a>
    <?php
        $dirHandler = opendir("js");
        while($entry = readdir($dirHandler) )
        {
            if($entry == "." || $entry == "..") continue;
            echo "<a href='?script=$entry'>". $entry ."</a> | ";
        }
        closedir($dirHandler);
        
    ?>
    </div>
    
    <?php
        $get = @$_GET["script"];
        if(!isset($get) || $get == "") $get = "angles.js";
        
        echo "<script src='js/$get'></script>";
    ?>
    
    <canvas id="c"></canvas>
</body>
</html>