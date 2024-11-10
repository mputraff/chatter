export default function ButtonSidebar({icon, name}) {
  return (
    <>
      <button className="xl:flex xl:items-center xl:gap-2">
        <i className={`fa-solid ${icon}`}></i>
        <p className="max-lg:hidden">{name}</p>
      </button>
    </>
  );
}
