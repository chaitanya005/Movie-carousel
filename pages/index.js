import Head from "next/head";
import Carousel from "../components/Carousel";
import { Hero } from "../components/Hero";
import Navbar from "../components/Navbar";
import { getTopRatedMovies } from "./api/tmdb";

export default function Home({ topRatedMovies }) {
  return (
    <div>
      <Head>
        <title>Klimb - Movieflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-4">
        <Navbar />
        <Hero />
        <Carousel topRatedMovies={topRatedMovies.slice(0, 10)} />{" "}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const topRatedMovies = await getTopRatedMovies();
  return { props: { topRatedMovies: topRatedMovies } };
}
