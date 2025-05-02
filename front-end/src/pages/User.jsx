import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import UserNavbar from "../components/UserNavbar";
import LoadingMessage from "../components/LoadingMessage";
import axios from "axios";

export default function User() {
  const { user, token } = useAuth(); // Get token from context

  const [userInfo, setUserInfo] = useState(null);

  const [keywords, setKeywords] = useState("");
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 loading state

  // inside the component
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  const handleSearch = async () => {
    setError("");
    setFilteredPeople([]);
    setLoading(true); // 👈 start loading

    if (!keywords) {
      setError("Keywords are required.");
      setLoading(false); // 👈 stop loading if validation fails
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/search-people",
        { keywords },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.filteredPeople) {
        setFilteredPeople(response.data.filteredPeople);
      } else {
        setError("No filtered people found.");
      }
    } catch (err) {
      console.error("Error during search:", err);
      if (err.response) {
        setError(
          err.response.data.message || "An error occurred during the search."
        );
      } else {
        setError("Network error occurred.");
      }
    } finally {
      setLoading(false); // 👈 always stop loading at the end
    }
  };

  return (
    <>
      <UserNavbar />
      <h1 className="text-2xl font-bold p-4">User Home Page</h1>
      {userInfo && (
        <p className="mt-4 text-lg p-4">
          Welcome,{" "}
          <span className="font-semibold">
            {userInfo.name} {userInfo.surname}
          </span>
          !
        </p>
      )}

      <div className="mt-6 p-4">
        <input
          type="text"
          placeholder="Enter keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border p-4 mr-2"
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-red-600 text-white rounded hover:bg-red-700"
          disabled={loading} // 👈 disable while loading
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {loading && (
        <div className="mt-6 p-4">
          <LoadingMessage />
        </div>
      )}

      {filteredPeople.length > 0 && (
        <div className="mt-6 p-4">
          <h2 className="text-xl font-bold text-red-700">
            {filteredPeople.length} People Found
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPeople.map((person, index) => (
              <li
                key={index}
                className="mt-2 border-2 border-red-700 p-4 rounded"
              >
                {person.profilePicture ? (
                  <img
                    src={person.profilePicture}
                    alt="profile"
                    className="w-48 h-48 object-cover mb-2 rounded-xl border-2 border-red-700 mx-auto shadow "
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 w-48 h-48 border-2 rounded-xl border-red-700 mx-auto shadow "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                )}
                <div>
                  <p className="text-center text-lg font-semibold mb-4">
                    <strong>
                      {person.firstName} {person.lastName}
                    </strong>
                  </p>
                  <p>
                    <strong>Username:</strong> {person.username}
                  </p>
                  <p>
                    <strong>Headline:</strong> {person.headline}
                  </p>
                  <p>
                    <strong>Location:</strong> {person.city}, {person.country}
                  </p>
                  <p>
                    <strong>Summary:</strong>
                  </p>
                  <p>{person.summary ? person.summary : "N/A"}</p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {person.email ? person.email : "N/A"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
