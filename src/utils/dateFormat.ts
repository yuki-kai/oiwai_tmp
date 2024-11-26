const options: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
}

export const convertDateString = (date: Date): string => {
	return date.toLocaleDateString("ja-JP", options);
}
