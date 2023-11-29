import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./Components/Gallery";
import SearchBar from './Searchbar.js';
import AlbumView from "./Views/AlbumView";
import ArtistView from "./Views/ArtistView";

function App() {
  let [search, setSearch] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState([]);

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        const url = encodeURI(`https://itunes.apple.com/search?term=${search}`);
        const response = await fetch(url);
        const data = await response.json();
        if (data.results.length > 0) {
          setData(data.results);
        } else {
          setData([]);
          setMessage("Not Found");
        }
      };
      fetchData();
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar handleSearch={handleSearch} />
                <Gallery data={data} />
              </>
            }
          />
          <Route path='/album/:id' element={<AlbumView />} />
          <Route path='/artist/:id' element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
