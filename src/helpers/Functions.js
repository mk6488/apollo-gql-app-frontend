import moment from 'moment'
import { toast } from './Toast'

export const weekNumber = (val) => {
	let date = val.split('T')[0]
	if (date) {
		return moment(val).diff("2020-09-07", "weeks") + 1
	} else {
		toast("error", "You must select a date")
	}
}