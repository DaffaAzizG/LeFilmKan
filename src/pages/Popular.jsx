import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Popular = () => {
  const [filmData, setFilmData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const dispatch = useDispatch(); // Use dispatch to send actions to Redux

  const ambilTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US`
      );
      const trailers = response.data.results.filter(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      return trailers.length > 0 ? trailers[0].key : null;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return null;
    }
  };

  const ambilFilm = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US&page=3"
      );
      const filmList = response.data.results;

      // Fetch trailers for each film
      const filmsWithTrailers = await Promise.all(
        filmList.map(async (film) => {
          const trailerKey = await ambilTrailer(film.id);
          return { ...film, trailerKey };
        })
      );

      setFilmData(filmsWithTrailers);
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };

  useEffect(() => {
    ambilFilm();
  }, []);

  useEffect(() => {
    // Automatic slider
    const interval = setInterval(() => {
      if (!isPlaying) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % filmData.length);
      }
    }, 5000); // Every 5 seconds
    return () => clearInterval(interval);
  }, [isPlaying, filmData]);

  const handlePlay = (index) => {
    setCurrentSlide(index);
    setIsPlaying(true); // Stop automatic slider
  };

  const handleStop = () => {
    setIsPlaying(false); // Resume automatic slider after video ends
  };

  return (
    <div className="mx-auto w-full px-8 py-6">
      <h2 className="text-3xl font-semibold text-black dark:text-white mb-6">
        Popular
      </h2>
      <div className="carousel w-full gap-5">
        {filmData?.map((film) => (
          <div
            key={film.id}
            className=" carousel-item w-64 transform hover:scale-105 transition-transform"
          >
            <Link to={`/detail/${film.id}`}>
              <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original/${film?.poster_path}`}
                  alt={film?.title}
                />
              </div>
            </Link>
            <div className="absolute bottom-0 bg-black bg-opacity-50 p-2 text-white w-full text-sm">
              {film?.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
