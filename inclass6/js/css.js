$(function() {
	//Create backgroundColor variable for the value of the 
	//backgroundcolor property of the first list item
	var backgroundColor = $("#one").css( "background-color" );

	//Write the background color of the first list item into the page using
	//append() after the <ul> element
	$("ul").after("<p>"+backgroundColor+"</p>");

	/*Change all <li> elements, use .css() method to update several CSS
		properties at the same time:
		• Background color change to #c5a996
		• White solid border with 1px
		• Text change to black
		• Remove text shadow (set to none)
		• Font change to Georgia
	*/
	$("li").css({ 
		"background-color": "#c5a996", 
		"border": "1px solid white",
		"color": "black",
		"text-shadow": "none",
		"font-family": "Georgia"
		 });
});