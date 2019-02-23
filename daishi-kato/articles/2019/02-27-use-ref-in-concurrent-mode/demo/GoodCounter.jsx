import React, { useEffect, useRef } from "react";

const GoodCounter = () => {
  const count = useRef(0);
  let currentCount = count.current;
  useEffect(() => {
    count.current = currentCount;
  });
  currentCount += 1;
  return <div>count:{currentCount}</div>;
};

export default GoodCounter;
