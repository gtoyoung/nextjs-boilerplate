import {
  Database,
  DataSnapshot,
  get,
  getDatabase,
  ref,
  set,
  DatabaseReference,
} from "firebase/database";

import { firebaseApp } from "./config";

const TABLE = {
  // POST: "posts",
  // CHAT_ROOM: "chatrooms",
  // TOKEN: "token",
  PROFILE_IMG: "profileImg",
  // POKE_NAME: "poketmon",
};

class FirebaseDb {
  db: Database;
  constructor() {
    this.db = getDatabase(firebaseApp);
  }

  // 참조 객체 리턴
  getRef(path: string): DatabaseReference {
    return ref(this.db, path);
  }

  // 사용자 프로필 이미지 저장
  saveProfileImg(userId: string, imgUrl: string): Promise<boolean> {
    return set(ref(this.db, `/users/${userId}/${TABLE.PROFILE_IMG}`), {
      url: imgUrl,
    })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  // 사용자 프로필 이미지 가져오기
  getProfileImg(userId: string): Promise<string> {
    return get(ref(this.db, `/users/${userId}/${TABLE.PROFILE_IMG}`))
      .then((data: DataSnapshot) => {
        if (data.size === 0) {
          return "";
        }
        return data.val().url;
      })
      .catch(() => {
        return "";
      });
  }
}

export default new FirebaseDb();
