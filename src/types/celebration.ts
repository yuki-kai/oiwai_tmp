export type CelebrationDto = {
	docId?: string;
	dayName: string;
	date: string; // yyyy/mm/dd
	createdAt?: Date;
	updatedAt?: Date;
};

export type InputCelebration = {
	dayName: string;
	date: Date;
};
