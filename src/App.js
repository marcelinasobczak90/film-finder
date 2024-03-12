import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";
import MovieList from "./Movie/MovieList";
import Header from "./Header";
import CategoryFilter from "./CategoryFilter";
import Loader from "./Loader";
import NewMovieForm from "./NewMovieForm/NewMovieForm.container";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [movies, setMovies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("all");

  useEffect(
    function () {
      async function getMovies() {
        setIsLoading(true);

        let query = supabase.from("movies").select("*");
        let categoriesQueryIds = supabase
          .from("categoriesformovies")
          .select("*");
        let idsNumbers = new Array();

        if (category !== "all") {
          const { data: ids, errorCat } = await categoriesQueryIds
            .eq("category", category)
            .select("movieid");

          ids.forEach((x) =>
            x.movieid !== null ? idsNumbers.push(x.movieid) : null
          );

          query = query.in("id", idsNumbers);
        }

        const { data: movies, error } = await query
          .order("votesLove", { ascending: false })
          .limit(1000);

        console.log(error);
        if (!error) {
          setMovies(movies);
        } else {
          alert("Movies are loading...");
        }
        setIsLoading(false);
      }
      getMovies();
    },
    [category]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewMovieForm
          movies={movies}
          setMovies={setMovies}
          setShowForm={setShowForm}
        />
      ) : null}

      <main className="main">
        <CategoryFilter setCategory={setCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <MovieList movies={movies} setMovies={setMovies} />
        )}
      </main>
      <footer>&copy; 2024 Marcelina Sobczak. All Rights Reserved.</footer>
    </>
  );
}

export default App;
