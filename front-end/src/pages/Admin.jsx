import AdminNavbar from "../components/AdminNavbar";

export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <h1 className="text-2xl font-bold">Admin Page</h1>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>sirname</td>
            <td>email</td>
            <td>company name</td>
            <td>phone</td>
            <td>location</td>
          </tr>
        </thead>
      </table>
    </>
  );
}
