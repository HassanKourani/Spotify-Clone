import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
const Welcome = ({ auth }) => {
  const history = useHistory();
  const handleGuest = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, "guest@gmail.com", "guest1234")
      .then((cred) => {
        console.log(cred.user);
        history.push(`/home/${cred.user.uid}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="min-w-screen min-h-screen text-gray-200 bg-[url('https://img5.goodfon.com/wallpaper/nbig/7/51/kasety-muzyka-fon-1.jpg')]">
      <main className="min-w-screen min-h-screen bg-gray-700 bg-opacity-60 p-4">
        <nav className="flex justify-between">
          <h1 className="text-4xl text-emerald-500 font-bold">
            Welcome To Tunes!
          </h1>
          <div className="flex justify-between ">
            <Link to="/signin" className="uppercase nav-items ">
              Signin
            </Link>
            <Link to="/signup" className="uppercase nav-items ">
              Signup
            </Link>
          </div>
        </nav>
        <div className="w-full h-screen flex flex-col justify-center sm:text-6xl text-4xl ml-12">
          <p className="mb-3">Listen, relax, </p>
          <p className="mb-12">
            Chill, <span className="text-emerald-500 font-bold">Repeat.</span>
          </p>
          <div className="">
            <p className="sm:text-2xl w-1/2 text-lg">
              Tunes is where You can find your Own personal Space, Listen to
              your favourite songs, create Your own Vibes.
            </p>

            <button className="text-lg bg-emerald-600 p-2 rounded-md hover:bg-emerald-700 mt-2">
              <Link to="/signup" className="w-full">
                Get Started
              </Link>
            </button>
            <button
              className="text-lg bg-emerald-600 p-2 rounded-md hover:bg-emerald-700 mt-2  block sm:ml-6 sm:inline"
              onClick={handleGuest}
            >
              Signin as Guest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
