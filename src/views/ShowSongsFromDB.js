const ShowSongsFromDB = ({
  songs,
  handlePlay,
  now,
  playlist,
  handleRemoveFromPlaylist,
}) => {
  return (
    <div className="max-w-full md:w-10/12 sm:w-4/6 ">
      {songs &&
        songs.map((song) => (
          <div
            className=" h-1/12 p-4 w-full  hover:bg-gray-300 hover:bg-opacity-20 hover:text-emerald-500 cursor-pointer  transition duration-150 flex  items-center "
            key={song.id}
            onClick={() => handlePlay(song.id)}
          >
            <div className="">
              <div className="">
                {now !== song.id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 inline"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {now === song.id && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2 inline"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}

                <h1 className="text-xl inline">{song.title}</h1>
              </div>
              <div className="text-sm font-thin">
                by{" "}
                {song.artists.map((artist) => (
                  <span className="" key={artist}>
                    {artist}
                    {" , "}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-auto">
              {playlist && (
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-red-700"
                    onClick={(e) => handleRemoveFromPlaylist(e, song.id)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowSongsFromDB;
