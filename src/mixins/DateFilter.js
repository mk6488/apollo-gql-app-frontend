import moment from "moment";

export default {
	filters: {
		dateTimeFilter(val) {
			return moment(val).format("ddd Do MMM YY, H:mm");
		},

		birthDateFilter(val) {
			return moment(val).format("DD/MM/YYYY");
		},

		dateTimeFilterOptional(val) {
			return moment(new Date(parseInt(val))).format("ddd Do MMM YY, H:mm");
		},

		birthDateFilterOptional(val) {
			return moment(new Date(parseInt(val))).format("DD/MM/YYYY");
		},
	},
}