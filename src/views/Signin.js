import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Signin = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred.user);
        history.push(`/home/${cred.user.uid}`);
      })
      .catch((err) => {
        setError(true);
        console.log(err.message);
      });
  };
  const handleShowPass = () => {
    setShow(!show);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" sign-card ">
        <div className="sign-card-content">
          <span className="uppercase font-bold text-2xl sm:text-3xl">
            sign in
          </span>
          <span className="text-center text-xl hidden sm:inline">
            <span className="uppercase font-bold block">Your music world</span>
            Where you can find your own space!
          </span>
        </div>

        <form
          className="col-span-2 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <h1 className=" text-3xl sm:text-4xl font-bold uppercase">Tunes</h1>
          </div>
          <div className="w-3/4 m-1 flex flex-col items-center ">
            {error && (
              <p className="text-red-600 text-sm">
                Check your Email and/or Password
              </p>
            )}
            <input
              className={
                error
                  ? "sign border-red-600 mb-4"
                  : "sign border-emerald-600 mb-4"
              }
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className={
                error
                  ? "sign border-red-600 mb-1"
                  : "sign border-emerald-600 mb-1"
              }
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!show && (
              <p
                className="text-green-300 sm cursor-pointer hover:text-green-500"
                onClick={handleShowPass}
              >
                show password
              </p>
            )}
            {show && (
              <p
                className="text-green-300 sm cursor-pointer hover:text-green-500"
                onClick={handleShowPass}
              >
                Hide password
              </p>
            )}
          </div>

          <button type="submit" className="sign-btn">
            sign in
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <p>
            New Here?
            <Link className="text-emerald-500" to="./Signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
