/*
Copyright 2021 Derrick Lor
Umass Lowell Computer Science
Email: derrick_lor@student.uml.edu
GUI Programming I
Date: 12/16/2021
Assignment: Homework 5 Scrabble
Sources: w3schools jquery youtube stackoverflow https://jqueryui.com
	used websites created by Yong Cho and Jason Downing to build templates
*/

//tried to use JSON, but could not get the XMLHttpRequest to load JSON

/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely 
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

var default_tiles = ["A", "A", "A", "A", "A", "A", "A", "A", "A",
  "B", "B", "C", "C", "D", "D", "D", "D", "E",
  "E", "E", "E", "E", "E", "E", "E", "E", "E",
  "E", "E", "F", "F", "G", "G", "G", "H", "H",
  "I", "I", "I", "I", "I", "I", "I", "I", "I",
  "J", "K", "L", "L", "L", "L", "M", "M", "N",
  "N", "N", "N", "N", "N", "O", "O", "O", "O",
  "O", "O", "O", "O", "P", "P", "Q", "R", "R",
  "R", "R", "R", "R", "S", "S", "S", "S", "T",
  "T", "T", "T", "T", "T", "U", "U", "U", "U",
  "V", "V", "W", "W", "X", "Y", "Y", "Z", "_",
  "_"
];
var tiles = [...default_tiles]
var missingSlots = [];
var gameScore = 0;
var wordScore = 0;

$(document).ready(function() {

  //init slots on the board to be droppable
  $(function() {
    for (var i = 1; i < 8; i++) {
      $("#slot" + i).droppable(dropOptions);

      let index = Math.floor((Math.random() * tiles.length) % tiles.length);
      let alphaLetter = tiles[index];
      jQuery('<img/>', {
        id: `tileFromBag${i}`,
        "class": 'tileFromBag ui-draggable',
        letter: alphaLetter,
        points: ScrabbleTiles[alphaLetter].value,
        fromSlot: i
      }).appendTo(`#tile${i}`);

      $(`#tileFromBag${i}`).attr("src", `graphics_data/Scrabble_Tiles//Scrabble_Tile_${alphaLetter}.jpg`);
      tiles.splice(index, 1);

      $(`#tileFromBag${i}`).draggable();
      $(`#tileFromBag${i}`).hover(function() {
        $(this).css('cursor', 'pointer');
      });
      $(`#tileFromBag${i}`).draggable({
        scroll: false
      });
      $(`#tileFromBag${i}`).draggable({
        revert: true
      });
    }
  });


}); //end ready

var droppedItem;
var droppedOnItem;
var droppedItem_Id;
var droppedOnItem_Id;
var dropOptions = {
  drop: function(ev, ui) {
    droppedItem = ui.draggable;
    droppedOnItem = $(this);
    $(droppedItem).detach().css({
      top: 0,
      left: 0
    }).appendTo(droppedOnItem);
    droppedItem.position({
      of: droppedOnItem
    });

    droppedOnItem_Id = droppedOnItem[0].id;

    $(`#${droppedOnItem_Id}`).droppable({
      accept: ".tileFromBag"
    });

    /* keeps track of word points */
    var wordPoints = parseInt(droppedItem[0].attributes.points.nodeValue);

    /* keeps track of letter points */
    var letterPoints = parseInt(droppedItem[0].attributes.points.nodeValue);

    var origin = parseInt(droppedItem[0].attributes.fromSlot.nodeValue);

    droppedItem_Id = droppedItem[0].id;

    $(`#${droppedItem_Id}`).draggable("disable"); //disables draggable after dropping

    missingSlots.push(origin); //tile slot that needs to be repopulated

    var slot_number = parseInt(droppedOnItem[0].attributes.col.nodeValue);

    //give bonus points if landed on slots 2 or 6
    if (slot_number == 2) {
      letterPoints *= 2;
    }
    if (slot_number == 6) {
      wordPoints *= 2;
    }

    /* adds letter and word points */
    gameScore += letterPoints;
    wordScore += wordPoints;

    $(`#${droppedOnItem_Id}`).droppable("option", "accept", ".no_longer_accepts");
  }
}


