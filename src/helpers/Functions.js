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
	let roundNumber = Math.round((total / count) * 10) / 10

	return roundNumber
}

export const calculateSplits = (val) => {
	let split = calculate2KSplit(val)
	let U2 = moment(split, "mm:ss.S").add(18, 'seconds').format("mm:ss.S")
	let U1 = moment(split, "mm:ss.S").add(14, 'seconds').format("mm:ss.S")
	let AT = moment(split, "mm:ss.S").add(6, 'seconds').format("mm:ss.S")
	let TR = split
	let AN = moment(split, "mm:ss.S").subtract(3, 'seconds').format("mm:ss.S")
	return [U2, U1, AT, TR, AN]
}

function calculate2KSplit(val) {
	let time = moment(val, "mm:ss.S")
	let split = moment(time / 4).format("mm:ss.S")
	return split
}