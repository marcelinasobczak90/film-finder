import {
  filmwebIcon,
  imdbIcon,
  linkIcon,
  rottenIcon,
} from "../Elements/PortalIcons";

function MovieContent(props) {
  const { movie } = props;

  function getPortalIcon() {
    const typeOfLink = movie.source.toLowerCase();
    if (typeOfLink.includes("filmweb")) {
      return filmwebIcon();
    }
    if (typeOfLink.includes("imdb")) {
      return imdbIcon();
    }
    if (typeOfLink.includes("rotten")) {
      return rottenIcon();
    }
    return linkIcon();
  }

  return (
    <>
      <div className="content">
        <p className="movietitle">
          {movie.title}
          <a className="source" href={movie.source} target="_blank">
            {getPortalIcon()}
          </a>
        </p>
        {movie.description}
      </div>
    </>
  );
}

export default MovieContent;
