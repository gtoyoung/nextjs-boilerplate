import {
  Auth,
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithRedirect,
  User,
} from "firebase/auth";
import { GoogleUser } from "props/common";
import { firebaseApp } from "./config";

class FirebaseAuth {
  // 권한 필드
  auth: Auth;
  constructor() {
    this.auth = getAuth(firebaseApp);
  }

  login(providerName: string) {
    let provier: GoogleAuthProvider;
    if (providerName === "google") {
      provier = new GoogleAuthProvider();
    }

    return setPersistence(this.auth, browserLocalPersistence).then(() => {
      return signInWithRedirect(this.auth, provier);
    });
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  // 현재 사용자의 프로필 정보를 가져옴
  getProfile(user: User): GoogleUser {
    if (user) {
      return this.convertUser(user);
    } else {
      return null;
    }
  }

  // 구글 사용자 객체로 변환
  convertUser(user: User): GoogleUser {
    return {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      uid: user.uid,
      profileImage: null,
    };
  }
}

export default new FirebaseAuth();
