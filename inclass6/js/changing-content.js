$(function() {

	//Remove the first list item
	var list = $("li");
	list[0].remove();

	//Find list item “pine” and change the text to “almonds”
	$("li:contains(pine)").text("almonds");


	//Select all list items whose class attribute is “hot”, 
	//and add <em> tag
	$("li.hot").wrapInner("<em></em>");
});