export default function Login() {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="password" placeholder="Password" className="p-2 border rounded" />
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    );
  }
  