'use strict';

function calcRequiredTime(initial,desired,interest)
{
	var years = 0;
	var current = initial;
	while(current < desired)
	{
		current *= interest;
		years++;
	}
	return years;
}

var initial = getInputFloat("Initial sum");
var desired = getInputFloat("Desired sum");
var interest = (getInputInt("Interest (%)")/100.0) + 1.0;

var years = calcRequiredTime(initial, desired, interest);

document.write("Money will mature in "+years+" years");
