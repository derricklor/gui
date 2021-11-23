$(function() {
	
	//Insert “Just Updated” (as a paragraph).
	$("ul").before("<p> Just Updated! </p>")

	//Add a plus symbol (+) before all list items whose class
	//attribute contains value “hot”
	$("li.hot").prepend("+");

	//Create and add a new list item “gluten-free soy sauce”
	$("ul").append("<li>gluten-free soy sauce</li>");
	
});