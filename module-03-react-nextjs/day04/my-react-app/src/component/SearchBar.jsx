function SearchBar({ searchTerm, setSearchTerm, inputRef }) {
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search dishes..."
        aria-label="Search dishes"
      />
    </div>
  );
}

export default SearchBar;