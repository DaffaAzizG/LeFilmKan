import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setDetail } from "../store/action/detailFilmAction";
import { addRatedMovie } from "../store/action/ratedMovieAction"; // Import action
import ReactPlayer from "react-player"; // Import React Player

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail.detail);
  const [userRating, setUserRating] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // State to hold trailer key

  useEffect(() => {
    const getData = async () => {
      const data = await ambilDetailFilm();
      dispatch(setDetail(data));

      // Fetch the trailers after getting the film details
      const trailerData = await ambilTrailerFilm();
      if (trailerData) {
        const trailer = trailerData.find((video) => video.type === "Trailer");
        if (trailer) {
          setTrailerKey(trailer.key); // Set the trailer key if available
        }
      }
    };

    getData();
  }, [dispatch, id]);

  const ambilDetailFilm = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  };

  // Fetch trailer information
  const ambilTrailerFilm = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a5cd991ac31663b6218651adacb93b30&language=en-US`
      );
      return response.data.results; // Return the video results
    } catch (error) {
      console.error("Error fetching trailer data:", error);
      return null;
    }
  };

  // Save rating and dispatch to Redux
  const handleRating = (rating) => {
    setUserRating(rating);

    // Add movie with user rating to the ratedMovies
    const ratedMovie = { ...detail, userRating: rating };
    dispatch(addRatedMovie(ratedMovie));

    // Save to Local Storage
    saveToLocalStorage(ratedMovie);

    Rating(rating); // Call API to submit rating to the backend
  };

  const saveToLocalStorage = (movie) => {
    // Ambil data yang sudah ada di localStorage
    const savedMovies = JSON.parse(localStorage.getItem("ratedMovies")) || [];

    // Tambahkan film yang baru dirating ke dalam array
    const updatedMovies = [...savedMovies, movie];

    // Simpan kembali ke localStorage
    localStorage.setItem("ratedMovies", JSON.stringify(updatedMovies));
  };

  const Rating = async (rating) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating`,
        { value: rating },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json;charset=utf-8",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RjMjJlMDQxMDQzMWQ2ZjhlNjhhMTQ5NzEwOWFjMCIsIm5iZiI6MTcyOTMwOTk2MC40NTA3MjQsInN1YiI6IjY3MDQ5MTcyMWI5NmI4ZWY0YzY5YjlkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v1FcUz10tVNo1aZ2hFPPZ345EKM9uDW08rnYCLmC5dQ",
          },
        }
      );

      const statusCode = response.data.status_code;
      if (statusCode === 1) {
        alert("Berhasil Ditambahkan Ke Rating!");
      } else if (statusCode === 12) {
        alert("Rating Berhasil Di Update!");
      }
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto p-4 relative w-full">
        {detail ? (
          <div className="flex flex-wrap">
            {/* Movie Poster */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <div className="card bg-white dark:bg-black dark:text-gray-400 shadow-xl w-full">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${detail?.poster_path})`,
                    height: "100%", // Make sure it fills the height
                    aspectRatio: "2/3", // Maintain aspect ratio
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="w-full lg:w-3/4 dark:bg-black dark:text-gray-400 mt-4 lg:mt-0 p-4">
              <h2 className="card-title text-3xl font-bold mb-2">
                {detail?.title}
              </h2>
              <p className="text-lg mb-4">{detail?.overview}</p>
              <p className="text-md mb-4">
                <strong>Release Date:</strong> {detail?.release_date}
              </p>
              <p className="text-md mb-4">
                <strong>Genres:</strong>{" "}
                {detail?.genres?.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-md mb-4">
                <strong>Rating:</strong> {detail?.vote_average}
              </p>

              <div className="rating mb-4">
                <p className="px-2">
                  <strong>Your Rate: </strong>
                </p>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <input
                    key={rating}
                    type="radio"
                    name="user-rating"
                    className="mask mask-star-2 bg-orange-400"
                    checked={userRating === rating}
                    onChange={() => handleRating(rating)}
                  />
                ))}
              </div>
              <div>
                {trailerKey && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                    <div
                      className="relative w-full h-0"
                      style={{ paddingTop: "56.25%" }}
                    >
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailerKey}`} // Use the trailer key
                        className="absolute top-0 left-0 w-full h-full"
                        width="100%"
                        height="100%"
                        controls // Show controls
                        playing={false} // Set to false to not autoplay
                        config={{
                          youtube: {
                            playerVars: {
                              showinfo: 0,
                              modestbranding: 1,
                              rel: 0,
                            }, // Customize player
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="card-actions justify-end py-5">
                <Link to={`/`}>
                  <button className="btn btn-primary dark:bg-slate-700 dark:border-slate-900 border-black bg-slate-200 text-black dark:text-gray-400">
                    Back
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Trailer Section */}
      </div>
      <div>
        <p>
          Haloooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        </p>
      </div>
    </div>
  );
};

export default Detail;
