import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
const Signup = ({ auth, db }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [show, setShow] = useState(false);
  const [passErr, setPassErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const history = useHistory();
  useEffect(() => {
    //console.log(userColRef);
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setPassErr(null);
    setEmailErr(null);
    if (password === check) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          //console.log(cred.user);
          setDoc(doc(db, "users", cred.user.uid), {
            email: email,
          }).then(() => {
            history.push(`/home/${cred.user.uid}`);
          });
          // addDoc(userColRef, {
          //   uid: cred.user.uid,
          //   email: email,
          // }).then(() => {
          //   history.push(`/home/${cred.user.uid}`);
          // });
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/weak-password") {
            setPassErr("At least 6 characters");
          } else if (err.code === "auth/email-already-in-use") {
            setEmailErr("Email already taken");
          }

          console.log(err.message);
        });
    } else {
      setPassErr("Passwords dont match");
      setCheck("");
      setPassword("");
    }
  };
  const handleShowPass = () => {
    setShow(!show);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className=" sign-card ">
        <div className="sign-card-content">
          <span className="uppercase font-bold text-2xl sm:text-3xl">
            sign up
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
            {emailErr && <p className="text-red-600 text-sm">{emailErr}</p>}
            <input
              className={
                emailErr
                  ? "sign border-red-600 mb-4"
                  : "sign border-emerald-600 mb-4"
              }
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {passErr && <p className="text-red-600 text-sm">{passErr}</p>}

            <input
              className={
                passErr
                  ? "sign border-red-600 mb-4"
                  : "sign border-emerald-600 mb-4"
              }
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className={
                passErr
                  ? "sign border-red-600 mb-1"
                  : "sign border-emerald-600 mb1"
              }
              type={show ? "text" : "password"}
              placeholder="Check Password"
              value={check}
              onChange={(e) => setCheck(e.target.value)}
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
            sign up
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
            Already have an account?
            <Link className="text-emerald-500" to="./Signin">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
