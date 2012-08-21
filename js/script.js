$(document).ready(function(){

  var game = new GridGame();

  // Start game
  $("#startGame").click(function(){
    var ttt = parseInt($("#gridSize").val(), 10);

    if (localStorage.getItem('invisible') === "0") {
      $(".top").addClass('invisible');
      localStorage.setItem('invisible', 1);
    }

    if(ttt === ttt) {
     game.init();
    }
  }); // End start game

  // Restart button
  $("#restart").click(function(){
    game.restart();
  }); // End restart

  // Hide info
  $(".top").click(function(){
    $(".top").addClass('hidden');
    localStorage.setItem('invisible', 1);
    log('top');
  });

  // Toggle info
  $(".info").click(function(){
    var t = parseInt(localStorage.getItem('invisible'), 10) || 0;
    (t === 0) ? $(".top").addClass('hidden') : $(".top").removeClass('hidden');
    t = (t === 0) ? 1 : 0;
    localStorage.setItem('invisible', t);
    log('info :: ' + t);
  });
  // Set in localstorage so user dont need to hide info
  // again, choice is remembered
  if (localStorage.getItem('invisible') === "1") {
    $(".top").addClass('hidden');
  }

  // Standalone mode
  if ( window.navigator.standalone ) {
    // Do stuff in iPhone standalone mode
    $(".top").addClass('standAlone');
    $("#web_only").remove();
  }

});



/*============================================================================*/
/*============================================================================*/
/*===============================|          |=================================*/
/*===============================| GridGame |=================================*/
/*===============================|          |=================================*/
/*============================================================================*/
/*============================================================================*/

