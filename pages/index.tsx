import React from "react";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";
import Navbar from "@/components/Navbar";
import Bilboard from "@/components/Bilboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Home = () => {
  const {data : movies = []} = useMovieList();
  const {data : favorites = []} = useFavorites();
  const {isOpen , closeModal} = useInfoModal();
  return (   
    <>
    <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Bilboard />
      <div className="pb-40">
        <MovieList 
          data={movies}
          title="Trending Now"
        />
           <MovieList 
          data={favorites}
          title="My List"
        />
      </div>
    </>
  );
};

export default Home;
