export default function CardPost() {
  return (
    <>
      <div className="p-4 border-b border-gray-500 h-auto">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center my-1">
            <div className="flex gap-2">
              {/* img */}
              <div className="w-12 h-12 bg-white rounded-lg"></div>
              <div className="flex flex-col text-gray-400">
                <p>Name</p>
                <p>id</p>
              </div>
            </div>
            <div className="text-gray-400">
              <p>3h</p>
            </div>
          </div>
          <div className="flex text-justify text-white ">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              quidem quas perferendis molestiae illum voluptate harum sapiente
              veritatis commodi labore.
            </p>
          </div>
          <div className="w-full h-auto">
            <img src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />
          </div>
        </div>
      </div>
    </>
  );
}
