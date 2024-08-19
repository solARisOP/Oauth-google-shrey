import { useAuthContext } from "../context/AuthContext";

const useGoogle = () => {
	const { setAuthUser } = useAuthContext();
	const google = async () => {
		const res = await fetch("http://localhost:8000/api/auth/data", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
			credentials: 'include'
		});

		const data = await res.json();
		console.log(data);
		localStorage.setItem("chat-user", JSON.stringify(data));
		setAuthUser(data);
	};
	return { google };
};

export default useGoogle;
