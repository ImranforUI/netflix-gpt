import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  addUpcommingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcommingMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUpcommingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addUpcommingMovies(json.results));
    };

    getUpcommingMovies();
  }, []);
};
export default useUpcommingMovies;
