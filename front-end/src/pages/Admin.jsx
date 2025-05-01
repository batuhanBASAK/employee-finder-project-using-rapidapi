import AdminNavbar from "../components/AdminNavbar";

// for testing
const users = [
  {
    name: "Alice",
    surname: "Johnson",
    email: "alice@example.com",
    company: "TechCorp",
    phone: "123-456-7890",
  },
  {
    name: "Bob",
    surname: "Smith",
    email: "bob@example.com",
    company: "Innova",
    phone: "234-567-8901",
  },
  {
    name: "Charlie",
    surname: "Brown",
    email: "charlie@example.com",
    company: "DevSolutions",
    phone: "345-678-9012",
  },
  {
    name: "Diana",
    surname: "Evans",
    email: "diana@example.com",
    company: "CreativeWorks",
    phone: "456-789-0123",
  },
  {
    name: "Ethan",
    surname: "Lee",
    email: "ethan@example.com",
    company: "Skyline",
    phone: "567-890-1234",
  },
  {
    name: "Fiona",
    surname: "Martinez",
    email: "fiona@example.com",
    company: "BuildSmart",
    phone: "678-901-2345",
  },
  {
    name: "George",
    surname: "Wright",
    email: "george@example.com",
    company: "BrightTech",
    phone: "789-012-3456",
  },
  {
    name: "Hannah",
    surname: "Nguyen",
    email: "hannah@example.com",
    company: "SoftPulse",
    phone: "890-123-4567",
  },
  {
    name: "Ian",
    surname: "Baker",
    email: "ian@example.com",
    company: "NextWave",
    phone: "901-234-5678",
  },
  {
    name: "Julia",
    surname: "Kim",
    email: "julia@example.com",
    company: "GreenEdge",
    phone: "012-345-6789",
  },
  {
    name: "Kevin",
    surname: "Clark",
    email: "kevin@example.com",
    company: "CodeCrafters",
    phone: "111-222-3333",
  },
  {
    name: "Laura",
    surname: "Scott",
    email: "laura@example.com",
    company: "FastTrack",
    phone: "222-333-4444",
  },
  {
    name: "Mike",
    surname: "Lopez",
    email: "mike@example.com",
    company: "Innovision",
    phone: "333-444-5555",
  },
  {
    name: "Nina",
    surname: "Adams",
    email: "nina@example.com",
    company: "ThinkSharp",
    phone: "444-555-6666",
  },
  {
    name: "Oscar",
    surname: "Reed",
    email: "oscar@example.com",
    company: "BrightLogic",
    phone: "555-666-7777",
  },
];

export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <div className="p-4 w-full">
        <h1 className="text-xl font-semibold mb-2">User List</h1>
        <table className="w-full border border-red-300 overflow-x-auto">
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
    </>
  );
}
