import ButtonSidebar from "./ButtonSidebar";

export default function Sidebar() {
  return (
    <>
      <div className="flex px-4 py-3 text-white">
        <div className="flex flex-col gap-8 mt-2">
          <ButtonSidebar icon="fa-solid fa-house" name="Home" />
          <ButtonSidebar icon="fa-solid fa-earth-europe" name="Explore" />
          <ButtonSidebar icon="fa-solid fa-gear" name="Settings" />
          <ButtonSidebar icon="fa-solid fa-user" name="Profile" />
          <ButtonSidebar icon="fa-solid fa-bell" name="Notification" />
        </div>
      </div>
    </>
  );
}
