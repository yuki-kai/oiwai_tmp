export type CelebrationDto = {
	docId?: string;
	dayName: string;
	date: string; // yyyy/mm/dd
	memo?: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type InputCelebration = {
	dayName: string;
	date: Date;
	memo?: string;
};
