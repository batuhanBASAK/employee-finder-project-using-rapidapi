import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useAuth } from "../utils/AuthContext";

export default function Home() {
  const { isUserLoggedIn, isAdminLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate("/admin");
    } else if (isUserLoggedIn) {
      navigate("/user");
    }
  }, [isUserLoggedIn, isAdminLoggedIn, navigate]);

  return (
    <div className="h-[1000px]">
      <Navbar />
      <ScrollToTopButton />
      <header className="bg-gray-50 p-4 md:h-screen flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-5xl tracking-normal font-semibold mb-4">
            Employee Finder Platform
          </h1>
          <h2 className="text-base md:text-xl mb-4">
            This is an employee finder platform where you can find your next
            employee
          </h2>

          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-4 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <img
            className="border rounded"
            src="./img/home-header-img.jpg"
            alt="home header image"
          />
        </div>
      </header>

      <main className="md:h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl md:text-5xl tracking-normal font-semibold p-16 text-center capitalize">
          Why this platform?
        </h2>

        <section className="p-8 columns-1 md:columns-3">
          <div className="flex flex-col items-start gap-1 md:gap-2 my-2">
            <h3 className="text-gray-800 md:mx-auto text-xl font-semibold">
              Search Easily
            </h3>
            <p className="text-base">
              You can easily search employee by entering the job title or other
              keywords
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 md:gap-2 my-2">
            <h3 className="text-gray-800 md:mx-auto text-xl font-semibold">
              Filter Location
            </h3>
            <p className="text-base">
              You can filter them respect to country and city they are living
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 md:gap-2 my-2">
            <h3 className="text-gray-800 md:mx-auto text-xl font-semibold">
              Contact Easily
            </h3>
            <p className="text-base">
              You can contact with the one you want easily via email
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
