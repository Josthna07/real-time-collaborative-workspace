import Sidebar from "../components/auth/board/common/Sidebar";
import Navbar from "../components/auth/board/common/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;