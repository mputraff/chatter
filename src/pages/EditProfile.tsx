import { Link, useNavigate } from "react-router-dom";
import imgLogo from "../assets/img/LogoChatter.png";
import { useUser } from "../UserContext";
import { useState } from "react";

export default function EditProfile() {
  const { user, setUser } = useUser(); // Access user and setUser from context
  const navigate = useNavigate();

  // State untuk menyimpan input
  const [displayId, setDisplayId] = useState(user ? user.id : "");
  const [displayName, setDisplayName] = useState(user ? user.name : "");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [headerPicture, setHeaderPicture] = useState(null);
  const [error, setError] = useState(""); // State for error messages

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null); // Update context to null
    navigate("/", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("id", displayId);
    formData.append("name", displayName);
    formData.append("password", password);
    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }
    if (headerPicture) {
      formData.append("header_picture", headerPicture);
    }
  
    // Log FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await fetch("https://api-chatter-tau.vercel.app/api/auth/edit-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });      
  
      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated User:", updatedUser);
        setUser(updatedUser.data); // Ensure this matches the response structure
        navigate("/profile");
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
        setError(errorData.error || "Failed to update profile"); // Set error message
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while updating the profile."); // Set error message
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
              <label className="text-gray-300" htmlFor="displayId">
                Id
              </label>
              <input
                type="text"
                id="displayId"
                value={displayId}
                onChange={(e) => setDisplayId(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:placeholder:text-gray-500"
                placeholder="Your id"
              />
            </div>
            {/* Display Name */}
            <div>
              <label className="text-gray-300" htmlFor="displayName">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
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
