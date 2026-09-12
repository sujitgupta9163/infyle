import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileBottomNav from "./MobileBottomNav";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white font-sans bg-transparent transition-colors duration-500 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full lg:ml-60">
        <Header />
        <main className="flex-1 pb-20 lg:pb-0 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
