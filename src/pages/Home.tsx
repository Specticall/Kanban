import Board from "../components/Board/BoardComponents/Board";
import Navbar from "../components/Navbar";
import { HomeProvider } from "../context/HomeContext";
import { NavbarProvider, useNavbar } from "../context/NavbarContext";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { ChildrenProp } from "../types/generalTypes";
// import Popuplayout from

export default function Home() {
  return (
    <HomeProvider>
      <NavbarProvider>
        <HomeLayout>
          <Board />
        </HomeLayout>
      </NavbarProvider>
    </HomeProvider>
  );
}

function HomeLayout({ children }: ChildrenProp) {
  const { showSidebar } = useNavbar();
  const { screenType } = useViewportWidth();
  return (
    <>
      <div
        className={`grid ${
          showSidebar && screenType === "desktop"
            ? "grid-cols-[18.75rem_minmax(0_,1fr)]"
            : "grid-cols-[minmax(0_,1fr)]"
        } min-h-screen overflow-hidden h-full`}
      >
        {showSidebar && <Navbar />}
        {children}
      </div>
    </>
  );
}
