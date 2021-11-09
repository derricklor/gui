/*
Copyright 2021 Derrick Lor
Umass Lowell Computer Science
Email: derrick_lor@student.uml.edu
GUI Programming I
Date: 11/4/2021
Assignment: Homework 4 jQuery validation
Sources: w3schools jqueryvalidation youtube stackoverflow
*/


$(document).ready(function(){

    // jQuery methods go here...
    // jquery selectors use the same syntax as css selectors
    // $(selector).action()
  
    //can also do (button).on("click",function(){})
    

    //focus in and out on the input boxes
    $("input").focus(function(){
        $(this).css("background-color", "#e7e9eb");
    });
    $("input").blur(function(){
        $(this).css("background-color", "white");
    });

    //validate the id for form
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
    });

});


function createTable(){

    //prevent the js from returning and reloading page
    $("#form").submit(function(e) {
        e.preventDefault();
    });
    
    var rmin = document.getElementById("rowmin").value;
    var rmax = document.getElementById("rowmax").value;
    var cmin = document.getElementById("colmin").value;
    var cmax = document.getElementById("colmax").value;

    //reset errormessage
    document.getElementById("errorMessage").innerHTML = "";

    //check if input is empty
    var isError = false;
    
    //swap min and max if one is greater than the other
    var temp = 0;
    if ( rmin > rmax)
    {
        temp = rmax;
        rmax = rmin;
        rmin = temp;
        document.getElementById("errorMessage").innerHTML = "swapped row values: " + rmin +","+ rmax;
    }
    temp = 0;
    if ( cmin > cmax )
    {
        temp = cmax;
        cmax = cmin;
        cmin = temp;
        document.getElementById("errorMessage").innerHTML = "swapped col values: " + cmin +","+ cmax;
    }

    //check whole numbers
    if ( rmin % 1 || rmax % 1  || cmin % 1  || cmax % 1 ){
        document.getElementById("errorMessage").innerHTML += 
        "Please enter whole numbers. "
        isError = true;
    }
    
    //check if in bounds
    if ( rmin < -50 || rmax > 50 || cmin < -50 || cmax > 50 ||
         rmin > 50  || rmax < -50|| cmin > 50  || cmax < -50){
        document.getElementById("errorMessage").innerHTML += 
        "Please enter numbers in range -50 to 50. "
        isError = true;
    }
    //if any error occurs, then immediately stop
    if (isError)
    {
        return false;
    }
    
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
    //append the empty corner cell
    td.appendChild(text);
    tr.appendChild(td);
    td = document.createElement("td");//reset td
    //append the column header
    for (var x = cmin; x <= cmax; x++)
    {
        text = document.createTextNode(x);
        td.appendChild(text);   //add text to td
        tr.appendChild(td);     //add td to tr
        //create new td for next iteration
        td = document.createElement("td");
    }
    //append column header to table
    table.appendChild(tr);

    //reset td and tr
    tr = document.createElement("tr");
    td = document.createElement("td");

    for (var i = rmin; i <= rmax; i++)
    {
        //insert row index
        text = document.createTextNode(i);
        td.appendChild(text);
        tr.appendChild(td);

        //reset td 
        td = document.createElement("td");

        for (var k = cmin; k <= cmax; k++)
        {
            //calculate the mutltiplication
            text = document.createTextNode(i*k);

            td.appendChild(text);   //add text to td
            tr.appendChild(td);     //add td to tr

            //create new td element for next iteration
            td = document.createElement("td");
        }

        table.appendChild(tr);  //add tr to table

        //create new tr element for next iteration
        tr = document.createElement("tr");
    }

    myTable.appendChild(table); //add table into the html
    return;
}
