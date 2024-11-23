import { CelebrationDto } from "../types/celebration";
import { addDoc, collection, CollectionReference, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export class CelebrationRepository {
	private path: string;
	private collectionRef: CollectionReference;

	constructor(userId: string) {
		console.log("CelebrationRepository: " + userId);
		this.path = `users/${userId}/celebrations`;
		this.collectionRef = collection(db, this.path);
	}

	public async getCelebrationList(): Promise<CelebrationDto[]> {
		const snapshot = await getDocs(this.collectionRef);
		return snapshot.docs.map((doc) => {
			const celebration = doc.data();
			// TODO: withConverter的な処理を共通化する
			const date = celebration.date.toDate();
			return {
				id: doc.id,
				dayName: celebration.dayName,
				date: date,
			};
		});
	}

	public async createCelebration(celebration: CelebrationDto): Promise<void> {
		await addDoc(this.collectionRef, { ...celebration });
		// TODO: エラーハンドリング
	}
}
