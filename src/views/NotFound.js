import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center  text-white flex-col">
      <h1 className="text-9xl">404-NotFound</h1>
      <Link
        to="/"
        className="text-2xl nav-items border-2 border-emerald-500 mt-6"
      >
        Go Back Home
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 inline ml-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default NotFound;
