import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../UI/ItemCard";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [shownItems, setShownItems] = useState(8);

  const fetchExploreItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setItems(data);
  };

  const fetchFilteredItems = async (filter) => {
    setItems([]);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter.target.value}`
    );
    setItems(data);
  };

  useEffect(() => {
    fetchExploreItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={fetchFilteredItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length
        ? items
            .slice(0, shownItems)
            .map((item) => <ItemCard item={item} key={item.id} />)
        : new Array(shownItems)
            .fill(0)
            .map((_, index) => <ItemCard key={index} />)}

      {shownItems < items.length && (
        <div
          className="col-md-12 text-center"
          onClick={() => setShownItems(shownItems + 4)}>
          <Link to="" id="loadmore" className="btn-main lead">
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
