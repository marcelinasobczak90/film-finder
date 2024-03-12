function MovieTitleInput(props) {
  const { title, setTitle, isUploading } = props;

  return (
    <input
      type="text"
      placeholder="MOVIE TITLE"
      className="movieform-title"
      value={title}
      onChange={(e) => setTitle(e.target.value)} //INPUT FIELDS!!!!
      disabled={isUploading}
    />
  );
}

export default MovieTitleInput;
