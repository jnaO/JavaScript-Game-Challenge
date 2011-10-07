$(document).ready(function(){

    var game = new GridGame(30);
    game.init();


});

function GridGame (numberOfTiles){



    this.init = function(){
        log('I am GridGame.init()');
        createGrid(numberOfTiles);
        clickTile();

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


    // set eventlistener on grid

    var clickTile = function(){

        var table = document.getElementById("gamePlan");

        table.addEventListener('click', function(e){
            var id = e.target.id;
            log('target id '+id);

            log(e.srcElement.tagName == 'TD');

            if(e.srcElement.tagName == 'TD')calculateTilesToChange(id);

        });


        // Calculate tiles to change
        function calculateTilesToChange(id){
            changeClassOnTile(id);
            var idSplitArray = id.split('_');

            var no0 = parseInt(idSplitArray[0]);
            var no1 = parseInt(idSplitArray[1]);

            if( (no0 - 1) >= 0)               changeClassOnTile((no0 - 1)+'_'+no1);
            if( (no0 + 1) < numberOfTiles)    changeClassOnTile((no0 + 1)+'_'+no1);
            if( (no1 - 1) >= 0)               changeClassOnTile(no0+'_'+(no1 - 1));
            if( (no1 + 1) < numberOfTiles)    changeClassOnTile(no0+'_'+(no1 + 1));


        }


        // Change class on tile
        function changeClassOnTile(id){
            var workingTile = $("#"+id);
            (workingTile.attr('class') == 'greyTile') ? workingTile.attr('class', 'blueTile') : workingTile.attr('class', 'greyTile') ;
        }

//        var myString = "zero one two three four";
//        var mySplitResult = myString.split(" ");
















    }


}



function log(msg){
    if(typeof console != "undefined" && typeof console.log != "undefined"){
        console.log(msg);
    }else{
// do nuthin
    }
}