import { CelebrationDto } from "../types/celebration";

type CelebrationProps = {
	dayName: string;
	date: Date;
	docId?: string;
};

export class Celebration {
	public readonly dayName: string;
	public readonly date: Date;
	public readonly docId?: string;

	private constructor(props: CelebrationProps) {
		this.dayName = props.dayName;
		this.date = props.date;
		this.docId = props.docId;
	}

	public static create(props: CelebrationProps): CelebrationDto {
		const celebration = new Celebration(props);
		return celebration.toDto();
	};

	public toDto(): CelebrationDto {
		return {
			docId: this.docId,
			dayName: this.dayName,
			date: this.date,
		};
	};
}
