import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NowPlaying = () => {
  const [filmData, setFilmData] = useState([]);
  const dispatch = useDispatch();

  const ambilFilm = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US&page=1"
      );
      const filmList = response.data.results;
      setFilmData(filmList);
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  };

  useEffect(() => {
    ambilFilm();
  }, []);

  return (
    <div className="mx-auto w-full px-8 py-6">
      <h2 className="text-3xl font-semibold text-black dark:text-white mb-6">
        Now Playing
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

export default NowPlaying;
