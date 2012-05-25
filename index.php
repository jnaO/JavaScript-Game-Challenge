<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content="iPlayMusic"/>
		<meta name="keywords" content="HTML5, JavaScript, PHP, Music Player" />
		<meta name="author" content="jnaO" />

		<title>gridGame</title>

		<!-- startup image for web apps - iPad - portrait (768x1004) -->
		<link rel="apple-touch-startup-image" href="img/app/splash-large.jpg" media="screen and (min-device-width: 760px) and (max-device-width: 1024px) and (orientation:portrait)" />

		<!-- startup image for web apps (320x460) -->
		<link rel="apple-touch-startup-image" href="img/app/splash.jpg" media="screen and (max-device-width: 320px)" />
		<!-- startup image for web apps (640x920) -->
		<link rel="apple-touch-startup-image" href="img/app/splash4.jpg" media="(max-device-width: 480px) and not (min-device-pixel-ratio: 2)" />

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
		<link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />


	</head>
	<body>
	<nav>
		<ul id='main_menu' class="clearfix">
			<li><input id="gridSize" type="number" placeholder="#" /></li>
			<li id="startGame" class="shadow">1</li>
			<li id="startGame" class="info">I</li>
			<li id="restart" class="shadow">2</li>
			<!-- li id="donate" class="shadow">&#35;</li>
			<li id="fullscreen" class="shadow">&#38;</li -->
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
				Make all the tiles of the grid transparent to complete the game.<br />
				To start a new game, enter a number between 3 and 10 and press play on tape.<br />
				<br />
				<span id="web_only">This is a game that is available as a webapp for iPhone. So if you are here using an iPhone,
				you can install it by pressing the center button on the navbar at the bottom of your screen and choose "Save to homescreen" or equivalent..<br />
				<br /></span>
				Do notice that this game is in a state of pre-alfa release.<br />
				<a href="mailto:jnao@jnao.me">mail me</a>
			</p>
		</header>
		<article class="bottom wrapper">
			<table id="gamePlan">

			</table>

		</article>
	</body>
</html>
