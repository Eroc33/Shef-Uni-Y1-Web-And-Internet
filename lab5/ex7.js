'use strict';

var rands = fillN(10,function(){return randTo(10);});
for(var i=0;i<rands.length;i++)
{
	printN(Math.floor(rands[i]),"*");
	document.write("<\/br>");
}

