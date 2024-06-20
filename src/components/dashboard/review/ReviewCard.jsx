import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FaTrashCan } from "react-icons/fa6";
import { Avatar, Rating } from "flowbite-react";
import { useQueryClient } from "@tanstack/react-query";

import usePostData from "../../../hooks/usePostData";
import useAuth from "../../../hooks/useAuth";
import PopUpModal from "../../PopUpModal";

const ReviewCard = ({ review }) => {
  const { _id, userName, userImage, reviewMessage, reviewDate, rating, more } =
    review || {};
  const { universityName, subjectCategory } = more || {};
  const [deleteModal, setDeleteModal] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteReviewMutation } = usePostData();

  const handleDelete = async () => {
    const obj = {
      method: "delete",
      url: `reviews/adminOrMod/${_id}?uid=${user.uid}`,
    };
    try {
      const resDB = await deleteReviewMutation(obj);
      if (resDB.data?.deletedCount) {
        setDeleteModal(false);
        queryClient.invalidateQueries([
          "myReviews, myApplications, scholarships",
        ]);
        return toast.success("Review Deleted");
      }
    } catch (error) {
      // console.log(error);
      return toast.error("Failed! Try again");
    }
  };
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white relative">
      <div className="flex items-center justify-between">
        <Avatar img={userImage} rounded className="justify-start">
          <div className="space-y-1 font-medium">
            <div>{userName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {reviewDate}
            </div>
          </div>
        </Avatar>
        <Rating>
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {rating}
          </p>
          <Rating.Star className="text-gray-500 dark:text-gray-400" />
        </Rating>
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight">
        {universityName} <br />
        <span className="text-sm font-semibold">{subjectCategory}</span>
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 justify-between max-h-32 overflow-y-auto">
        {reviewMessage}
      </p>
      <button
        onClick={() => setDeleteModal(true)}
        className="absolute bottom-5 right-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        <FaTrashCan />
      </button>
      {deleteModal && (
        <PopUpModal
          modalState={deleteModal}
          toggleModal={setDeleteModal}
          onClick={handleDelete}
          typeDelete={true}
        />
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewCard;
