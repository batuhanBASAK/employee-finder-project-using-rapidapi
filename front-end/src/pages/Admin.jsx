import { useLayoutEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

  useLayoutEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/admin/logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchUsers();
    fetchLogs();
  }, []);

  return (
    <>
      <AdminNavbar />
      <ScrollToTopButton />
      <div className="p-4 w-full container mx-auto">
        <h1 className="text-xl font-semibold mb-2">User List</h1>
        <hr />
        <table className="w-full border border-red-300 overflow-x-auto mt-6">
          <thead className="bg-red-200">
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Surname</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Company Name</th>
              <th className="border px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="odd:bg-white even:bg-red-50">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.surname}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.company}</td>
                <td className="border px-4 py-2">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 w-full mt-10">
        <h1 className="text-xl font-semibold mb-2">Action Logs</h1>
        <hr />
        <table className="w-full border border-red-300 overflow-x-auto mt-6">
          <thead className="bg-red-200">
            <tr>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Action</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="odd:bg-white even:bg-red-50">
                <td className="border px-4 py-2">{log.email}</td>
                <td className="border px-4 py-2">{log.action}</td>
                <td className="border px-4 py-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
