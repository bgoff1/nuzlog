import { createResource } from "solid-js";
import { fetchFunction } from "../../api/cached-fetch";

const Page = () => {
  const [data] = createResource(() => fetchFunction("/pokemon", {}));

  return <pre class="overflow-y-auto">{JSON.stringify(data(), null, 2)}</pre>;
};
export default Page;
