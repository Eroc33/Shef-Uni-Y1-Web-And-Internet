'use strict';
function nTimes(n,func)
{
	for(var i = 0;i<n;i++){
		func();
	}
}

var i = getInputInt("How many times? (please enter an int)")
nTimes(i,function(){document.write("Hello");})
