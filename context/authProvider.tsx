import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseAuth from "services/firebase/auth";

// Firebase User Context 생성
const AuthContext = createContext<{ user: User }>({
  user: null,
});

// 유저 전역관리를 위한 컨텍스트 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    return firebaseAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // FB의 구글로그인의 경우 2-3초 딜레이가 발생하는 문제가 있어서
        // 로컬스토리지에 저장하여 딜레이를 없앤다.
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // 존재안할 경우 제거(로그아웃등)
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Firebase User Context 사용
export const useAuth = () => {
  return useContext(AuthContext);
};
