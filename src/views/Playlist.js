import { useParams, useHistory } from "react-router-dom";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MusicBar from "./MusicBar";
import ShowSongsFromDB from "./ShowSongsFromDB";
const Playlist = ({ db }) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd20f3fd22msh481d137e30ab9bdp15c761jsn16f3883c1ae9",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const uid = useParams().id;
  const pid = useParams().pid;

  const [songs, setSongs] = useState("");
  const [likedSongs, setLikedSongs] = useState("");
  const [audio, setAudio] = useState(null);
  const [now, setNow] = useState("");
  const [pending, setPending] = useState(false);
  const [playing, setPlaynig] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const playlistColRef = collection(
    db,
    "users",
    uid,
    "playlists",
    pid,
    "songs"
  );

  const likedColRef = collection(db, "users", uid, "liked");

  useEffect(() => {
    audio && audio.play();
  }, [audio]);
  useEffect(() => {
    onSnapshot(playlistColRef, (snapshot) => {
      setSongs(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
    });
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

    if (likedSongs.filter((e) => e.id === id).length > 0) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
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

  if (audio) {
    audio.onended = function () {
      setNow("");
    };
  }
  const handleRemoveFromPlaylist = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(id);

    const docRef = doc(db, "users", uid, "playlists", pid, "songs", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-white min-w-full min-h-full absolute sm:left-48  bg-gradient-to-br from-gray-800 to-emerald-900 font-Montserrat font-bold ">
      <ShowSongsFromDB
        songs={songs}
        handlePlay={handlePlay}
        now={now}
        playlist={true}
        handleRemoveFromPlaylist={handleRemoveFromPlaylist}
      />

      <MusicBar
        now={now}
        playing={playing}
        handlePlay={handlePlay}
        isLiked={isLiked}
      />
    </div>
  );
};

export default Playlist;
