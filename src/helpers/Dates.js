const Dates = date => {
	const options = {
		weekday: 'long',
		month: 'short',
		day: 'numeric',
	};

	const date2 = new Date(date);

	return date2.toLocaleDateString('en-EN', options);
};

export default Dates;
