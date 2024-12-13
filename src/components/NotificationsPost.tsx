export default function NotificationsComment() {
  return (
    <>
      <div className="border-b border-b-gray-500 h-32 flex flex-col justify-center gap-4">
        <div className="flex mx-4 gap-3 items-center">
          <i className="fa-solid fa-heart text-red-500 text-2xl"></i>
          <div className="w-8 h-8 border rounded-full"></div>
        </div>
        <p className="mx-4 text-white">
          <span className="text-white font-medium">Username</span> liked your
          post
        </p>
        {/* <p className="text-white">
                You don't have any notifications yet. When other people interact
                with you, you will see it here.
              </p> */}
      </div>
      
    </>
  );
}
