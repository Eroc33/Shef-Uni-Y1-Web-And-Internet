'use strict';
function dayString(date)
{
	var	day = date.getDay();
	return (["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"])[day];
}


function monthString(date)
{
	var month = date.getMonth();
	return (["January", "February", "March",
					 "April", "May", "June",
					 "July", "August", "September",
					 "October", "November", "December"])[month];
}

function dateToString(date){
	return dayString(date)+", "+date.getDate()+" "+monthString(date)+" "+date.getFullYear();
}

var now = new Date();
var date = dateToString(now);
document.write(date);
