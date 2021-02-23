import moment from 'moment'
import { toast } from './Toast'

export const weekNumber = (val) => {
	if (val) {
		return moment(val).diff("2020-09-07", "weeks") + 1
	} else {
		toast("error", "You must select a date")
	}
}

export const currentAge = (val) => {
	if (val) {
		return moment(new Date()).diff(val, "years")
	}
}

export const calculateAverage = (array) => {
	var total = 0;
	var count = 0;

	array.forEach(function(item) {
		total += item;
		count++;
	});

	return total / count;
}