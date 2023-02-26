import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();

  const fetchItem = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
    );
    setItem(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      fetchItem();
    }, 1000);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {item ? (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width={"100%"} height={"100%"} />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {item ? (
                    <h2>{item.title}</h2>
                  ) : (
                    <Skeleton width={"300px"} height={"40px"} />
                  )}

                  <div className="item_info_counts">
                    {item ? (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {item.likes}
                        </div>
                      </>
                    ) : (
                      <>
                        <Skeleton width={"80px"} height={"30px"} />
                        <Skeleton width={"80px"} height={"30px"} />
                      </>
                    )}
                  </div>
                  {item ? (
                    <p>{item.description}</p>
                  ) : (
                    <Skeleton width={"100%"} height={"80px"} />
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width={"50px"}
                              height={"50px"}
                              borderRadius={"100%"}
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item?.ownerId}`}>
                              {item.ownerName}
                            </Link>
                          ) : (
                            <Skeleton width={"125px"} height={"20px"} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          ) : (
                            <Skeleton
                              width={"50px"}
                              height={"50px"}
                              borderRadius={"100%"}
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          ) : (
                            <Skeleton width={"125px"} height={"20px"} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {item ? (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{item?.price}</span>
                        </>
                      ) : (
                        <Skeleton width={"75px"} height={"20px"} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
