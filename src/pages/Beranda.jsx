import axios from "axios";
import React, { useEffect, useState } from "react";
import BerandaView from "./BerandaView";

const Beranda = () => {
  const [filmData, setFilmData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

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
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US&page=1"
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

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
    setIsPlaying(e.target.checked); // Control video play/stop based on checkbox state
  };

  return (
    <BerandaView
      currentSlide={currentSlide}
      handleCheckboxChange={handleCheckboxChange}
      filmData={filmData}
      handleStop={handleStop}
      isCheckboxChecked={isCheckboxChecked}
      isPlaying={isPlaying}
    />
  );
};

export default Beranda;
