"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserType = {
  userId: string;
  email: string;
  role: string;
};

type UserContextType = {
  user: UserType;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>({} as UserType);

  useEffect(() => {
    // const cartItems = localStorage.getItem("foodCart");
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjM2MDAsImRhdGEiOnsidXNlcklkIjoiNjg4MWE2MzUxODM5Y2VkNWRiMDQ5MTQyIiwicm9sZSI6IkFETUlOIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSJ9LCJpYXQiOjE3NTMzMzAzMTN9.VBL7A2hbRw6VmC8diioP7BI_AcH5Yfd694CNAwwfi8A";
    const getCurrentUser = async () => {
      const userData = await getCurrentUserByAccessToken(accessToken);
      console.log("userData", userData);
      setUser(userData);
    };
    getCurrentUser();
  }, []);

  const getCurrentUserByAccessToken = async (accessToken: string) => {
    try {
      const response = await fetch(
        "http://localhost:4202/auth/get-current-user",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
