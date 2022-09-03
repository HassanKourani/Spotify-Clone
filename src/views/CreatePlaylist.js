import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";

const CreatePlayList = ({ show, db }) => {
  const [hide, setHide] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [created, setCreated] = useState(false);
  const id = useParams().id;
  //console.log(id);
  const playlistsColRef = collection(db, "users", id, "playlists");
  const handleHide = (e) => {
    e.stopPropagation();
    setHide(true);
    setHide(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlistName !== "") {
      addDoc(playlistsColRef, {
        title: playlistName,
      }).then(() => {
        setPlaylistName("");
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
        }, 5000);
      });
    }
  };
  const handleoverlay = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={
        show && !hide ? "show-create-playlist" : "show-create-playlist hidden"
      }
    >
      <div className="w-min">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:text-red-500 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <div
        className="flex flex-col justify-around items-center h-full "
        onClick={(e) => handleHide(e)}
      >
        <div className="">
          <h1>Create Playlist</h1>
        </div>
        <div className="flex flex-col items-center pb-2">
          <form className="flex flex-col p-1 " onClick={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="mb-4 rounded-md p-2 focus:outline-none text-gray-500 w-full"
              placeholder="Playlist Name"
              onChange={(e) => setPlaylistName(e.target.value)}
              value={playlistName}
              onClick={(e) => handleoverlay(e)}
            />
            <button className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-800 transition duration-150 ">
              Add playlist
            </button>
          </form>
          {created && <h1 className="text-emerald-400">playlist created </h1>}
        </div>
      </div>
    </div>
  );
};

export default CreatePlayList;
