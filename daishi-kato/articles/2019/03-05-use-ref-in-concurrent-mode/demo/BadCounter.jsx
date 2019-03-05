import React, { useRef } from "react";

const BadCounter = () => {
  const count = useRef(0);
  count.current += 1;
  return <div>count:{count.current}</div>;
};

export default BadCounter;
