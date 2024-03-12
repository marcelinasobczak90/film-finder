function MovieDescriptionInput(props) {
  const { description, setDescription, isUploading } = props;

  return (
    <input
      type="text"
      className="movieform-description"
      placeholder="SHORT DESCRIPTION (<200)"
      value={description}
      onChange={(e) => setDescription(e.target.value)} //INPUT FIELDS!!!!
      disabled={isUploading}
    />
  );
}

export default MovieDescriptionInput;
