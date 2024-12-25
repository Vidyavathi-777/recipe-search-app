import React, { useEffect, useState } from "react";
import Products from "./products";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);


  const YOUR_APP_ID = "e658e2e7";
  const YOUR_APP_KEY = "0bece72cbb7c1b446acfacd1ee1516ba";

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  },[]);

  useEffect(() =>{
    localStorage.setItem("favorites",JSON.stringify(favorites));
  },[favorites]);


  const submitHandler = (e) => {
    e.preventDefault();
    fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=12&calories=591-722&health=alcohol-free`
    )
      
      .then((response) => response.json())
      .then((data) => setData(data.hits))
      .catch((error) => console.error("Error fetching data:", error));
      
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.label === recipe.label)){
      setFavorites([...favorites,recipe]);
      alert(`${recipe.label} has been added to your favorites`)

    }else{
      alert( `${recipe.label}Recipe is already in favorites! `);
    }
  };

  const removeFavorites = (recipelabel) => {
    setFavorites(favorites.filter((fav) => fav.label !== recipelabel));
    alert(`${recipelabel} has been removed from your favorites.`)
  };


  return (
    <div className="box">
      <center>
        <h4>Food Recipe App</h4>
        <form  className="search-container" onSubmit={submitHandler}>
          <input
            className="container"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
          <br />
          <input  className="btn" type="submit" value="Search" />
        </form>
        {data.length > 0 ? (<Products data={data} addToFavorites={addToFavorites}  isFavorite={false} />):(<p>No result found</p>)}
        <h4>Favorites</h4>
        {favorites.length > 0 ? (<Products data = {favorites.map((fav) => ({recipe:fav}))} removeFavorites={removeFavorites} isFavorite={true} /> ) : (<p>No Favorites added yet</p>) }
      </center>
    </div>
  );
}

export default App;
