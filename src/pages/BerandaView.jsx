import React from "react";
import NowPlaying from "./NowPlaying";
import TopRated from "./TopRated";
import Popular from "./Popular";

const BerandaView = ({
  filmData,
  currentSlide,
  isPlaying,
  handleCheckboxChange,
  isCheckboxChecked,
  handleStop,
}) => {
  return (
    <div className="relative w-full bg-white dark:bg-black">
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="w-1/4 h-full bg-black flex flex-col justify-center pl-10">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">
              {filmData[currentSlide]?.title}
            </h1>
            <p className="text-base">{filmData[currentSlide]?.overview}</p>
          </div>
        </div>

        <div className="w-3/4 h-full relative overflow-hidden">
          {" "}
          {/* overflow-hidden ditambahkan */}
          {/* Gradient overlay to keep gradient even when video is playing */}
          <div
            className="absolute top-0 left-0 w-full h-full z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
            }}
          ></div>
          {/* Background image or video */}
          {!isPlaying ? (
            <div
              className="w-full h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: filmData[currentSlide]?.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original/${filmData[currentSlide]?.backdrop_path})`
                  : `url('https://example.com/fallback-image.jpg')`,
              }}
            ></div>
          ) : (
            filmData[currentSlide]?.trailerKey && (
              <iframe
                className="w-full h-full absolute top-0 left-0 z-0 object-cover"
                style={{
                  transform: "scale(1.5)", // Sedikit memperbesar iframe
                }}
                src={`https://www.youtube.com/embed/${filmData[currentSlide]?.trailerKey}?autoplay=1&mute=0&controls=1&loop=1&playlist=${filmData[currentSlide]?.trailerKey}`}
                title={`Video Slide`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleStop}
              ></iframe>
            )
          )}
        </div>
      </div>

      {/* Checkbox to toggle video play/stop with play/pause icon */}
      <div className="absolute right-4">
        <label className="text-lg text-white bg-black p-2 rounded-md flex items-center">
          <input
            type="checkbox"
            className="mr-2 hidden"
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
          />
          {isCheckboxChecked ? (
            // Pause icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            // Play icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <span className="ml-2">
            {isCheckboxChecked ? "Pause Trailer" : "Play Trailer"}
          </span>
        </label>
      </div>

      {/* Film Sections */}
      <div>
        <NowPlaying />
        <TopRated />
        <Popular />
      </div>
      <div style={{ paddingBottom: "50px" }}>
        <h1>Selamat Datang di LeFilm Kan</h1>
      </div>
    </div>
  );
};

export default BerandaView;
