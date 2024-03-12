import { useEffect, useState } from "react";
import supabase from "../supabase";
import MovieTitleInput from "./MovieTitleInput";
import MovieDescriptionInput from "./MovieDescriptionInput";
import MovieSourceInput from "./MovieSourceInput";
import CategoriesSelector from "./CategoriesSelector";

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewMovieForm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLenght = description.length;
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [conditionsFullfilled, setConditionsFullfilled] = useState(false);

  const { setMovies, setShowForm } = props;

  useEffect(() => {
    if (
      title &&
      description &&
      textLenght <= 200 &&
      selectedCategories.size > 0 &&
      source //MARS isValidHttpUrl(source)
    ) {
      setConditionsFullfilled(true);
    } else {
      setConditionsFullfilled(false);
    }
  }, [title, description, selectedCategories, source]);

  async function handleSubmit(e) {
    //prevent browser reload
    e.preventDefault();

    //if data is valid
    if (
      title &&
      description &&
      textLenght <= 200 &&
      selectedCategories.size > 0 &&
      source //MARS isValidHttpUrl(source)
    ) {
      setIsUploading(true);
      const { data: newMovie, error } = await supabase
        .from("movies")
        .insert([{ title, description, source }])
        .select();

      const newMovieObj = newMovie[0];

      setIsUploading(false);

      //add new movie to the UI (to state)
      if (!error) {
        setMovies((movies) => [newMovie[0], ...movies]);
      }

      selectedCategories.forEach((cat) => {
        handleSubmitCategories(e, newMovieObj["id"], cat);
      });

      //reset input fields
      setTitle("");
      setDescription("");
      setSource("");

      //close the form
      setShowForm(false);
    }
  }

  async function handleSubmitCategories(e, movieid, category) {
    await supabase
      .from("categoriesformovies")
      .insert([{ movieid, category }])
      .select();
  }

  return (
    <form className="movieform" onSubmit={handleSubmit}>
      <MovieTitleInput
        title={title}
        setTitle={setTitle}
        isUploading={isUploading}
      />
      {/* <span>{textLenght}</span> */}

      <MovieDescriptionInput
        description={description}
        setDescription={setDescription}
        isUploading={isUploading}
      />

      <MovieSourceInput
        source={source}
        setSource={setSource}
        isUploading={isUploading}
      />

      <CategoriesSelector setSelectedCategories={setSelectedCategories} />

      <button
        className="btn btn-large btn-post"
        disabled={isUploading || !conditionsFullfilled}
      >
        Post
      </button>
    </form>
  );
}

export default NewMovieForm;
