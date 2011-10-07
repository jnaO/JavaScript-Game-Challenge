$(document).ready(function(){
    var game = new GridGame(25);
    game.init();
});




/*============================================================================*/
/*============================================================================*/
/*===============================|          |=================================*/
/*===============================| GridGame |=================================*/
/*===============================|          |=================================*/
/*============================================================================*/
/*============================================================================*/

function GridGame (numberOfTiles){

    // Start the game, set up grid
    this.init = function(){

        log('I am GridGame.init()');

        createGrid(numberOfTiles);
        listenForClickOnTile();

    };// <- end init()



    /**
     * Creates a grid (table rows and cells) as many cells in as many rows as
     * specified in
     * @param numberOfTiles int
     *
     */
    var createGrid = function(numberOfTiles){

        log('I am a grid, with '+numberOfTiles+' tiles square');

        // Set up the grid, first append the row, and then append the cells into
        // the row. Repeat until done.

        // Create the rows, append to table
        for(var i = 1; i < numberOfTiles; i++){
            var row = $("<tr id='"+i+"' />")
            $("#gamePlan").append(row);


            // Create the cells, append to current row
            for(var ci = 0; ci < numberOfTiles; ci++) { // tiles
                var tile = $("<td id='"+i+"_"+ci+"' class='greyTile' />");
                $("#"+i).append(tile);
            }
        }
    }; // <- end createGrid()



    // When we click on a tile, that tile, the tile above, below and to either
    // side of the tile we clicked are supposed to change color
    var listenForClickOnTile = function(){

        // Set one eventlistener to find out if we clicked inside the grid, and
        // if so, on what element
        var table = document.getElementById("gamePlan");
        table.addEventListener('click', function(e){
            var id = e.target.id;
            log('target id '+id);

            // just to make sure I'm not changing/setting a class on an element
            // didn't intend to, I.E. if, it's not a table cell, don't do shit
            if(e.srcElement.tagName == 'TD') calculateTilesToChange(id);

        }); // <- end table.addEventListener('click')


        // Calculate tiles to change
        function calculateTilesToChange(id){

            // Split class name into two vars, and parse them into integers
            var idSplitArray = id.split('_');
            var no0 = parseInt(idSplitArray[0]);
            var no1 = parseInt(idSplitArray[1]);

            // Calculate and run changeClassOnTile if the tile exists
            changeClassOnTile(id);
            if( (no0 - 1) >= 0)               changeClassOnTile((no0 - 1)+'_'+no1);
            if( (no0 + 1) < numberOfTiles)    changeClassOnTile((no0 + 1)+'_'+no1);
            if( (no1 - 1) >= 0)               changeClassOnTile(no0+'_'+(no1 - 1));
            if( (no1 + 1) < numberOfTiles)    changeClassOnTile(no0+'_'+(no1 + 1));

        } // <- end calculateTilesToChange()


        /**
         * Change class on a single tile
         * @param id String
         *      The id of the element on wich to change class
         */
        function changeClassOnTile(id){
            var workingTile = $("#"+id);
            (workingTile.attr('class') == 'greyTile') ? workingTile.attr('class', 'blueTile') : workingTile.attr('class', 'greyTile') ;
        }
    }; // <- end listenForClickOnTile()
}



function log(msg){
    if(typeof console != "undefined" && typeof console.log != "undefined"){
        console.log(msg);
    }else{
        // do nuthin
    }
}