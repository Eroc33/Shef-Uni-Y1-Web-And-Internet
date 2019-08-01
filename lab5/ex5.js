'use strict';

function showArray(arr)
{
	for(var i = 0;i<arr.length;i++)
	{
		document.write(arr[i]);
		document.write("<\/br>");
	}
	document.write("<\/br>");
}

function showIdxsIf(arr,f)
{
	for(var i = 0;i<arr.length;i++)
	{
		if(f(arr[i])){
			document.write(i);
			document.write("<\/br>");
		}
	}
}

var rands = fillN(10,function(){ return randTo(20);});
showArray(rands);
showIdxsIf(rands,function(v){return v>10;})
