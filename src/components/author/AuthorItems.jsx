import React from "react";
import ItemCard from "../UI/ItemCard";

const AuthorItems = ({ author }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {author
            ? author.nftCollection?.map((item) => (
                <ItemCard
                  key={item.id}
                  item={{
                    ...item,
                    authorId: author.authorId,
                    authorImage: author.authorImage,
                  }}
                />
              ))
            : new Array(8).fill(0).map((_, index) => <ItemCard key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
