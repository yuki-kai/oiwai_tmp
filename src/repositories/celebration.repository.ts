import { CelebrationDto } from "../types/celebration";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  SnapshotOptions,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const celebrationConverter: FirestoreDataConverter<CelebrationDto> = {
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CelebrationDto {
    const data = snapshot.data(options);
    return {
      docId: snapshot.id,
      dayName: data.dayName,
      date: data.date,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
  toFirestore(celebration: CelebrationDto): DocumentData {
    return {
      dayName: celebration.dayName,
      date: celebration.date,
      createdAt: celebration.createdAt ? celebration.createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(), // TODO: 更新されないがシミュレータだから？
    };
  },
};

export class CelebrationRepository {
  private path: string;
  private collectionRef: CollectionReference;

  constructor(userId: string) {
    console.log("CelebrationRepository: " + userId);
    this.path = `users/${userId}/celebrations`;
    this.collectionRef = collection(db, this.path).withConverter(
      celebrationConverter,
    );
  }

  public async getCelebrationList(): Promise<CelebrationDto[]> {
    const snapshot = await getDocs(query(this.collectionRef, orderBy("date")));
    return snapshot.docs.map((doc) => {
      const celebration = doc.data();
      return {
        docId: doc.id,
        dayName: celebration.dayName,
        date: celebration.date,
      };
    });
  }

  public async createCelebration(celebration: CelebrationDto): Promise<void> {
    await addDoc(this.collectionRef, {
      dayName: celebration.dayName,
      date: celebration.date,
    });
    // TODO: エラーハンドリング
  }

  public async editCelebration(celebration: CelebrationDto): Promise<void> {
    const docRef = doc(db, this.path, celebration.docId!);
    await updateDoc(docRef, {
      dayName: celebration.dayName,
      date: celebration.date,
    });
    // TODO: エラーハンドリング
  }

  public async deleteCelebration(docId: string): Promise<void> {
    await deleteDoc(doc(db, this.path, docId));
    // TODO: エラーハンドリング
  }
}
