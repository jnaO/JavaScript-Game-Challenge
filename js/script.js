$(document).ready(function(){
    var game = new GridGame(25);
    game.init();
});




function GridGame (numberOfTiles){

    // Start the game, set up grid
    this.init = function(){
        log('I am GridGame.init()');
        createGrid(numberOfTiles);
        listenForClickOnTile();

    };

    // create grid(numberOfTiles)
    var createGrid = function(numberOfTiles){

        log('I am a grid, with '+numberOfTiles+' tiles in a square');

        // Set up the grid, first append the row, and then append the cells into
        // the row. Repeat
        for(var i = 1; i < numberOfTiles; i++){ // rows
            var row = $("<tr id='"+i+"' />")
            $("#gamePlan").append(row);



            for(var ci = 0; ci < numberOfTiles; ci++) { // tiles
                var tile = $("<td id='"+i+"_"+ci+"' class='greyTile' />");
                $("#"+i).append(tile);
            }
        }


    };



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

        });


        // Calculate tiles to change
        function calculateTilesToChange(id){

            // split class name into two vars, and parse them into integers
            var idSplitArray = id.split('_');
            var no0 = parseInt(idSplitArray[0]);
            var no1 = parseInt(idSplitArray[1]);

            // Change class on the five tiles
            changeClassOnTile(id);
            if( (no0 - 1) >= 0)               changeClassOnTile((no0 - 1)+'_'+no1);
            if( (no0 + 1) < numberOfTiles)    changeClassOnTile((no0 + 1)+'_'+no1);
            if( (no1 - 1) >= 0)               changeClassOnTile(no0+'_'+(no1 - 1));
            if( (no1 + 1) < numberOfTiles)    changeClassOnTile(no0+'_'+(no1 + 1));


        }


        // Change class on a single tile
        function changeClassOnTile(id){
            var workingTile = $("#"+id);
            (workingTile.attr('class') == 'greyTile') ? workingTile.attr('class', 'blueTile') : workingTile.attr('class', 'greyTile') ;
        }
    }
}



function log(msg){
    if(typeof console != "undefined" && typeof console.log != "undefined"){
        console.log(msg);
    }else{
        // do nuthin
    }
}