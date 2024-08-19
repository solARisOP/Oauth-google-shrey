import { useAuthContext } from "../context/AuthContext";

const useGoogle = () => {
  const { setAuthUser } = useAuthContext();
  const google = async () => {
    const res = await fetch("/api/auth/data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    localStorage.getItem("chat-user", JSON.stringify(data));
    setAuthUser(data);
  };
  return { google };
};

export default useGoogle;
