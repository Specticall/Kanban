import Board from "../components/Board/BoardComponents/Board";
import Navbar from "../components/Navbar";
import { HomeProvider, useHome } from "../context/HomeContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
// import Popuplayout from

export default function Home() {
  return (
    <HomeProvider>
      <HomeLayout />
    </HomeProvider>
  );
}

function HomeLayout() {
  const { showSidebar } = useHome();
  const { screenType } = useViewportWidth();
  return (
    <div
      className={`grid ${
        showSidebar && screenType === "desktop"
          ? "grid-cols-[18.75rem_minmax(0_,1fr)]"
          : "grid-cols-[minmax(0_,1fr)]"
      } min-h-screen overflow-hidden`}
    >
      {showSidebar && <Navbar />}
      <Board />
    </div>
  );
}
