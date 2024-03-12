import { useEffect, useState } from "react";
import supabase from "../supabase";
import CATEGORIES from "../Resources";

function CategoryTags(props) {
  const { movie } = props;
  const [ids, setIds] = useState(new Array());

  useEffect(function () {
    async function getIds(movie) {
      const { data: categoriesQueryIds } = await supabase
        .from("categoriesformovies")
        .select("*")
        .eq("movieid", movie.id)
        .select("category");

      const resp = new Array();
      categoriesQueryIds.forEach((json) => resp.push(json["category"]));
      setIds(resp);
    }
    getIds(movie);
  }, []);

  return (
    <>
      {ids.map((category) => (
        <span
          key={movie.id + "_" + category}
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find((cat) => cat.name === category)
              .color,
          }}
        >
          {category}
        </span>
      ))}
    </>
  );
}

export default CategoryTags;