function GridGame() {

  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === |                            Grid                           | === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/

  /**
   * Grid creates and maintain the actual grid
   * It is responsible of all the tiles, and all
   * that happens to the tiles
   **/
  var Grid = {

    // The grid
    table: document.getElementById("gamePlan"),


    // Creates a grid that is 'tiles.total' by 'tiles.total'
    create: function() {

      log('I am a grid, with '+this.tiles.total+' tiles square');

      // Set up the grid:
      // 1. Create the row
      // 2. Append the cells into the row.
      // 3. Append the row into the gamePlan
      // Repeat until done.
      for ( var i = 0; i < this.tiles.total; i++ ) {
        var row = $("<tr id='"+i+"' />");

        // Create the cells, append into current row
        for ( var ci = 0; ci < this.tiles.total; ci++ ) { // tiles
          var tile = $("<td id='"+i+"_"+ci+"' class='greyTile' />");
          row.append(tile);
        }
        $("#gamePlan").append(row);
      }
    }, // <- end create


    // All the tiles and what we do with them
    tiles: {

      // Number of tiles on the grid. Is set in GridGame.init()
      total: 0,

      // Calculate tiles to change
      calculateChange: function(id) {

        // Split class name into two vars, and parse them into integers
        var idSplitArray = id.split('_'),
            no0 = parseInt(idSplitArray[0], 10),
            no1 = parseInt(idSplitArray[1], 10);

        // Calculate and run changeClassOnTile if the tile exists
        Grid.tiles.changeTile(id);
        if( (no0 - 1) >= 0)                Grid.tiles.changeTile((no0 - 1)+'_'+no1);
        if( (no0 + 1) < Grid.tiles.total)  Grid.tiles.changeTile((no0 + 1)+'_'+no1);
        if( (no1 - 1) >= 0)                Grid.tiles.changeTile(no0+'_'+(no1 - 1));
        if( (no1 + 1) < Grid.tiles.total)  Grid.tiles.changeTile(no0+'_'+(no1 + 1));

        Grid.tiles.tilesTurned();
      }, // <- end Grid.tiles.calculateChange(id)


      /**
       * Change class on a single tile
       * @param id String
       *      The id of the element on wich to change class
       */
      changeTile: function(id) {

        var workingTile = $("#"+id);

        if (workingTile.attr('class') === 'greyTile') {
          workingTile.attr('class', 'blueTile');
        } else {
          workingTile.attr('class', 'greyTile');
        }
      }, // <- end changeTile()


      // Set up an eventlistener on the game grid, if one is not already dispatched
      clickListener: function() {

        if ( !Grid.tiles.listenerIsSet ) {
          Grid.tiles.listenerIsSet = true;
          Grid.table.addEventListener('click', function(e) {
            log(':::::::: clicked ::::::::::');
            Progress.clicks++;
            log('number of clicks so far: ' + Progress.clicks);
            var id = e.target.id;
            // just to make sure I'm not changing/setting a class on an element
            // didn't intend to, I.E. if, it's not a table cell, don't do nothing
            //
            // firefox compatability
            var clickTag = '';
            try {
              clickTag = e.srcElement.tagName;
            } catch(er) {
              try{
                clickTag = e.explicitOriginalTarget.nodeName;
              } catch (er) {
                // Walter Sobchak: [shouted repeatedly while smashing a car with a crow bar]
                // Walter Sobchak: This is what happens when you fuck a stranger in the ass!
              }
            }

            if ( clickTag == 'TD' ) Grid.tiles.calculateChange(id);
            Progress.update();

          }); // <- end table.addEventListener('click')
        } // <- end if(!Grid.tiles.listenerIsSet){}
      }, // <- end clickListener()


      // Boolean to determine if the eventlistener has been set already. Used by clickListener.
      listenerIsSet: false,


      // Should really be just to count items in tilesTurned
      count: function() {
        var numberOfTilesTurned = Grid.tiles.tilesTurned();

        if(numberOfTilesTurned === Progress.max) {
          Game.done();
        }

        return numberOfTilesTurned;
      }, // <- end Grid.tiles.count()

      tilesTurned: function() {

        var blueTileArray = [],
            blueTiles;

        blueTiles = $(".blueTile");

        for(var i = 0; i < blueTiles.length; i++) {
          blueTileArray.push($(blueTiles[i]).attr('id'));
        }
        localStorage.setItem('blueTiles', blueTileArray);
        return localStorage.getItem('blueTiles').split(',').length;
      }

    } // <- end tiles

  }, // <- end grid{}






  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === |                          Progress                         | === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/

  Progress = {

    max: 0,

    cleared: 0,

    width: 30,

    clicks: (!!parseInt(localStorage.getItem('currentGameClicks'), 10)) ? parseInt(localStorage.getItem('currentGameClicks'), 10): 0,

    bar: undefined,

    // Creates a progressbar
    create: function() {
      localStorage.setItem('currentGameClicks', 0);
      Progress.clicks = 0;
      Progress.max = Grid.tiles.total * Grid.tiles.total;
      Progress.width = $("#gamePlan").width();
      Progress.bar = $("<canvas id='progressBar' width='" + Progress.width + "' height='5' />");
      $('article').append(Progress.bar);
    }, //<- end create();

    // Updates the progressbar to match current tile count
    update: function() {

      Progress.cleared = Grid.tiles.count();

      if ( Progress.bar ) {
        var ctx = document.getElementById('progressBar').getContext("2d"),

        fWidth = (Progress.cleared / Progress.max) * (Progress.width);

        // Clear canvas before painting
        ctx.clearRect(0, 0, Progress.width, 150);
        ctx.fillStyle = "rgb(245,245,245)";

        if (fWidth > 0) {
          ctx.fillRect(0, 0, fWidth, 150);
        }
      }
    } // <- end Progressbar.update()
  }, // <- end Progressbar{}






  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === |                            Game                           | === * === * === * === * === **/
  /** === * === * === * === * === |                                                           | === * === * === * === * === **/
  /** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/

  // Game creates and destroys the game, indicate if a game is in progress and so on
  Game = {

    // Removes all tiles inside the game, as well as the progressbar.
    destroy: function() {
      if(Game.inProgress){
        log('destroy game');
        $("#gamePlan").empty();
        $("#progressBar").remove();
        localStorage.setItem('inProgress', 'false');
      }
    }, // End destroy

    // Indicates if a game is in progress
    inProgress: (localStorage.getItem('inProgress') === "true"),

    // Start creates all elements nedded to play a new game
    create: function() {
      var t;
      Game.destroy();

      if (parseInt($("#gridSize").val(), 10) != $("#gridSize").val()) {
        t = 4;
      } else {
        t = parseInt($("#gridSize").val(), 10);
        if (t > 10 || t < 3) {
          return alert('number of tiles can not be less than 3 * 3, or greater than 10 * 10');
        }

      }
      Grid.tiles.total = t;

      Grid.tiles.clickListener();
      Grid.create();

      Progress.create();

      localStorage.setItem('inProgress', 'true');
      localStorage.setItem('currentGameClicks', 0);
    }, // End create

    // Gets all the nessesary data out of localStorage, and set up game according to named data
    resume: function() {

    }, // End resume

    // Gets all the nessesary data out of localStorage, and set up game according to named data
    restart: function() {
      $(".blueTile").addClass('greyTile');
      $(".blueTile").removeClass('blueTile');
    }, // End restart

    done: function() {
      setTimeout(function(){
        var cng = confirm('Hoooraaayyy! \\o/\nDo you want to play a new game');
        if(cng){
          Game.create();
        }
      }, 200);
    } // End done
  }; // <- end Game{}




  // Start the game, set up grid
  this.init = function(){

    log('I am GridGame.init()');
    Game.create();
  };// <- end init()

  this.restart = function() {
    Game.restart();
  };
} // End GridGame



function log ( msg ) {
  if ( typeof console !== "undefined" && typeof console.log !== "undefined" ) {
    console.log( msg );
  } else {
    // do nuthin
  }
}