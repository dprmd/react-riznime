// Context
import { useMangaModeContext } from "../../context/MangaContext";

export default function MangaModeToggle() {
  const { state, dispatch } = useMangaModeContext();

  function handleMangaClick() {
    dispatch({ type: "changeMangaMode", mangaMode: !state.mangaMode });
  }

  return (
    <div className="flex items-center mr-4">
      <span
        className={`mr-2 font-bold ${state?.mangaMode ? "text-yellow-300" : "text-yellow-800"}`}
      >
        Manga
      </span>
      <button
        type="button"
        className={`outline-none border-style-none w-10 h-5 bg-slate-600 rounded-full overflow-hidden flex ${state?.mangaMode ? "justify-end" : "justify-start"}`}
        onClick={handleMangaClick}
      >
        <button
          type="button"
          className="outline-none border-style-none w-5 h-5 rounded-full bg-white"
        ></button>
      </button>
    </div>
  );
}
