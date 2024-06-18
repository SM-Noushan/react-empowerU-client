import { FaArrowRotateLeft, FaCircleExclamation } from "react-icons/fa6";
import ReactStarsRating from "react-awesome-stars-rating";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import moment from "moment";
import PropTypes from "prop-types";

import useAuth from "../../../hooks/useAuth";
import SubmitButton from "../../form/SubmitButton";
import usePostData from "../../../hooks/usePostData";
import TextAreaInput from "../../form/TextAreaInput";

const ReviewModal = ({ modalState, toggleModalState, scholarshipId }) => {
  const { user } = useAuth();
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    // setValue,
  } = useForm();
  const [ratingValue, setRatingValue] = useState(0);
  const [rated, setRated] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { mutateAsync: addReviewMutation } = usePostData();
  // const { mutateAsync: editReviewMutation } = usePostData();

  useEffect(() => {
    reset();
  }, [scholarshipId]);

  const handleFormSubmit = async (data) => {
    if (!rated) return;
    setLoading(true);
    const reviewDate = new moment().format("DD MMMM, YYYY");
    const userName = user?.displayName || "Anonymous";
    const userEmail = user?.email || "Anonymous";
    const userUID = user?.uid;
    const userImage = user?.photoURL;
    const updatedData = {
      ...data,
      rating: ratingValue,
      reviewDate,
      userName,
      userEmail,
      userUID,
      userImage,
      scholarshipId,
    };
    // console.log(updatedData);
    const obj = {
      method: "post",
      url: "reviews",
      data: updatedData,
    };
    try {
      const resDB = await addReviewMutation(obj);
      // console.log(resDB.data);
      if (resDB.data?.insertedId) {
        queryClient.invalidateQueries(["myApplications, scholarships"]);
        toggleModalState(false);
        reset();
        setRated(0);
        setRated(null);
        setIsEdit(true);
        toast.success("Review Added");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed! Try again.");
    }
    return setLoading(false);
  };

  return (
    <Modal
      show={modalState}
      size="md"
      onClose={() => toggleModalState(false)}
      popup
    >
      <Modal.Header>
        <span className="text-2xl font-medium text-gray-900 dark:text-white pl-4">
          Share Your Feedback
        </span>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          <div className="flex items-center gap-x-2.5">
            <ReactStarsRating
              className="flex"
              id="rating"
              value={ratingValue}
              onChange={(v) => {
                setRatingValue(v);
                setRated(true);
                setIsEdit(false);
              }}
              isEdit={isEdit}
              isHalf={true}
              count={5}
              size={25}
              starGap={2}
              primaryColor="orange"
              secondaryColor="grey"
              isArrowSubmit={false}
            />
            <button
              onClick={() => {
                setIsEdit(true);
                setRatingValue(0);
                setRated(null);
              }}
            >
              <FaArrowRotateLeft
                size={20}
                className="mt-1 hover:text-red-600"
              />
            </button>
          </div>
          {rated === false && (
            <span
              id="RatingErrorHelp"
              className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-x-1.5"
            >
              <span className="font-medium">
                <FaCircleExclamation />
              </span>
              Rating Required
            </span>
          )}

          {/* applicantName name */}
          <TextAreaInput
            label="Review Message"
            inputType="text"
            {...register("reviewMessage", {
              required: "Required",
              minLength: {
                value: 25,
                message: "Must be at least 25 characters long",
              },
            })}
            error={errors?.reviewMessage?.message}
          />
          <button type="submit" className="hidden" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton
          label="Review"
          //   label={edit ? "Update now" : "Apply now"}
          dependencies={{ loading }}
          onClick={() => {
            if (!rated) setRated(false);
            formRef.current.dispatchEvent(
              new Event("submit", {
                cancelable: true,
                bubbles: true,
              })
            );
          }}
        />
      </Modal.Footer>
    </Modal>
  );
};

ReviewModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  toggleModalState: PropTypes.func.isRequired,
  scholarshipId: PropTypes.string.isRequired,
};

export default ReviewModal;
