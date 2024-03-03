/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import { fetchJikanApi } from "../../services/JikanApi";

// Context
import { useSearchAnimeContext } from "../../context/AnimeContext";

// Components
import AnimeList from "../../components/AnimeList";
import Pagination from "../../components/Pagination";

export default function SearchAnime() {
  const { keyword } = useParams();
  const { state, dispatch } = useSearchAnimeContext();
  const [fetched, setFetched] = useState(true);

  async function fetchSearchAnime() {
    setFetched(false);
    const response = await fetchJikanApi(
      `/anime?page=${state.currentPage}&q=${keyword}`,
    );
    dispatch({
      type: "fetchAnime",
      anime: response.data,
      currentPage: response.pagination.current_page,
      maxPage: response.pagination.last_visible_page,
    });
    setFetched(true);
  }

  function handleClickPagination(type, jumpTarget) {
    if (type === "jump") {
      dispatch({ type: "resetAnime" });
      dispatch({ type: "changePage", currentPage: jumpTarget });
    }
    if (type === "prev") {
      if (state.currentPage === 1) return;
      dispatch({ type: "resetAnime" });
      dispatch({
        type: "changePage",
        currentPage: state.currentPage === 1 ? 1 : state.currentPage - 1,
      });
    } else if (type === "next") {
      if (state.currentPage === state.maxPage) return alert("No More Page");
      dispatch({ type: "resetAnime" });
      dispatch({
        type: "changePage",
        currentPage:
          state.currentPage >= state.maxPage
            ? state.currentPage
            : state.currentPage + 1,
      });
    }
  }

  useEffect(() => {
    if (state.anime.length === 0) fetchSearchAnime();
  }, [keyword, state.currentPage]);

  const noteStyles =
    "text-xl text-grayWhite text-center mt-4 font-montserrat font-bold";

  if (fetched && !state.anime.length) {
    return <div className={noteStyles}>{keyword} tidak ditemukan</div>;
  }

  return (
    <div>
      {fetched && state.anime.length > 0 && (
        <div className={noteStyles}>Hasil pencarian {keyword}</div>
      )}

      <AnimeList animeData={state.anime} />
      {!state.anime.length ? (
        ""
      ) : (
        <Pagination
          currentPage={state.currentPage}
          maxPage={state.maxPage}
          onClick={(type, jumpTarget) =>
            handleClickPagination(type, jumpTarget)
          }
        />
      )}
    </div>
  );
}
