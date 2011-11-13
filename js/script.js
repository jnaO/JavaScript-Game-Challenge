$(document).ready(function(){
    var game = new GridGame();

    $("#startGame").click(function(){
        log($("#gridSize").val());
        game.init();
    });

});




/*============================================================================*/
/*============================================================================*/
/*===============================|          |=================================*/
/*===============================| GridGame |=================================*/
/*===============================|          |=================================*/
/*============================================================================*/
/*============================================================================*/

function GridGame (){


    /**
     * Grid creates and maintain the actual grid
     *
     * It is responsible of all the tiles, and that happens to the tiles
     *
     **/
    var Grid = {

            // Number of tiles on the grid. Is set in GridGame.init()
            numTiles:   12,


            table:      document.getElementById("gamePlan"),


            // Creates a grid that is 'numTiles' by 'numTiles'
            create:     function(){

                            log('I am a grid, with '+this.numTiles+' tiles square');

                            // Set up the grid, first append the row, and then append the cells into
                            // the row. Repeat until done.

                            // Create the rows, append to table
                            for(var i = 0; i < this.numTiles; i++){
                                var row = $("<tr id='"+i+"' />")
                                $("#gamePlan").append(row);

                                // Create the cells, append to current row
                                for(var ci = 0; ci < this.numTiles; ci++) { // tiles
                                    var tile = $("<td id='"+i+"_"+ci+"' class='greyTile' />");
                                    $("#"+i).append(tile);
                                }
                            }
                        }, // <- end create


            // Removes all tiles inside the game. Called in GridGame.init
            // TODO Find a way to remove eventlistener och destroy
            destroy:    function(){
                            $("#gamePlan").empty();
                            Grid.table.removeEventListener('click');
                        },


            //
            tiles:       {
                    // Calculate tiles to change
                    calculateChange:     function (id){

                                            // Split class name into two vars, and parse them into integers
                                            var idSplitArray = id.split('_'),
                                                no0 = parseInt(idSplitArray[0]),
                                                no1 = parseInt(idSplitArray[1]);

                                            // Calculate and run changeClassOnTile if the tile exists
                                            Grid.tiles.changeTile(id);
                                            if( (no0 - 1) >= 0)               Grid.tiles.changeTile((no0 - 1)+'_'+no1);
                                            if( (no0 + 1) < Grid.numTiles)    Grid.tiles.changeTile((no0 + 1)+'_'+no1);
                                            if( (no1 - 1) >= 0)               Grid.tiles.changeTile(no0+'_'+(no1 - 1));
                                            if( (no1 + 1) < Grid.numTiles)    Grid.tiles.changeTile(no0+'_'+(no1 + 1));
//                                            countTiles();

                                        }, // <- end Grid.tiles.calculateChange(id)
                    /**
                     * Change class on a single tile
                     * @param id String
                     *      The id of the element on wich to change class
                     */
                    changeTile:         function(id){
                                            log(id)
                                            var workingTile = $("#"+id);

                                            if (workingTile.attr('class') === 'greyTile') {
                                                log('true' + workingTile.attr('class'));
                                                workingTile.attr('class', 'blueTile');
                                            } else {
                                                log('false' + workingTile.attr('class'));
                                                workingTile.attr('class', 'greyTile');
                                            }
                                        },
                    clickListener:      function(){



                                            Grid.table.addEventListener('click', function(e){
                                                log(':::::::: clicked ::::::::::');
                                                var id = e.target.id;
                                                log('target id '+id);

                                                // just to make sure I'm not changing/setting a class on an element
                                                // didn't intend to, I.E. if, it's not a table cell, don't do nothing
                                                //
                                                // firefox compatability
                                                var clickTag = '';
                                                try {
                                                    clickTag = e.srcElement.tagName;
                                                } catch(er) {
                                                    try{
                                                        log(e);
                                                        clickTag = e.explicitOriginalTarget.nodeName;
                                                    } catch (er) {

                                                    }
                                                }
                                                log(e)
                                                log('clickTag ' + clickTag);
                                                if(clickTag == 'TD') Grid.tiles.calculateChange(id);

                                            }); // <- end table.addEventListener('click')

                                        }
                } // <- end Grid.tiles



        }, // <- end grid{}






        /**
         * Progress
         **/
        Progress = {
            create:     function(){

                            var tot = Grid.numTiles * Grid.numTiles;
                            Progress.bar = $("<progress value='0' max='" + tot + "' />")
                            $('article').prepend(Progress.bar);
                        }, //<- end grid.progress.create
            update:     function(){
                        }
        },




    // When we click on a tile, that tile, the tile above, below and to either
    // side of the tile we clicked are supposed to change color
        listenForClickOnTile = function(){
            log('I am listenForClickOnTile');

            // Set one eventlistener to find out if we clicked inside the grid, and
            // if so, on what element






        /**
         * Change class on a single tile
         * @param id String
         *      The id of the element on wich to change class
         */
        function changeClassOnTile(id){
            var workingTile = $("#"+id);
            (workingTile.attr('class') == 'greyTile') ? workingTile.attr('class', 'blueTile') : workingTile.attr('class', 'greyTile') ;
        }

        function countTiles() {
            var nodeType = document.getElementsByTagName('td');
            var greyNum = 0;
            var blueNum = 0;
            for(var tilesI = 0; tilesI < nodeType.length; tilesI++){
                ( nodeType[tilesI].getAttribute('class') == 'greyTile' ) ? greyNum++ : blueNum++ ;
            }
            log('I am countTiles, here\'s what I have to say about life:');
            log('bluenum: '+blueNum+'  greynum: '+greyNum);

            return greyNum;
        }
    }; // <- end listenForClickOnTile()


    // Start the game, set up grid
    this.init = function(){

        log('I am GridGame.init()');

        Grid.numTiles = parseInt($("#gridSize").val(), 10);
        Grid.destroy();
        Grid.create();
        Grid.tiles.clickListener();

        listenForClickOnTile();

    };// <- end init()




}



function log(msg){
    if(typeof console !== "undefined" && typeof console.log !== "undefined"){
        console.log(msg);
    }else{
        // do nuthin
    }
}