<html>
  <head>
    <title>Something special</title>
    <style type='text/css'>
      *{
        margin: 0px;
        padding: 0px;
      }

      body {
        background: white;
        color: #0f0;  
      }
      
      div {
      }

      canvas {
        display:block;
      }
      #canvas {
        border: solid 1px red;
        float: left; 
        width:80%;
        height:80%;
      }
      #buttons {
        border: solid 1px green;
        float:left;
        width: 19%;
        height: 80%;
      }
      #result {
        border: solid 1px blue;
        color: black;
        float:left;
        width: 99%;
        height: 19%;
      }
    </style>
    <script type="text/javascript" src="script.js"></script> 
    <script type="text/javascript" src="jquery.js"></script> 
  </head>
<body>
  <div id='buttons'>
    <input id='something' type='button' value='Increase size'/>
  </div>

  <div id='canvas'>
    <canvas id='c'></canvas>
  </div>

  <div id='result'>
  </div>
</body>
</html>
