import React, { useState } from "react";
import "./ShopMenu.css";
import menuData from "./menuData";

export default function ShopMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Ice Cream");

  const categoryDescriptions = {
    "Ice Cream": "Premium handcrafted ice creams with authentic flavors",
    "Sundaes": "Delicious sundaes with toppings and premium ice cream",
    "Thick Shakes": "Rich and creamy thick shakes with premium ingredients",
    "Milk Shakes": "Refreshing milk shakes with natural flavors",
    "Lassi": "Traditional yogurt-based drinks with authentic taste",
    "Falooda": "Classic falooda with vermicelli, basil seeds, and ice cream",
    "Shrikhand": "Traditional Gujarati sweet made with hung curd",
    "Liquid Sweet": "Unique liquid desserts with rich flavors",
    "Kulfi": "Traditional Indian frozen dessert with authentic taste"
  };

  const renderTableLayout = (items, isIceCream = false) => (
    <div className={`price-table ${isIceCream ? 'grid-layout' : 'fixed-columns'}`}>
      <div className="price-header">
        <span className="price-name">Item</span>
        {isIceCream ? (
          <>
            <span className="price-qty">100ml</span>
            <span className="price-qty">500ml</span>
            <span className="price-qty">1000ml</span>
          </>
        ) : (
          <span className="price-qty">Price</span>
        )}
      </div>
      
      {isIceCream ? (
        items.map((item, index) => (
          <div key={index} className="price-row">
            <span className="price-name">{item.name}</span>
            {['100ml', '500ml', '1L'].map((qty) => {
              const variant = item.variants?.find(v => v.quantity === qty);
              return (
                <span key={qty} className="price-qty">
                  {variant ? `₹${variant.price}` : '-'}
                </span>
              );
            })}
          </div>
        ))
      ) : (
        [...items]
          .sort((a, b) => b.price - a.price)
          .map((item, index) => (
            <div key={index} className="price-row">
              <span className="price-name">{item.name}</span>
              <span className="price-qty">₹{item.price}</span>
            </div>
          ))
      )}
    </div>
  );

  const renderCardLayout = (items) => (
    <div className="items-grid">
      {items.map((item, index) => (
        <div key={index} className="card">
          <div className="card-content">
            <span className="item-name">{item.name}</span>
            <ul className="variant-list">
              {item.variants.map((variant, vIdx) => (
                <li key={vIdx} className="variant">
                  <span className="variant-quantity">{variant.quantity}</span>
                  <span className="variant-price">₹{variant.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );

  const renderColumnLayout = (items) => (
    <div className={`price-table fixed-columns`}>
      <div className="price-header">
        <span className="price-name">Item</span>
        <span className="price-qty">Price</span>
      </div>
      
      {[...items]
        .sort((a, b) => b.price - a.price)
        .map((item, index) => (
          <div key={index} className="price-row">
            <span className="price-name">{item.name}</span>
            <span className="price-qty">₹{item.price}</span>
          </div>
        ))}
    </div>
  );

  const renderCategoryContent = (category, items) => {
    switch (category) {
      case "Ice Cream":
      case "Liquid Sweet":
        return renderTableLayout(items, true);
      case "Shrikhand":
        return renderCardLayout(items);
      default:
        return renderColumnLayout(items);
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <img src="/shop_icon.jpg" alt="Shop Logo" className="menu-logo" />
        <h1 className="shop-title">Shree Satyanarayan Ice Cream</h1>
        <p className="shop-subtitle">Scoops of Happiness in Every Bite.</p>
      </div>

      <div className="tabs">
        <div className="tabs-list">
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="tabs-content">
          {Object.entries(menuData).map(([category, items]) => (
            <div key={category} className={`tab-panel ${selectedCategory === category ? 'active' : ''}`}>
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
                <p className="category-description">{categoryDescriptions[category]}</p>
              </div>
              
              {renderCategoryContent(category, items)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}