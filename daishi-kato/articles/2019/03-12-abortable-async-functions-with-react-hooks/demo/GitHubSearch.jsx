import React from "react";

import { useAsyncCombineSeq, useAsyncRun } from "react-hooks-async";
import { useAsyncTaskDelay } from "react-hooks-async/dist/use-async-task-delay";
import { useAsyncTaskFetch } from "react-hooks-async/dist/use-async-task-fetch";

const Err = ({ error }) => (
  <div>Error:{error.name}{" "}{error.message}</div>
);

const Loading = ({ abort }) => (
  <div>Loading...<button type="button" onClick={abort}>Abort</button></div>
);

const GitHubSearch = ({ query }) => {
  const url = `https://api.github.com/search/repositories?q=${query}`;
  const delayTask = useAsyncTaskDelay(500, [query]);
  const fetchTask = useAsyncTaskFetch(url);
  const combinedTask = useAsyncCombineSeq(delayTask, fetchTask);
  useAsyncRun(combinedTask);
  if (delayTask.pending) return <div>Waiting...</div>;
  if (fetchTask.error) return <Err error={fetchTask.error} />;
  if (fetchTask.pending) return <Loading abort={fetchTask.abort} />;
  return (
    <ul>
      {fetchTask.result.items.map(({ id, name, html_url }) => (
        <li key={id}><a target="_blank" rel="noreferrer noopener" href={html_url}>{name}</a></li>
      ))}
    </ul>
  );
};

export default GitHubSearch;
