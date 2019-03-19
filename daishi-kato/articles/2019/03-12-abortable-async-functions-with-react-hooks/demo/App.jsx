import React, {
  useState,
  unstable_ConcurrentMode as ConcurrentMode
} from "react";

import GitHubSearch from "./GitHubSearch";                

const App = () => {
  const [query, setQuery] = useState("");
  return (
    <ConcurrentMode>
      <div>
        Query:<input value={query} onChange={e => setQuery(e.target.value)} />
        {query && <GitHubSearch query={query} />}
      </div>
    </ConcurrentMode>
  );
};

export default App;
