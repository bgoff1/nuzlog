import { Link } from "../components/common/Link";

const Fallback = () => {
  return (
    <main class="grid h-screen place-content-center gap-y-8 px-4">
      <div class="flex items-center gap-4">
        <div class="flex h-full items-center">
          <h1 class="text-5xl uppercase">404</h1>
        </div>
        <div class="border-l pl-3 text-xl">
          <h2>Something's missing!</h2>
          <h2>We can't find that page.</h2>
        </div>
      </div>

      <Link href="/" class="btn btn-outline btn-primary w-full">
        Go Back Home
      </Link>
    </main>
  );
};

export default Fallback;
