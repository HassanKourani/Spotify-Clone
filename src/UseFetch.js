import { useEffect, useState } from "react";

const UseFetch = (url, options) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, [url]);
  return { data };
};

export default UseFetch;
