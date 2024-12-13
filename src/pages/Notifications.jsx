import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NotificationsComment from "../components/NotificationsPost";

export default function Notifications() {
  return (
    <>
      <section className="h-screen bg-gray-950 scrollbar-hide overflow-auto">
        <Navbar onClick={() => {}} />
        <div className="h-screen flex gap-2 max-lg:gap-0 justify-center">
          <div className="flex flex-col max-md:hidden w-1/5 max-md:w-full max-lg:w-6/12 xl:mt-3">
            <div className="py-3 px-4 text-white flex bg-gray-900 rounded-lg">
              <div className="flex w-full items-center border-gray-600 border py-2 px-3 rounded-lg">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none bg-transparent w-full"
                />
                <i className="fa-solid fa-magnifying-glass ml-2 text-gray-400"></i>
              </div>
            </div>
            <NewPost />
          </div>

          <div className="flex flex-col w-5/12 xl:border xl:border-gray-500 max-lg:border-x max-md:border-r max-md:border-l-0 max-lg:w-full max-lg:border-gray-500 xl:rounded-md xl:mt-3 ">
            <div className="py-3 px-4 text-white flex border-b border-gray-500">
              <button className="text-lg">
                <i className="fa-solid fa-bell mr-2"></i> Notifications
              </button>
            </div>

            <div className="overflow-auto scrollbar-hide ">
              <NotificationsComment />
              <NotificationsComment />
              <NotificationsComment />
              <NotificationsComment />
              <NotificationsComment />
              <NotificationsComment />
            </div>
            
          </div>

          {/* Sidebar */}
          <div className="max-md:block max-md:h-full max-lg:w-16 w-1/6">
            <Sidebar />
          </div>
        </div>
      </section>
    </>
  );
}
