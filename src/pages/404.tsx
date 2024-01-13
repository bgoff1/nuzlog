import { Link } from "../components/common/Link";

const Fallback = () => {
  return (
    <div class="grid h-screen place-content-center gap-y-8 px-4">
      <div class="flex items-center gap-4 text-4xl">
        <h1 class="uppercase">404</h1>
        <div class="border-l pl-3">
          <h2>Something's missing</h2>
          <h2>We can't find that page.</h2>
        </div>
      </div>

      <Link href="/" class="btn btn-outline btn-primary w-full">
        Go Back Home
      </Link>
    </div>
  );
};

export default Fallback;
