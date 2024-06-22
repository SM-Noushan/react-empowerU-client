import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import uploadImage from "../../utils/uploadImage";
import useModerator from "../../hooks/useModerator";
import validateImage from "../../utils/validateImage";
import FileInput from "../../components/form/FileInput";
import CommonInput from "../../components/form/CommonInput";
import SubmitButton from "../../components/form/SubmitButton";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer.jsx";

const MyProfile = () => {
  const { isAdmin, isAdminLoading } = useAdmin();
  const { isMod, isModLoading } = useModerator();
  const { user, loading, setLoading, updateProfileInfo } = useAuth();
  const [editProfile, setEditProfile] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  React.useEffect(() => {
    setValue("name", `${user?.displayName}`);
  }, []);

  const updateProfile = async (name, photoURL) => {
    try {
      await updateProfileInfo(name, photoURL);
      setLoading(false);
      return toast.success("Successfully updated");
    } catch (error) {
      setLoading(false);
      // console.log(error);
      return toast.error("Failed! Please try again");
    }
  };

  const handleOnSubmit = async (data) => {
    const { name, profileImage } = data;
    try {
      if (profileImage) {
        const res = await uploadImage(profileImage);
        if (res.data.success) {
          updateProfile(name, res.data.data.display_url);
        }
      } else {
        updateProfile(name, user?.photoURL);
      }
    } catch (error) {
      // console.log(error);
      return toast.error("Error! Please try again");
    }
  };
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: My Profile</title>
      </Helmet>

      {/* profile info */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-8">
        {/* mt-8 pt-4 */}
        <div className="flex flex-col items-center py-10">
          <img
            className="mb-3 rounded-full size-52 lg:size-72 shadow-lg object-cover object-center"
            src={user?.photoURL}
            alt="profile-image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.displayName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>

          {isAdminLoading || isModLoading ? (
            ""
          ) : (
            <div className="mt-4 md:mt-6 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg dark:bg-primary-600">
              {isAdmin.role
                ? "Role: Admin"
                : isMod.role
                ? "Role: Moderator"
                : "Hi"}
            </div>
          )}
        </div>
      </div>

      {/* edit profile */}
      <div className="grid text-center items-center p-8">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={(e) => {
              setEditProfile(e.target.checked);
            }}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
          <span className="ms-3 text-lg font-medium text-gray-900 dark:text-gray-300">
            Edit Profile
          </span>
        </label>

        {/* edit form */}
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="mx-auto max-w-[24rem] text-left pt-6 space-y-6"
        >
          {/* name */}
          <CommonInput
            label="Name"
            inputType="text"
            disable={!editProfile}
            {...register("name", {
              validate: (newName) => {
                const currentName = user?.displayName;
                const profileImage = watch("profileImage");
                const nameRegex =
                  /(^[a-zA-Z]{2,20}[a-zA-Z\s]{0,20}[a-zA-Z]{0,20}$)/;

                // Check if profile picture is being changed
                if (profileImage && profileImage.length > 0) return true;
                if (newName === currentName || !nameRegex.test(newName))
                  return "Enter valid name";
                return true;
              },
            })}
            error={errors?.name?.message}
          />

          {/* profile picture */}
          <FileInput
            label="Profile Picture"
            disable={!editProfile}
            {...register("profileImage", {
              validate: validateImage,
            })}
            error={errors?.profileImage?.message}
          />

          {/* update button */}
          <div className="form-control mt-6">
            <SubmitButton
              label="Update"
              dependencies={{ loading, editProfile }}
            />
          </div>
        </form>
      </div>
    </DashboardContainer>
  );
};

export default MyProfile;
