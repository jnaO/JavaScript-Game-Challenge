<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="iPlayMusic"/>
        <meta name="keywords" content="HTML5, JavaScript, PHP, Music Player" />
        <meta name="author" content="jnaO" />

        <title>gridGame</title>
        
        <link rel="apple-touch-startup-image" href="img/app/splash.jpg" />
        <link rel="apple-touch-icon" href="img/app/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="img/app/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="img/app/touch-icon-iphone4.jpg" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <link href='//fonts.googleapis.com/css?family=Josefin+Sans:400,600,700|Josefin+Slab:700&amp;v2' rel='stylesheet' type='text/css' />
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>

        <script type="text/javascript" src="js/WKShake.js"></script>
        <script type="text/javascript" src="js/tools.js"></script>
        <script type="text/javascript" src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css?1" media="screen" />


    </head>
    <body>
    <nav>
    	<ul id='main_menu' class="clearfix">
    		<li id="restart" class="shadow">&#42;</li>
    		<li><input id="gridSize" type="number" placeholder="#" /></li>
    		<li id="startGame" class="shadow">&#81;</li>
    		<li id="donate" class="shadow">&#35;</li>
    		<li id="fullscreen" class="shadow">&#38;</li>
    	</ul>
    	<span>&nbsp;</span>
    </nav>

        <header class="top wrapper">
            <pre class="logo">
                     _____)
            ,   /) /
   _   __     _(/ /   ___   _  ___    _
  (_/_/ (__(_(_(_/     / ) (_(_// (__(/_
 .-/            (____ /
(_/

            </pre>


            <p class="center desc">
                A small game of turning tiles.<br />
                <br />
                The tiles have two states, solid white and semitransparent.<br 7>
                When you click one tile in the grid the clicked tile, as well as the
                tile directly above, beneath and to either side of the tile clicked
                will change color.<br />
                Turn all tiles of the grid from grey to blue to complete the game.
            </p>
        </header>
        <article class="bottom wrapper">
            <table id="gamePlan">

            </table>

        </article>
    </body>
</html>
