// ADD NEW ITEM TO END OF LIST
var fs = document.getElementsByTagName("ul")[0];
var li = document.createElement("li");
li.appendChild(document.createTextNode("cream"));
fs.appendChild(li);


// ADD NEW ITEM START OF LIST
fs = document.getElementsByTagName("ul")[0];
li = document.createElement("li");
li.appendChild(document.createTextNode("kale"));
fs.insertBefore(li, fs.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var el = document.querySelectorAll('li');
for ( var i = 0; i < el.length; i++){
	el[i].className += "cool";
}


// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
fs = document.querySelectorAll("li");
var h = document.getElementsByTagName("h2")[0];
h.innerHTML += "<span>" + fs.length + "</span>";