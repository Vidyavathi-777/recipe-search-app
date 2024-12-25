import React from "react";
import "./App.css";

const Products = ({ data, addToFavorites, removeFavorites, isFavorite }) => {
  const handleBuyNow = (productName, price) => {
    alert(`You have selected to buy: ${productName} for $${price}`);
   
  };



  return (
    <div className="product-container">
      {data.map((item, index) => {
        const price = (Math.random() * (50 - 10) + 10).toFixed(2);

        return (
          <div className="product-card" key={`${item.recipe.uri}-${index}`}>
            <h5>{item.recipe.label}</h5>
            <img src={item.recipe.image} alt={item.recipe.label} />
            <p>Calories: {Math.round(item.recipe.calories)}</p>
            <p>
              <strong>Price:</strong> ${price}
            </p>
            <h6>Ingredients</h6>
            <ul>
              {item.recipe.ingredientLines.map((ingredient,idx)=>(
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            {isFavorite ? (<button className="btn" onClick={() => removeFavorites(item.recipe.label)} >Remove From Favorites</button>):(<button className="btn" onClick={() => addToFavorites(item.recipe)}>Add to Favorites</button>)}

            <button className="btn" onClick={() => handleBuyNow(item.recipe.label, price)}>
              Buy Now
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
