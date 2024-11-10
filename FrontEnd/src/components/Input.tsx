export default function Input({icon, placeholder, type}) {
  return (
    <div className="flex p-3 items-center gap-3 bg-cyan-900 border-2 border-cyan-700 rounded-xl">
      <i className= {`text-white ml-2 ${icon}`}></i>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent placeholder:text-white outline-none w-full"
      />
    </div>
  );
}
