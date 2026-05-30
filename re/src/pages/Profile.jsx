import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import API from "../services/api";

function Profile() {

    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState({
        full_name: "",
        bio: "",
        college: "",
        skills: "",
        profile_image: "",
    });

    const fetchProfile = async () => {

        try {

            const response = await API.get(
                "/study/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfile(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const updateProfile = async () => {

        try {

            await API.put(
                "/study/profile/update/",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(
                "Profile Updated 🚀"
            );

        } catch {

            toast.error(
                "Update Failed ❌"
            );
        }
    };

    return (
        <motion.div

            initial={{
                opacity: 0
            }}

            animate={{
                opacity: 1
            }}

            className="
        min-h-screen
        bg-gray-100
        dark:bg-slate-950

        text-black
        dark:text-white

        p-6
      "
        >

            <div className="
        max-w-3xl
        mx-auto

        bg-white
        dark:bg-slate-800

        rounded-2xl
        shadow-xl

        p-8
      ">

                <div className="text-center">

                    <img
                        src={
                            profile.profile_image ||
                            "https://via.placeholder.com/150"
                        }
                        alt="profile"

                        className="
              w-32
              h-32

              rounded-full
              mx-auto

              object-cover

              border-4
              border-cyan-400
            "
                    />

                    <h1 className="
            text-3xl
            font-bold
            mt-5
          ">
                        {
                            profile.full_name ||
                            "Your Name"
                        }
                    </h1>

                </div>

                <div className="mt-8 space-y-5">

                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"

                        value={profile.full_name}

                        onChange={handleChange}

                        className="
              w-full
              p-3
              rounded-lg

              bg-gray-200
              dark:bg-slate-700
            "
                    />

                    <textarea
                        name="bio"
                        placeholder="Bio"

                        value={profile.bio}

                        onChange={handleChange}

                        className="
              w-full
              p-3
              rounded-lg

              bg-gray-200
              dark:bg-slate-700
            "
                    />

                    <input
                        type="text"
                        name="college"
                        placeholder="College"

                        value={profile.college}

                        onChange={handleChange}

                        className="
              w-full
              p-3
              rounded-lg

              bg-gray-200
              dark:bg-slate-700
            "
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills"

                        value={profile.skills}

                        onChange={handleChange}

                        className="
              w-full
              p-3
              rounded-lg

              bg-gray-200
              dark:bg-slate-700
            "
                    />

                    <input
                        type="text"
                        name="profile_image"
                        placeholder="Profile Image URL"

                        value={profile.profile_image}

                        onChange={handleChange}

                        className="
              w-full
              p-3
              rounded-lg

              bg-gray-200
              dark:bg-slate-700
            "
                    />

                    <motion.button

                        whileHover={{
                            scale: 1.05
                        }}

                        whileTap={{
                            scale: 0.95
                        }}

                        onClick={updateProfile}

                        className="
              w-full

              bg-cyan-500
              hover:bg-cyan-600

              p-3
              rounded-lg

              font-bold
            "
                    >
                        Save Profile
                    </motion.button>

                </div>

            </div>

        </motion.div>

    );
}

export default Profile;