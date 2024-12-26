import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../assets/img/LogoChatter.png";
import { useUser } from "../UserContext";
import { useState } from "react";
import axios from "axios";

export default function EditProfile() {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate();
  const [id, setid] = useState(user ? user.id : "");
  const [name, setName] = useState(user ? user.name : "");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [headerPicture, setHeaderPicture] = useState(null);
  const [error, setError] = useState(""); 

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null); // Update context to null
    navigate("/", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      setError("User not authenticated. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const formData = new FormData();
      if (id) formData.append("id", id);
      if (name) formData.append("name", name);
      if (password) formData.append("password", password);
      if (profilePicture) formData.append("profile_picture", profilePicture);
      if (headerPicture) formData.append("header_picture", headerPicture);

      const response = await axios.put(
        "https://api-chatter-tau.vercel.app/api/auth/edit-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`, // Sertakan token
          },
        }
      );

      if (response.status === 200) {
        alert("Profil berhasil diperbarui.");
        // Update user context dengan data terbaru
        setUser({
          ...user,
          name: name || user.name,
          profile_picture: response.data.updatedFields?.profile_picture || user.profile_picture,
          header_picture: response.data.updatedFields?.header_picture || user.header_picture,
        });

        navigate("/"); // Redirect ke halaman profil
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(
        error.response?.data?.error || "Terjadi kesalahan saat memperbarui profil."
      );
    }
  };


  return (
    <section className="h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex h-4/5 w-4/5">
        {/* Sidebar Left */}
        <div className="w-1/4 flex flex-col gap-8">
          <div className="flex justify-center">
            <img src={imgLogo} alt="logo-chatter" className="w-28" />
          </div>
          <ul className="text-gray-300 flex flex-col gap-2">
            <li className="hover:text-white">
              <Link to="/home">
                <i className="fa-solid fa-arrow-left mr-2"></i> Back to Chatter
              </Link>
            </li>
            <li className="hover:text-white">
              <button onClick={handleLogout} className="flex items-center">
                <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i>{" "}
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Content Edit Profile */}
        <div className="flex flex-col w-3/4 p-6 ">
          <h2 className="text-white text-2xl mb-4">Edit Profile</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Id User */}
            <div>
              <label className="text-gray-300">
                Id
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setid(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:placeholder:text-gray-500"
                placeholder="Your id"
              />
            </div>
            {/* Display Name */}
            <div>
              <label className="text-gray-300">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:placeholder:text-gray-500"
                placeholder="Your full name or fun name"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:placeholder:text-gray-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Profile Picture */}
            <div>
              <label className="text-gray-300" htmlFor="profilePicture">
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full p-2 rounded bg-gray-700 text-white"
                accept="image/png, image/jpeg, image/gif, image/webp"
              />
            </div>

            {/* Header Picture */}
            <div>
              <label className="text-gray-300" htmlFor="headerPicture">
                Header Picture
              </label>
              <input
                type="file"
                id="headerPicture"
                onChange={(e) => setHeaderPicture(e.target.files[0])}
                className="w-full p-2 rounded bg-gray-700 text-white"
                accept="image/png, image/jpeg, image/gif, image/webp"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
