<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="description" content="iPlayMusic"/>
        <meta name="keywords" content="HTML5, JavaScript, PHP, Music Player" />
        <meta name="author" content="jnaO" />

        <title>gridGame</title>
        <link href='//fonts.googleapis.com/css?family=Josefin+Sans:400,600,700|Josefin+Slab:700&amp;v2' rel='stylesheet' type='text/css' />
        <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>

        <script type="text/javascript" src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css" media="screen" />


    </head>
    <body>
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
                <a href="//github.com/jnaO/JavaScript-Game-Challenge" target="_blank">
                    github.com/jnaO/JavaScript-Game-Challenge</a><br />
                <br />
                The tiles have two states, solid white and semitransparent.<br 7>
                When you click one tile in the grid the clicked tile, as well as the
                tile directly above, beneath and to either side of the tile clicked
                will change color.<br />
                Turn all tiles of the grid from grey to blue to complete the game.
            </p>
        </header>
        <article class="bottom wrapper">
            <input type="number" id="gridSize" /><button id="startGame">start game</button>
            <table id="gamePlan">

            </table>

        </article>
    </body>
</html>
