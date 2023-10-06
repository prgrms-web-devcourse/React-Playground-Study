import Image from "next/image";
import { CatImage, DoubleLeftArrow } from "~/assets";
import Posts from "~/components/posts";

const Home = () => {
  return (
    <main className="flex">
      <article className="w-64 min-h-screen bg-[#fbfbfa]">
        <section className="flex p-4 items-center">
          <Image
            className="w-5 aspect-square object-cover rounded-full mr-4"
            src={CatImage}
            alt="프로필 이미지"
          />
          <span>backward99</span>
          <DoubleLeftArrow className="ml-auto" size={15} />
        </section>
        <Posts />
      </article>
    </main>
  );
};

export default Home;
