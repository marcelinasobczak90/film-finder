import supabase from "../supabase";
import VoteButtons from "./VoteButtons";
import MovieContent from "./MovieContent";
import CategoryTags from "./CategoryTags";

function Movie(props) {
  const { movie, setMovies } = props;
  return (
    <li className="movie">
      <MovieContent movie={movie} />
      <CategoryTags movie={movie} />
      <VoteButtons movie={movie} setMovies={setMovies} supabase={supabase} />
    </li>
  );
}

export default Movie;
