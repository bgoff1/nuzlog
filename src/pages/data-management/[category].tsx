import { useParams } from "@solidjs/router";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <>
      <div>something goes here {category}</div>
    </>
  );
};

export default CategoryPage;
