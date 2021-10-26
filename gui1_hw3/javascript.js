
function createTable(){
    
    var rmin = document.getElementById("rowmin").value;
    var rmax = document.getElementById("rowmax").value;
    var cmin = document.getElementById("colmin").value;
    var cmax = document.getElementById("colmax").value;

    //reset errormessage
    document.getElementById("errorMessage").innerHTML = "";

    //check if input is empty
    var isError = false;
    if ( rmin == "" || rmax == "" || cmin == "" || cmax == ""){
        document.getElementById("errorMessage").innerHTML += 
        "Please fill in all inputs. "
        isError = true;
    }
    //check whole numbers
    if ( rmin % 1 || rmax % 1  || cmin % 1  || cmax % 1 ){
        document.getElementById("errorMessage").innerHTML += 
        "Please enter whole numbers. "
        isError = true;
    }
    //check min is < max
    if ( rmin > rmax || cmin > cmax){
        document.getElementById("errorMessage").innerHTML += 
        "Minimum cannot be larger than maximum. "
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
