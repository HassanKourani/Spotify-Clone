const ShowSongs = ({ tracks, handlePlay, now }) => {
  return (
    <div className="">
      {!tracks && (
        <div className="w-full h-screen flex justify-center items-start opacity-30">
          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <h1 className="text-2xl">Search</h1>
          </div>
        </div>
      )}
      {tracks &&
        tracks.map((track) => (
          <div
            className="w-full h-1/12 p-4 hover:bg-gray-300 hover:bg-opacity-20 hover:text-emerald-500 cursor-pointer  transition duration-150 "
            key={track.data.id}
            onClick={() => handlePlay(track.data.id)}
          >
            <div className="">
              {now !== track.data.id && (
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
              {now === track.data.id && (
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

              <h1 className="md:text-xl text-sm inline ">{track.data.name}</h1>
            </div>
            <div className="text-sm font-thin">
              by{" "}
              {track.data.artists.items.map((artist) => (
                <span key={artist.uri} className="">
                  {artist.profile.name}
                  {" , "}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShowSongs;