function nextWord() {

  //clear the slots on the rack
  for (let i = 1; i < 8; i++) {
    $(`#slot${i}`).empty();
  }

  //randomize the given tiles
  var missing = 7 - $("#rackdiv img").length;
  while (tiles.length > 0 && missing > 0) {
    let index = Math.floor((Math.random() * tiles.length) % tiles.length);
    let alphaLetter = tiles[index];

    putOnRack(alphaLetter);

    tiles.splice(index, 1);
    missing--;
  }


  //submit and calculate new scores
  $('#score').text("" + wordScore);
  $('#remainingtiles').text("" + tiles.length);
  $('#total').text("" + gameScore);


  //setup next round
  for (let i = 1; i < 8; i++) {
    $(`#slot${i}`).droppable(dropOptions);
    $(`#slot${i}`).droppable("option", "accept", ".tileFromBag");
  }
}



function putOnRack(alphaLetter) {
  for (let i = 0; i < missingSlots.length; i++) {
    let slot_to_fill = missingSlots[i];
    jQuery('<img/>', {
      id: `tileFromBag${slot_to_fill}`,
      "class": 'tileFromBag ui-draggable',
      letter: alphaLetter,
      points: ScrabbleTiles[alphaLetter].value,
      fromSlot: slot_to_fill
    }).appendTo(`#tile${slot_to_fill}`);
    $(`#tileFromBag${slot_to_fill}`).attr("src", `graphics_data/Scrabble_Tiles/Scrabble_Tile_${alphaLetter}.jpg`);
    missingSlots.splice(i, 1);

    $(`#tileFromBag${slot_to_fill}`).draggable();
    $(`#tileFromBag${slot_to_fill}`).hover(function() {
      $(this).css('cursor', 'pointer');
    });
    $(`#tileFromBag${slot_to_fill}`).draggable({
      scroll: false
    });
    $(`#tileFromBag${slot_to_fill}`).draggable({
      revert: true
    });
  }
}

function restart() {
  //clear the slots on the rack
  for (let i = 1; i < 8; i++) {
    $(`#slot${i}`).empty();
  }
  //empty any remaining tiles
  for (let i = 1; i < 8; i++) {
    $(`#tile${i}`).empty();
  }
  gameScore = 0;
  wordScore = 0;
  tiles = [...default_tiles];


  for (let i = 1; i < 8; i++) {
    $(`#slot${i}`).droppable(dropOptions);
    $(`#slot${i}`).droppable("option", "accept", ".tileFromBag");
  }

  for (let i = 1; i < 8; i++) {
    let index = Math.floor((Math.random() * tiles.length) % tiles.length);
    let alphaLetter = tiles[index];
    jQuery('<img/>', {
      id: `tileFromBag${i}`,
      "class": 'tileFromBag ui-draggable',
      letter: alphaLetter,
      points: ScrabbleTiles[alphaLetter].value,
      fromSlot: i
    }).appendTo(`#tile${i}`);

    $(`#tileFromBag${i}`).attr("src", `graphics_data/Scrabble_Tiles/Scrabble_Tile_${alphaLetter}.jpg`);
    tiles.splice(index, 1);

    $(`#tileFromBag${i}`).draggable();
    $(`#tileFromBag${i}`).hover(function() {
      $(this).css('cursor', 'pointer');
    });
    $(`#tileFromBag${i}`).draggable({
      scroll: false
    });
    $(`#tileFromBag${i}`).draggable({
      revert: true
    });

  }


  $('#score').text("" + wordScore);
  $('#remainingtiles').text("" + tiles.length);
  $('#total').text("" + gameScore);

}
