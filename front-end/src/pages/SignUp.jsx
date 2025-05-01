import Navbar from "../components/Navbar";

export default function SignUp() {
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 border rounded"
            required
          />
          <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
