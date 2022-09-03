import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const Playlists = ({ db }) => {
  const id = useParams().id;
  const history = useHistory();
  const [playlists, setPlaylists] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [show, setShow] = useState(false);

  const playlistsColRef = collection(db, "users", id, "playlists");

  useEffect(() => {
    onSnapshot(playlistsColRef, (snapshot) => {
      setPlaylists(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
  }, []);

  //console.log(playlists);

  const handleGoToPlaylist = (pid) => {
    history.push(`./${id}/${pid}`);
  };

  const handleDeletePlaylist = (e, pid) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(id);

    const docRef = doc(db, "users", id, "playlists", pid);
    deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.log(err));
  };
  const handleShowForm = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleHide = (e) => {
    e.preventDefault();
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (playlistName !== "") {
      addDoc(playlistsColRef, {
        title: playlistName,
      }).then(() => {
        setPlaylistName("");
      });
    }
  };

  return (
    <div className="text-white lg:text-2xl absolute sm:left-48 w-full h-full bg-gradient-to-br from-gray-800 to-emerald-900 font-Montserrat font-bold py-4 pr-3  ">
      <div className=" m-2 w-full flex justify-between">
        <h1>Your Playlists</h1>
        <span className="sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:text-emerald-500"
            onClick={(e) => handleShowForm(e)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </div>
      <div
        className={
          show
            ? " show-small-create-playlist"
            : " show-small-create-playlist hidden"
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
            onClick={(e) => handleHide(e)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="flex flex-col justify-around items-center h-full ">
          <div className="">
            <h1>Create Playlist</h1>
          </div>
          <div className="flex flex-col items-center pb-2">
            <form
              className="flex flex-col p-1 "
              onClick={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                className="mb-4 rounded-md p-2 focus:outline-none text-gray-500 w-full"
                placeholder="Playlist Name"
                onChange={(e) => setPlaylistName(e.target.value)}
                value={playlistName}
              />
              <button className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-800 transition duration-150 ">
                Add playlist
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 ml-3 w-10/12">
        {playlists &&
          playlists.map((playlist) => (
            <div
              className="bg-emerald-100 rounded-lg  bg-opacity-10 h-full pl-2 py-8  transition duration-150 w-full hover:bg-opacity-20 shadow hover:shadow-emerald-300 flex justify-between "
              key={playlist.id}
              onClick={() => handleGoToPlaylist(playlist.id)}
            >
              {playlist.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2 hover:text-red-500 cursor-pointer inline"
                onClick={(e) => handleDeletePlaylist(e, playlist.id)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlists;
