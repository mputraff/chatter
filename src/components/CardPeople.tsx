import { Link } from "react-router-dom";

export default function CardPeople({ person }) { // Menerima person sebagai prop
  return (
    <>
      <div className="p-4 border-b border-gray-500 h-24 flex ">
        <Link to={`/profile/${person.id}`} className="flex items-center"> {/* Link ke halaman profil */}
          <div className="w-10 h-10 bg-white rounded-lg overflow-hidden">
            <img src={`https://api-chatter-tau.vercel.app/${person.profile_picture}`} alt={person.name} className="w-full h-full object-cover" /> {/* Gambar profil */}
          </div>
          <div className="flex flex-col ml-2">
            <p className="text-white">{person.name}</p> {/* Nama pengguna */}
            <p className="text-gray-500">{person.id}</p> {/* ID pengguna */}
          </div>
        </Link>
      </div>
    </>
  );
}
