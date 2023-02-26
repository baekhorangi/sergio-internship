import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import ItemCard from "../UI/ItemCard";

const NewItems = () => {
  const [items, setItems] = useState([]);

  const fetchNewItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  const carouselOptions = {
    loop: true,
    nav: true,
    items: 4,
    margin: 10,
    responsive: {
      1200: { items: 4 },
      768: { items: 3 },
      470: { items: 2 },
      0: { items: 1 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.length ? (
            <ReactOwlCarousel {...carouselOptions}>
              {items.map((item) => (
                <ItemCard item={item} carousal key={item.id} />
              ))}
            </ReactOwlCarousel>
          ) : (
            <>
              <ReactOwlCarousel {...carouselOptions}>
                {new Array(6).fill(0).map((_, index) => (
                  <ItemCard carousal key={index} />
                ))}
              </ReactOwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
