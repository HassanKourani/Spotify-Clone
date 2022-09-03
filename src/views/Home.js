import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
const Home = ({ db }) => {
  const [topArtists, setTopArtists] = useState(null);
  const [playlists, setPlaylists] = useState("");
  const id = useParams().id;
  const playlistsColRef = collection(db, "users", id, "playlists");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7acaab878mshd6bf6abad2fbf96p1d04c8jsncf03a3451e7e",
        "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
      },
    };

    fetch(
      "https://spotify81.p.rapidapi.com/top_20_by_monthly_listeners",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        const items = response.slice(0, 10);
        setTopArtists(items);
      })
      .catch((err) => console.error(err));
    onSnapshot(playlistsColRef, (snapshot) => {
      setPlaylists(
        snapshot.docs.map((item) => ({ ...item.data(), id: item.id }))
      );
    });
  }, []);
  console.log(playlists);
  const history = useHistory();
  const handleGoToPlaylist = (pid) => {
    history.push(`/playlists/${id}/${pid}`);
  };

  return (
    <div className="text-white  min-w-full min-h-full absolute sm:left-48 w-full bg-gradient-to-br from-gray-800 to-emerald-900 font-Montserrat font-bold ">
      <div className="m-4">
        <div className="">
          <div className="text-2xl sm:w-10/12">
            <div className=" flex justify-between sm:block ">
              <span>Your Playlists:</span>
              <Link
                to={`/liked/${id}`}
                className="sm:hidden items-center hover:bg-gray-500 p-2 rounded-lg transition duration-300 hover:text-emerald-400 cursor-pointer text-sm "
              >
                <p className="inline">Liked Songs</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 inline"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-3 my-2">
              {playlists.length === 0 && (
                <h1 className="my-6 m-auto opacity-30 col-span-3">
                  No Playlist :/
                </h1>
              )}
              {playlists &&
                playlists.map((playlist) => (
                  <div
                    className="bg-emerald-100 rounded-lg text-lg sm:text-2xl  bg-opacity-10 h-full pl-2 sm:py-8 py-4  transition duration-150 w-10/12 hover:bg-opacity-20 shadow hover:shadow-emerald-300 flex justify-between "
                    key={playlist.id}
                    onClick={() => handleGoToPlaylist(playlist.id)}
                  >
                    {playlist.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="sm:text-xl">Top Artists</h1>
          <ul className="grid md:grid-cols-2 sm:grid-cols-1 md:mr-2  mb-24 sm:mb-0">
            {topArtists &&
              topArtists.map((artists) => (
                <li className="p-6 ">
                  <h3 className="inline">{artists.rank}.</h3>
                  <h1 className="inline"> {artists.artist}</h1>
                  <h3 className="font-thin text-sm">
                    Monthly Listeners: {artists.monthlyListeners}
                  </h3>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
