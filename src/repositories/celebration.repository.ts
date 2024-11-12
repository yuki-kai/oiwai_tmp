import { Celebration } from "../models/Celebration";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export class CelebrationRepository {
	private path: string;

	constructor(userId: string) {
		console.log("CelebrationRepository: " + userId);
		this.path = `users/${userId}/celebrations`;
	}

	public async getCelebrationList(): Promise<Celebration[]> {
		const collectionRef = collection(db, this.path);
		const snapshot = await getDocs(collectionRef);
		return snapshot.docs.map((doc) => {
			const celebration = doc.data();
			// TODO: withConverter的な処理を共通化する
			const date = celebration.date.toDate();
			return {
				id: doc.id,
				dayName: celebration.dayName,
				date: date,
			} as Celebration;
		});
	}
}
