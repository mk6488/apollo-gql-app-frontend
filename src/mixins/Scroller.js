export default {
	watch: {
		currentPage() {
			document.body.scrollTop = 0; // for Safary
			document.documentElement.scrollTop = 0;
		},
	},
}