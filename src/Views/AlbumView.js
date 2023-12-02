// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavButtons from './NavButtons.js';

function AlbumView() {
  const [albumData, setAlbumData] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:4000/song/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      const songs = data.results.filter((item) => item.wrapperType === "track");
      setAlbumData(songs);
    };
    fetchData();
  }, [id]);
  const songDisplay = albumData.map((song) => {
    return (
      <div key={song.trackId}>
        <p>{song.trackName}</p>{" "}
      </div>
    );
  });

  
  return (
    <div>
      {" "}
      <NavButtons />
      <p>Album Data Goes Here!</p>
       <p>ID: {id}</p> 
      {songDisplay}{" "}
    
    </div>
  );
}
export default AlbumView;
