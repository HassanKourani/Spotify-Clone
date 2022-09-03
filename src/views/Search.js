import { useEffect, useState } from "react";
import MusicBar from "./MusicBar";
import { useHistory, useParams } from "react-router-dom";
import ShowSongs from "./ShowSongs";
import { onSnapshot, collection } from "firebase/firestore";

const Search = ({ db }) => {
  const [tracks, setTracks] = useState(null);
  const [search, setSearch] = useState("");
  const [audio, setAudio] = useState(null);
  const [now, setNow] = useState("");
  const [pending, setPending] = useState(false);
  const [playing, setPlaynig] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likedSongs, setLikedSongs] = useState("");
  const [searching, setSearching] = useState(false);

  const uid = useParams().id;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd20f3fd22msh481d137e30ab9bdp15c761jsn16f3883c1ae9",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const likedColRef = collection(db, "users", uid, "liked");
  useEffect(() => {
    onSnapshot(likedColRef, (snapshot) => {
      setLikedSongs(snapshot.docs.map((item) => ({ id: item.id })));
    });
  }, []);
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      console.log("paused");
      audio && audio.pause();
    });
  }, [history, audio]);

  useEffect(() => {
    audio && audio.play();
  }, [audio]);
  if (audio) {
    audio.onended = function () {
      setNow("");
    };
  }

  const handleSearch = () => {
    setSearching(true);
    fetch(
      `https://spotify23.p.rapidapi.com/search/?q=${search}&type=multi&offset=0&limit=50&numberOfTopResults=5`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSearching(false);
        setTracks(response.tracks.items);
        //console.log(response.tracks.items);
      })
      .catch((err) => console.error(err));
  };
  const handlePlay = (id) => {
    //console.log(id);
    if (pending) return;
    setPending(true);
    if (id === now) {
      setNow("");
    } else {
      setTimeout(() => {
        setNow(id);
      }, 1);

      setNow("");
    }
    audio && audio.pause();
    fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        setPlaynig(response.tracks);
        console.log(response.tracks);
        return response.tracks[0].preview_url;
      })
      .then((response) => {
        if (id !== now) {
          setAudio(new Audio(response));
          setPending(false);
        } else {
          setPending(false);
        }
      })
      .catch((err) => {
        setPending(false);
        console.error(err);
      });
  };
  useEffect(() => {
    if (likedSongs && playing) {
      if (likedSongs.filter((e) => e.id === playing[0].id).length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [likedSongs, playing]);
  return (
    <div className="text-white absolute sm:left-48 min-w-full min-h-full  bg-gradient-to-br from-gray-800 to-emerald-900 font-Montserrat font-bold py-4">
      <div className="mx-4">
        <div className="bg-gray-400 bg-opacity-25 p-3 w-fit md:w-1/3 rounded flex items-center justify-around">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-400 bg-opacity-0 w-full focus:outline-none  transition duration-200 rounded "
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          {!searching && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:text-emerald-500 transition duration-200"
              onClick={handleSearch}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          )}
          {searching && (
            <svg
              aria-hidden="true"
              class=" w-6 h-6 text-gray-300 animate-spin dark:text-gray-600 fill-emerald-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="">
        <div className="m-4 text-2xl">tracks</div>
        <ShowSongs tracks={tracks} handlePlay={handlePlay} now={now} />
      </div>
      <MusicBar
        now={now}
        playing={playing}
        handlePlay={handlePlay}
        isLiked={isLiked}
      />
    </div>
  );
};

export default Search;
