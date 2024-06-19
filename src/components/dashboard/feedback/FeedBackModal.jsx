import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import PropTypes from "prop-types";

import useAuth from "../../../hooks/useAuth";
import SubmitButton from "../../form/SubmitButton";
import usePostData from "../../../hooks/usePostData";
import TextAreaInput from "../../form/TextAreaInput";

const FeedBackModal = ({
  modalState,
  toggleModalState,
  applicantId,
  defaultValue,
}) => {
  const { user } = useAuth();
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      feedback: defaultValue,
    },
  });
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: addFeedBackMutation } = usePostData();

  const handleFormSubmit = async (data) => {
    if (defaultValue === data.feedback)
      return toast.warn("No changes ware made");
    setLoading(true);
    // console.log(updatedData);
    const obj = {
      method: "patch",
      url: `appliedScholarships/feedback/${applicantId}?uid=${user?.uid}`,
      data: data,
    };
    try {
      const resDB = await addFeedBackMutation(obj);
      //   console.log(resDB.data);
      if (resDB.data?.modifiedCount) {
        queryClient.invalidateQueries(["myApplications"]);
        toggleModalState(false);
        reset();
        toast.success("Feedback Added");
      }
    } catch (error) {
      // console.log(error);
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
          Feedback
        </span>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          {/* admin/mod feedback */}
          <TextAreaInput
            label="Message"
            inputType="text"
            {...register("feedback", {
              required: "Required",
              minLength: {
                value: 25,
                message: "Must be at least 25 characters long",
              },
            })}
            error={errors?.feedback?.message}
          />
          <button type="submit" className="hidden" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton
          label="Confirm"
          dependencies={{ loading }}
          onClick={() =>
            formRef.current.dispatchEvent(
              new Event("submit", {
                cancelable: true,
                bubbles: true,
              })
            )
          }
        />
      </Modal.Footer>
    </Modal>
  );
};

FeedBackModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  toggleModalState: PropTypes.func.isRequired,
  applicantId: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

export default FeedBackModal;
