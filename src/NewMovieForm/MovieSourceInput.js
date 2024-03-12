function MovieSourceInput(props) {
  const { source, setSource, isUploading } = props;
  return (
    <input
      type="text"
      className="movieform-source"
      placeholder="SOURCE LINK"
      value={source}
      onChange={(e) => setSource(e.target.value)}
      disabled={isUploading}
    />
  );
}

export default MovieSourceInput;
