type CelebrationProps = {
	dayName: string;
	date: Date;
};

export class Celebration {
	public path: string;
	private readonly dayName: string;
	private readonly date: Date;

	private constructor(uid: string, props: CelebrationProps) {
		this.path = `users/${uid}/celebrations`;
		this.dayName = props.dayName;
		this.date = props.date;
	}

	public static create(uid: string, props: CelebrationProps): Celebration {
		return new Celebration(uid, props);
	};

	public toDto() {
		return { dayName: this.dayName, date: this.date };
	};
}
