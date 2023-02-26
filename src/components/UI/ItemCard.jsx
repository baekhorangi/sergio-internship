import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import Timer from "./Timer";

function ItemCard({ item, carousal }) {
  const card = (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to={`/author/${item && item.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top">
          {item ? (
            <img className="lazy" src={item.authorImage} alt="" />
          ) : (
            <Skeleton width={"50px"} height={"50px"} borderRadius={"100%"} />
          )}
          <i className="fa fa-check"></i>
        </Link>
      </div>

      {item && item.expiryDate && <Timer expiryDate={item.expiryDate} />}

      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <Link to={`/item-details/${item && item.nftId}`}>
          {item ? (
            <img
              src={item.nftImage}
              className="lazy nft__item_preview"
              alt=""
            />
          ) : (
            <Skeleton width={"100%"} height={"250px"} borderRadius={"8px"} />
          )}
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${item && item.nftId}`}>
          {item ? (
            <h4>{item.title}</h4>
          ) : (
            <Skeleton width={"180px"} height={"25px"} />
          )}
        </Link>
        <div className="nft__item_price">
          {item ? (
            item.price + " ETH"
          ) : (
            <Skeleton width={"100px"} height={"20px"} />
          )}
        </div>
      </div>
      <div className="nft__item_like">
        {item ? (
          <>
            <i className="fa fa-heart"></i>
            <span>{item.likes}</span>
          </>
        ) : (
          <Skeleton width={"30px"} height={"15px"} />
        )}
      </div>
    </div>
  );

  return !carousal ? (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}>
      {card}
    </div>
  ) : (
    card
  );
}

export default ItemCard;
