import React from "react";

const TextFormatter = (props) => {
  let text = props.text;
  return <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>;
};
export default TextFormatter;
