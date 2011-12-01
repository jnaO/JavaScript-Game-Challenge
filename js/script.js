$(document).ready(function(){
	var myShakeEvent = new WKShake();

	myShakeEvent.start();
	myShakeEvent.shakeEventDidOccur = function() {
		location.reload(true);
	}
    var game = new GridGame();

    $("#startGame").click(function(){
	    if (localStorage.getItem('invisible') === "0") {
		    $(".top").addClass('invisible');
		    localStorage.setItem('invisible', 1);
	    }
	    
	    var ttt = parseInt($("#gridSize").val());

	    if(ttt === ttt) {
	        game.init();
	    }
    });
    
	$("#restart").click(function(){
		game.restart();
    });
    
    $(".top").click(function(){
	    $(".top").addClass('invisible');
	    localStorage.setItem('invisible', 1)
    });
    $(".info").click(function(){
	    var t = parseInt(localStorage.getItem('invisible')) || 0;
	    (t === 0) ? $(".top").addClass('invisible') : $(".top").removeClass('invisible');
		t = (t === 0) ? 1 : 0;
		localStorage.setItem('invisible', t);
	    log('info :: ' + t);
    });
    if (localStorage.getItem('invisible') === "1") {
	    $(".top").addClass('invisible');
    }
    
    if (window.navigator.standalone) {
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

function GridGame (){







/** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/
/** === * === * === * === * === |                                                           | === * === * === * === * === **/
/** === * === * === * === * === |                            Grid                           | === * === * === * === * === **/
/** === * === * === * === * === |                                                           | === * === * === * === * === **/
/** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/

    /**
     * Grid creates and maintain the actual grid
     *
     * It is responsible of all the tiles, and that happens to the tiles
     *
     **/
    var Grid = {

            /**
             * The grid
             */
/* Grid. */	table:      document.getElementById("gamePlan"),


            /**
             * Creates a grid that is 'tiles.total' by 'tiles.total'
             */
/* Grid. */	create:     function(){

                            log('I am a grid, with '+this.tiles.total+' tiles square');

                            // Set up the grid, first append the row, and then append the cells into
                            // the row. Repeat until done.

                            // Create the rows, append to table
                            for(var i = 0; i < this.tiles.total; i++){
                                var row = $("<tr id='"+i+"' />")
                                $("#gamePlan").append(row);

                                // Create the cells, append to current row
                                for(var ci = 0; ci < this.tiles.total; ci++) { // tiles
                                    var tile = $("<td id='"+i+"_"+ci+"' class='greyTile' />");
                                    $("#"+i).append(tile);
                                }
                            }
                        }, // <- end create


            /**
             * all the tiles and what we do with them
             */
/* Grid. */	tiles:       {

		            /**
		             * Number of tiles on the grid. Is set in GridGame.init()
		             */
/* Grid.tiles. */	total:   0,

                    /**
                     * Calculate tiles to change
                     */
/* Grid.tiles. */	calculateChange:     function (id){

                                            /**
                                             * Split class name into two vars, and parse them into integers
                                             */
                                            var idSplitArray = id.split('_'),
                                                no0 = parseInt(idSplitArray[0]),
                                                no1 = parseInt(idSplitArray[1]);

                                            /**
                                             * Calculate and run changeClassOnTile if the tile exists
                                             */
                                            Grid.tiles.changeTile(id);
                                            if( (no0 - 1) >= 0)               	Grid.tiles.changeTile((no0 - 1)+'_'+no1);
                                            if( (no0 + 1) < Grid.tiles.total)   Grid.tiles.changeTile((no0 + 1)+'_'+no1);
                                            if( (no1 - 1) >= 0)               	Grid.tiles.changeTile(no0+'_'+(no1 - 1));
                                            if( (no1 + 1) < Grid.tiles.total)   Grid.tiles.changeTile(no0+'_'+(no1 + 1));
                                            
                                            Grid.tiles.tilesTurned();
                                            

                                        }, // <- end Grid.tiles.calculateChange(id)


                    /**
                     * Change class on a single tile
                     * @param id String
                     *      The id of the element on wich to change class
                     */
/* Grid.tiles. */	changeTile:         function(id){

                                            var workingTile = $("#"+id);

                                            if (workingTile.attr('class') === 'greyTile') {
                                                workingTile.attr('class', 'blueTile');
                                            } else {
                                                workingTile.attr('class', 'greyTile');
                                            }
                                        }, // <- end changeTile()


										/**
						                 * Set up an eventlistener on the game grid, if one is not already dispatched
						                 */
/* Grid.tiles. */	clickListener:      function(){

                                            if(!Grid.tiles.listenerIsSet){
                                                Grid.tiles.listenerIsSet = true;
                                                Grid.table.addEventListener('click', function(e){
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

                                                        }
                                                    }

                                                    if(clickTag == 'TD') Grid.tiles.calculateChange(id);
                                                    Progress.update();
                                                }); // <- end table.addEventListener('click')
                                            } // <- end if(!Grid.tiles.listenerIsSet){}

                                        }, // <- end clickListener()


                    /**
                     * Boolean to determine if the eventlistener has been set already. Used by clickListener.
                     */
/* Grid.tiles. */	listenerIsSet:      false,



					/**
					 * should really be just to count items in tilesTurned
					 */
/* Grid.tiles. */	count:              function(){
                                            var numberOfTilesTurned = Grid.tiles.tilesTurned();
                                            
                                            if(numberOfTilesTurned === Progress.max) {
	                                            Game.done();
                                            }
                                            
                                            return numberOfTilesTurned;
                                        }, // <- end Grid.tiles.count()

/* Grid.tiles. */	tilesTurned:		function(){
											
											var blueTileArray = [],
                                            	blueTiles
											
                                            blueTiles = $(".blueTile");
                                            
                                            for(var i = 0; i < blueTiles.length; i++) {
	                                            blueTileArray.push($(blueTiles[i]).attr('id'));
                                            }
                                            localStorage.setItem('blueTiles', blueTileArray);
                                            return localStorage.getItem('blueTiles').split(',').length;
										}


                } // <- end Grid.tiles



        }, // <- end grid{}






/** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/
/** === * === * === * === * === |                                                           | === * === * === * === * === **/
/** === * === * === * === * === |                          Progress                         | === * === * === * === * === **/
/** === * === * === * === * === |                                                           | === * === * === * === * === **/
/** === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === * === **/

        Progress = {

/* Progress. */	max:	0,

/* Progress. */	cleared:	0,

/* Progress. */	width:	30,
            
/* Progress. */	clicks:	(!!parseInt(localStorage.getItem('currentGameClicks'), 10)) ? parseInt(localStorage.getItem('currentGameClicks'), 10): 0, 

/* Progress. */	bar:	undefined,

						/**
						 * Creates a progressbar
						 */
/* Progress. */	create:	function(){
							localStorage.setItem('currentGameClicks', 0);
							Progress.clicks = 0;
                            Progress.max = Grid.tiles.total * Grid.tiles.total;
                            Progress.width = $("#gamePlan").width();
                            Progress.bar = $("<canvas id='progressBar' width='" + Progress.width + "' height='5' />")
                            $('article').append(Progress.bar);
                        }, //<- end grid.progress.create();

						/**
						 * Updates the progressbar to match current tile count
						 */
/* Progress. */	update:	function(){

                            Progress.cleared = Grid.tiles.count();

                            if(Progress.bar){
                                var ctx = document.getElementById('progressBar').getContext("2d"),

                                fWidth = (Progress.cleared / Progress.max) * (Progress.width);

                                /**
                                 * Clear canvas before painting
                                 */
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

		/**
		 * Game creates and destroys the game, indicate if a game is in progress and so on 
		 */
		Game		= {

            /**
             * Removes all tiles inside the game, as well as the progressbar.
             */
/* Game. */	destroy:    function(){
	            			if(Game.inProgress){
		            			log('destroy game');
	                            $("#gamePlan").empty();
	                            $("#progressBar").remove();
					            localStorage.setItem('inProgress', 'false');
	                        }
                        },


			/**
			 * Indicates if a game is in progress
			 */
/* Game. */	inProgress:	(localStorage.getItem('inProgress') === "true"),
            
            /**
             * Start creates all elements nedded to play a new game
             */
/* Game. */	create:		function(){
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
            },
            
            /**
             * Gets all the nessesary data out of localStorage, and set up game according to named data
             */
/* Game. */	resume:		function(){
							
						},

            /**
             * Gets all the nessesary data out of localStorage, and set up game according to named data
             */
/* Game. */	restart:		function(){
								$(".blueTile").addClass('greyTile');
								$(".blueTile").removeClass('blueTile');
							},

/* Game. */	done:		function(){
							setTimeout(function(){
								var cng = confirm('Hoooraaayyy! \\o/\nDo you want to play a new game');
								if(cng){
									Game.create();
									
								}
							}, 200)
						}						
        }; // <- end Game{}




    /**
     * Start the game, set up grid
     */
    this.init = function(){

        log('I am GridGame.init()');
		Game.create();


    };// <- end init()

	this.restart = function() {
		Game.restart();
	}


}



function log(msg){
    if(typeof console !== "undefined" && typeof console.log !== "undefined"){
        console.log(msg);
    }else{
        // do nuthin
    }
}