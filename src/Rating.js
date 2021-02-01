import React from "react";

function Rating({ rating }) {
  const remaining = parseInt(5 - rating);

  return (
    <>
      {rating % parseInt(rating) === 0
        ? Array(rating)
            .fill()
            .map(() => <li className="fa fa-star"></li>)
        : Array(rating - 0.5)
            .fill()
            .map(() => <li className="fa fa-star"></li>)}
      {rating % parseInt(rating) !== 0 && (
        <li className="fa fa-star-half-o"></li>
      )}

      {remaining !== 0 &&
        Array(remaining)
          .fill()
          .map(() => <li className="fa fa-star-o"></li>)}
    </>
  );
}

export default Rating;
