import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [followStatus, setFollowStatus] = useState("Follow");

  const fetchAuthor = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
    setFollowers(data.followers);
    setAuthor(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
  }, []);

  const handleFollow = () => {
    if (followStatus === "Follow") {
      setFollowStatus("Unfollow");
      setFollowers(followers + 1);
    } else {
      setFollowStatus("Follow");
      setFollowers(followers - 1);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {author ? (
                        <img src={author.authorImage} alt="" data-aos="fade" />
                      ) : (
                        <Skeleton
                          width={"150px"}
                          height={"150px"}
                          borderRadius={"100%"}
                        />
                      )}

                      <i className="fa fa-check" data-aos="fade"></i>
                      <div className="profile_name">
                        <h4 data-aos="fade-up" data-aos-delay="250">
                          {author ? (
                            author.authorName
                          ) : (
                            <Skeleton width={"200px"} />
                          )}
                          <span className="profile_username">
                            {author ? author.tag : <Skeleton width={"100px"} />}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author ? (
                              author.address
                            ) : (
                              <Skeleton width={"200px"} />
                            )}
                          </span>
                          {author && (
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() =>
                                navigator.clipboard.writeText(author.address)
                              }>
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div
                        className="profile_follower"
                        data-aos="fade-right"
                        data-aos-delay="500">
                        {author ? (
                          followers + " followers"
                        ) : (
                          <Skeleton width={"150px"} height={"40px"} />
                        )}{" "}
                      </div>
                      {author && (
                        <Link
                          to="#"
                          className="btn-main"
                          onClick={handleFollow}
                          data-aos="fade-left"
                          data-aos-delay="500">
                          {followStatus}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div
                  className="de_tab tab_simple"
                  data-aos="fade"
                  data-aos-delay="750">
                  <AuthorItems author={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
