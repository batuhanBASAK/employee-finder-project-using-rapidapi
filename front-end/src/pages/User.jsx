import { useAuth } from "../utils/AuthContext";
import UserNavbar from "../components/UserNavbar";

export default function User() {
  const { user } = useAuth(); // ⬅️ get user from context

  return (
    <>
      <UserNavbar />
      <h1 className="text-2xl font-bold">User Home Page</h1>
      {user?.email && (
        <p className="mt-4 text-lg">Welcome, <span className="font-semibold">{user.email}</span>!</p>
      )}
    </>
  );
}
