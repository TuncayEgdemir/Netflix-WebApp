import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toogleFavorites = useCallback(async () => {
    let response;

     console.log("isFavor", isFavorite);
     
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
     console.log("response", response);
    } else {
      console.log("isFavor", isFavorite);
      response = await axios.post("/api/favorite", { movieId });
    }
    
    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId , isFavorite , currentUser , mutate , mutateFavorites]);
  
  return (
    <div
      onClick={toogleFavorites}
      className="
            cursor-pointer
            group/item
            w-6
            h-6
            lg:w-10
            lg:h-10
            border-white
            border-2
            rounded-full
            flex
            justify-center
            items-center
            transition
            hover:bg-neutral-700
        "
    >
      <AiOutlinePlus size={30} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
