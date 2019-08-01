'use strict';
function getInputInt(msg)
{
	var i;
	while(isNaN(i))
	{
		i = parseInt(prompt(msg));
	}
	return i;
}

function getInputFloat(msg)
{
	var i;
	while(isNaN(i))
	{
		i = parseFloat(prompt(msg));
	}
	return i;
}

function randTo(max)
{
	return Math.random()*max;
}

function fillN(n,f)
{
	var arr = [];
	for(var i = 0;i<n;i++)
	{
		arr[i] = f()
	}
	return arr;
}

function nTimes(n,func)
{
	for(var i = 0;i<n;i++){
		func();
	}
}

function printN(n,str,br){
	if(br !== true)
	{
		br = false;
	}
	br = br?"<\/br>":"";
	nTimes(n,function(){document.write(str+br)});
}
