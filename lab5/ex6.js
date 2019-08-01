'use strict';

function display(v)
{
	var floor = Math.floor(v);
	var ceil = Math.ceil(v);
	var round = Math.round(v);
	document.write("<tr><td>"+v+"<\/td><td>"+floor+"<\/td><td>"+round+"<\/td><td>"+ceil+"<\/td><\/tr>")
}

var rands = fillN(10,function(){return randTo(10);});
document.write("<table><thead><tr><th>Value<\/th><th>Floor<\/th><th>Round<\/th><th>Ceil<\/th><\/tr><\/thead>");
for(var i=0;i<rands.length;i++)
{
	display(rands[i]);
}
document.write("<\/table>");
