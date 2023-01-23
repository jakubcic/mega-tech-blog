module.exports = {
	format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	format_timestamp: (timestamp) => {
		// format time as HH:MM:SS
		return timestamp.toLocaleTimeString();
	},
};
