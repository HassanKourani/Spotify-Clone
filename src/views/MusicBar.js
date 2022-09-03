import { db } from "../config";
import {
  collection,
  setDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const MusicBar = ({ playing, handlePlay, now, isLiked }) => {
  const uid = useParams().id;
  const playlistsColRef = collection(db, "users", uid, "playlists");
  const [playlists, setPlaylists] = useState("");
  const [show, setShow] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    onSnapshot(playlistsColRef, (snapshot) => {
      setPlaylists(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
  }, []);

  const handleShowPlaylists = () => {
    setShow(true);
  };
  const handleHidePlaylists = () => {
    setShow(false);
  };
  const handleAddToPlaylist = (e, pid) => {
    e.preventDefault();
    const names = [];
    playing[0].artists.map((artist) => {
      names.push(artist.name);
    });
    setDoc(doc(db, "users", uid, "playlists", pid, "songs", playing[0].id), {
      title: playing[0].name,
      artists: names,
    }).then(() => {
      //hide playlists list
      setShow(false);
      setTimeout(() => {
        setShowAdded(false);
      }, 2500);
      setShowAdded(true);
    });
  };
  const handleAddToLiked = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const names = [];
    playing[0].artists.map((artist) => {
      names.push(artist.name);
    });
    setDoc(doc(db, "users", uid, "liked", playing[0].id), {
      title: playing[0].name,
      artists: names,
    }).then(() => {
      console.log("added", playing[0].name);
    });
  };

  const handleRemoveFromLiked = (e, id) => {
    e.stopPropagation();
    e.preventDefault();

    const docRef = doc(db, "users", uid, "liked", id);
    deleteDoc(docRef).then(() => {
      isLiked = false;
    });
  };
  return (
    <div className="flex justify-center">
      {playing && (
        <div className="bg-gray-900 h-40 fixed bottom-20 rounded-xl sm:rounded-none  w-full flex justify-center sm:justify-between items-center drop-shadow-2xl shadow-white sm:w-auto sm:bottom-0 sm:left-48 sm:right-0 ">
          <div className=" w-2/3 sm:w-auto ml-8 flex flex-col justify-around h-full">
            <div className="flex justify-between items-center">
              <p className="sm:text-2xl text-sm">Playing Right now:</p>
              <a
                href={playing[0].uri}
                className="items-center hover:bg-gray-500 p-2 rounded-lg transition duration-300 hover:text-emerald-400 cursor-pointer text-sm"
              >
                Full Song
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 inline"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="">
              {!now && (
                <div
                  className="border-2 border-white rounded-full p-2 hover:text-emerald-500 hover:border-emerald-500  flex   sm:w-auto "
                  onClick={() => handlePlay(playing[0].id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 hidden sm:inline "
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className=" max-w-xs md:max-w-md  whitespace-nowrap overflow-hidden flex justify-start items-center">
                    <p className="ml-2"> {playing[0].name}</p>
                    {" - "}
                    {playing[0].artists.map((artist) => (
                      <span key={artist.id} className="font-thin text-sm">
                        {artist.name}
                        {" , "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {now && (
                <div
                  className="border-2 border-white rounded-full p-2 hover:text-emerald-500 hover:border-emerald-500 flex"
                  onClick={() => handlePlay(playing[0].id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 hidden sm:inline "
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className=" max-w-xs md:max-w-md w-full whitespace-nowrap overflow-hidden flex justify-start items-center">
                    <p className="ml-2"> {playing[0].name}</p>
                    {"-"}
                    {playing[0].artists.map((artist) => (
                      <span key={artist.id} className="font-thin text-sm">
                        {artist.name}
                        {" , "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-800">
              {now && (
                <div className=" bg-emerald-500 w-full h-3 animate-fill"></div>
              )}
              {!now && <div className=" bg-gray-800 w-full h-3"></div>}
            </div>
          </div>

          <div className="mr-16 flex justify-between w-20">
            <div className={show ? "add-playlist " : "add-playlist hidden"}>
              <div className="flex justify-between mb-5">
                <h1 className="text-2xl">Choose a Playlist</h1>
                <h1
                  className="hover:text-red-600 cursor-pointer"
                  onClick={handleHidePlaylists}
                >
                  X
                </h1>
              </div>
              <div className="flex flex-wrap justify-around gap-5 cursor-pointer">
                {playlists &&
                  playlists.map((playlist) => (
                    <div
                      className=" p-3 hover:bg-emerald-500 rounded-md"
                      key={playlist.id}
                      onClick={(e) => handleAddToPlaylist(e, playlist.id)}
                    >
                      {playlist.title}
                    </div>
                  ))}
              </div>
            </div>

            <div className=" flex justify-between w-full">
              {!showAdded && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24 "
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:text-emerald-500"
                  onClick={handleShowPlaylists}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              {showAdded && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-emerald-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}

              {!isLiked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6  hover:text-emerald-500"
                  onClick={(e) => {
                    handleAddToLiked(e, playing[0].id);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
              {isLiked && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-emerald-500  hover:text-gray-200"
                  onClick={(e) => {
                    handleRemoveFromLiked(e, playing[0].id);
                  }}
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicBar;
