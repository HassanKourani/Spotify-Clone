import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import ShowSongsFromDB from "./ShowSongsFromDB";
import MusicBar from "./MusicBar";
const Liked = ({ db }) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cd20f3fd22msh481d137e30ab9bdp15c761jsn16f3883c1ae9",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const uid = useParams().id;

  const [songs, setSongs] = useState("");
  const [audio, setAudio] = useState(null);
  const [now, setNow] = useState("");
  const [pending, setPending] = useState(false);
  const [playing, setPlaynig] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const likedColRef = collection(db, "users", uid, "liked");

  useEffect(() => {
    audio && audio.play();
  }, [audio]);

  useEffect(() => {
    onSnapshot(likedColRef, (snapshot) => {
      setSongs(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
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
  };

  if (audio) {
    audio.onended = function () {
      setNow("");
    };
  }
  useEffect(() => {
    if (songs && playing) {
      if (songs.filter((e) => e.id === playing[0].id).length > 0) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [songs, playing]);

  return (
    <div className="text-white min-w-full min-h-full absolute sm:left-48 w-screen h-screen bg-gradient-to-br from-gray-800 to-emerald-900 font-Montserrat font-bold ">
      <ShowSongsFromDB songs={songs} handlePlay={handlePlay} now={now} />
      <MusicBar
        now={now}
        playing={playing}
        handlePlay={handlePlay}
        isLiked={isLiked}
      />
    </div>
  );
};

export default Liked;
