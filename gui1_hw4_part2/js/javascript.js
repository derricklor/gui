/*
Copyright 2021 Derrick Lor
Umass Lowell Computer Science
Email: derrick_lor@student.uml.edu
GUI Programming I
Date: 11/4/2021
Assignment: Homework 4 jQuery validation
Sources: w3schools jqueryvalidation youtube stackoverflow
*/

var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
    tabCounter = 1;

$(document).ready(function(){

    // jQuery methods go here...
    // jquery selectors use the same syntax as css selectors
    // $(selector).action()
  
    //can also do (button).on("click",function(){})
    

    //focus in and out on the input boxes
    $("input").focus(function(){
        $(this).css("background-color", "#e7e7e7");
    });
    $("input").blur(function(){
        $(this).css("background-color", "white");
    });

    $("#form").validate({
            rules:{
                rowmin: {
                    required: true,
                    number: true,
                    range: [-50, 50]
                },
                rowmax: {
                    required: true,
                    number: true,
                    range: [-50, 50]
                },
                colmin: {
                    required: true,
                    number: true,
                    range: [-50, 50]
                },
                colmax: {
                    required: true,
                    number: true,
                    range: [-50, 50]
                }
            },
            messages:{
                rowmin: {
                    required: "Enter a number from -50 to 50."
                },
                rowmax: {
                    required: "Enter a number from -50 to 50."
                },
                colmin: {
                    required: "Enter a number from -50 to 50."
                },
                colmax: {
                    required: "Enter a number from -50 to 50."
                }
            }
    })  //end validate
    

    

    //prevent the js from returning and reloading page
    $("#form").submit(function(e) {
        e.preventDefault();
    });

    var tabs = $("#myTabs").tabs();

    // Close icon: removing the tab on click
    tabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
        tabs.tabs( "refresh" );
    });


});



function addTab() {
    var tabTitle = $("#rowmin").val() + "," + $("#rowmax").val() + "x" + $("#colmin").val() + "," + $("#colmax").val();
    if (tabTitle == ",x,") {
        tabTitle = "Tab " + tabCounter;
    }

    var label = tabTitle || "Tab " + tabCounter,
    id = "tabs-" + tabCounter,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = $("#myTable").html();

    var tabs = $("#myTabs").tabs();
    tabs.find( ".ui-tabs-nav" ).append( li );
    tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
    tabs.tabs( "refresh" );
    tabCounter++;
}




function createTable(){

    //prevent the js from returning and reloading page
    $("#form").submit(function(e) {
        e.preventDefault();
    });
    
    //parse as Int or else value returned is string type
    var rmin = parseInt(document.getElementById("rowmin").value);
    var rmax = parseInt(document.getElementById("rowmax").value);
    var cmin = parseInt(document.getElementById("colmin").value);
    var cmax = parseInt(document.getElementById("colmax").value);

    //reset errormessage
    document.getElementById("errorMessage").innerHTML = "";
    
    //swap min and max if one is greater than the other
    var temp = 0;
    if ( rmin > rmax)
    {
        temp = rmax;
        rmax = rmin;
        rmin = temp;
        document.getElementById("errorMessage").innerHTML += "Swapped row values: " + rmin +","+ rmax + ". ";
        document.getElementById("errorMessage").innerHTML += tabTitle;
    }
    if ( cmin > cmax )
    {
        temp = cmax;
        cmax = cmin;
        cmin = temp;
        document.getElementById("errorMessage").innerHTML += "Swapped column values: " + cmin +","+ cmax + ". ";
    }

    //for testing purposes
    //document.getElementById("errorMessage").innerHTML = "rmin: "+rmin +", rmax: "+rmax +"<br> cmin: "+cmin +", cmax: "+cmax;

    //get div from html
    var myTable = document.getElementById("myTable");

    //delete anything already in my div
    myTable.innerHTML = "";

    //initialization
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var text = document.createTextNode(" "); 

    //create the column header
    //hw3 converted to innerHTML
    var t = "<tr><td></td>"; //append the empty corner cell
    for (var x = cmin; x <= cmax; x++)
    {
        t += "<td>" + x + "</td>";
    }
    table.innerHTML += t + "</tr>";

    //tried to convert to innerHTML but failed
    //for some reason the style wont apply to the table
    table.appendChild(tr);//append column header to table
    //reset td and tr
    tr = document.createElement("tr");
    td = document.createElement("td");
    for (var i = rmin; i <= rmax; i++)
    {
        //insert row index
        text = document.createTextNode(i);
        td.appendChild(text);
        tr.appendChild(td);
        td = document.createElement("td");//reset td 
        for (var k = cmin; k <= cmax; k++)
        {
            //calculate the mutltiplication
            text = document.createTextNode(i*k);
            td.appendChild(text);   //add text to td
            tr.appendChild(td);     //add td to tr
            td = document.createElement("td");//create new td element for next iteration
        }
        table.appendChild(tr);  //add tr to table
        tr = document.createElement("tr");//create new tr element for next iteration
    }
    myTable.appendChild(table); //add table into the html
    return;
}
