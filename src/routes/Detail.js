import React, { useEffect } from "react";
import "./Detail.css";

const Detail = props => {
  const { location, history } = props;

  useEffect(() => {
    if (location.state === undefined) {
      history.push("/");
    }
  });

  return location.state ? (
    <div className="detail">
      <span>{location.state.title}</span>
      <span>{location.state.year}</span>
      <span>{location.state.summary}</span>
    </div>
  ) : null;
};

export default Detail;
