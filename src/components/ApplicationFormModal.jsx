import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal } from "flowbite-react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import moment from "moment";

import useAuth from "../hooks/useAuth";
import FileInput from "./form/FileInput";
import CommonInput from "./form/CommonInput";
import SelectInput from "./form/SelectInput";
import SubmitButton from "./form/SubmitButton";
import uploadImage from "../utils/uploadImage";
import usePostData from "../hooks/usePostData";
import validateImage from "../utils/validateImage";

const ApplicationFormModal = ({
  openModal,
  setOpenModal,
  setPayStatus,
  data,
  edit = false,
}) => {
  const {
    _id,
    universityName,
    subjectCategory,
    scholarshipCategory,
    additionalDetails,
    applicantPhoto,
    scholarshipId,
    applyDate,
    userEmail,
    userName,
    userUID,
    ...parsedData
  } = data || {};
  const { user } = useAuth();
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    setValue,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!edit) {
      setValue("universityName", universityName);
      setValue("subjectCategory", subjectCategory);
      setValue("scholarshipCategory", scholarshipCategory);
    } else {
      //
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [data]);

  const { mutateAsync: applyScholarshipMutation } = usePostData();
  const { mutateAsync: editScholarshipMutation } = usePostData();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
    if (edit) {
      try {
        const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});
        if (Object.keys(modifiedData).length === 0) {
          setLoading(false);
          return toast.warn("No changes were made");
        }
        if (modifiedData.applicantPhoto) {
          const res = await uploadImage(modifiedData.applicantPhoto);
          if (res.data.success)
            modifiedData.applicantPhoto = res.data.data.display_url;
        }
        const object = {
          method: "patch",
          url: `appliedScholarships/${_id}?uid=${user.uid}`,
          data: modifiedData,
        };
        const resDB = await editScholarshipMutation(object);
        // console.log(resDB.data);
        if (resDB.data?.modifiedCount) {
          setLoading(false);
          setOpenModal(false);
          reset();
          queryClient.invalidateQueries(["myApplications, allApplications"]);
          toast.success("Successfully Updated");
        }
      } catch (error) {
        // console.log(error);
        toast.error("Failed! Try again.");
        return setLoading(false);
      }
    } else {
      try {
        const res = await uploadImage(data.applicantPhoto);
        if (res.data.success) {
          data.applicantPhoto = res.data.data.display_url;
          const { studyGap } = data;
          const userUID = user.uid;
          const userName = user?.displayName || "Anonymous";
          const userEmail = user?.email || "Anonymous";
          const scholarshipId = _id;
          const applyDate = new moment().format("DD MMMM, YYYY");
          if (studyGap === "default") data.studyGap = "No";
          delete data.scholarshipCategory;
          delete data.subjectCategory;
          delete data.universityName;
          const newData = {
            ...data,
            userUID,
            userName,
            userEmail,
            scholarshipId,
            applyDate,
          };
          // console.log(newData);
          const object = {
            method: "post",
            url: "appliedScholarships",
            data: newData,
          };
          const resDB = await applyScholarshipMutation(object);
          // console.log(resDB.data);
          if (resDB.data?.insertedId) {
            setLoading(false);
            setOpenModal(false);
            setPayStatus(false);
            reset();
            queryClient.invalidateQueries(["myApplications, allApplications"]);
            toast.success("Successfully Applied");
            return navigate("/dashboard/applications");
          }
        }
      } catch (error) {
        // console.log(error);
        toast.error("Failed! Try again.");
        return setLoading(false);
      }
    }
  };
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header>
        <span className="text-2xl font-medium text-gray-900 dark:text-white pl-4">
          Fill up the application form
        </span>
      </Modal.Header>

      <Modal.Body className="pb-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-2"
        >
          {/* applicantName name */}
          <CommonInput
            label="Applicant's Name"
            inputType="text"
            {...register("applicantName", {
              required: "Required",
            })}
            error={errors?.applicantName?.message}
          />

          <div className="flex items-center gap-4 *:flex-1">
            {/* village */}
            <CommonInput
              label="Village"
              inputType="text"
              {...register("applicantVillage", {
                required: "Required",
              })}
              error={errors?.applicantVillage?.message}
            />

            {/* district */}
            <CommonInput
              label="District"
              inputType="text"
              {...register("applicantDistrict", {
                required: "Required",
              })}
              error={errors?.applicantDistrict?.message}
            />
          </div>

          <div className="flex items-center gap-4 *:flex-1">
            {/* country */}
            <CommonInput
              label="Country"
              inputType="text"
              {...register("applicantCountry", {
                required: "Required",
              })}
              error={errors?.applicantCountry?.message}
            />

            {/* sex */}
            <SelectInput
              label="Sex"
              options={["Male", "Female", "Other"]}
              {...register("sex", {
                required: "Required",
                pattern: {
                  value: /^(?!default$).*$/i,
                  message: "Please select your sex",
                },
              })}
              error={errors?.sex?.message}
            />
          </div>

          <div className="flex items-center gap-4 *:flex-1">
            {/* degree */}
            <SelectInput
              label="Applicant's Degree"
              options={["Diploma", "Bachelor", "Masters"]}
              {...register("applicantDegree", {
                required: "Required",
                pattern: {
                  value: /^(?!default$).*$/i,
                  message: "Please state your degree",
                },
              })}
              error={errors?.applicantDegree?.message}
            />

            {/* study gap */}
            <SelectInput
              label="Study Gap (Optional)"
              options={["Yes", "No"]}
              {...register("studyGap")}
              error={errors?.studyGap?.message}
            />
          </div>

          <div className="flex items-center gap-4 *:flex-1">
            {/* ssc result */}
            <CommonInput
              label="SSC Result"
              inputType="text"
              {...register("ssc", {
                required: "Required",
                pattern: {
                  value: /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/,
                  message: "Invalid result",
                },
              })}
              error={errors?.ssc?.message}
            />

            {/* hsc result */}
            <CommonInput
              label="HSC Result"
              inputType="text"
              {...register("hsc", {
                required: "Required",
                pattern: {
                  value: /^(?:[0-4](?:\.\d{1,2})?|5(?:\.0{1,2})?)$/,
                  message: "Invalid result",
                },
              })}
              error={errors?.hsc?.message}
            />
          </div>

          {/* applicantName phone number */}
          <CommonInput
            label="Contact No"
            inputType="text"
            {...register("applicantPhone", {
              required: "Required",
              pattern: {
                value: /^(?:\+?88)?01[3-9]\d{8}$/,
                message: "Invalid contact no",
              },
            })}
            error={errors?.applicantPhone?.message}
          />
          <div className={`flex items-center gap-4 ${!edit && "*:flex-1"}`}>
            {edit && (
              <img
                src={data.applicantPhoto}
                alt="applicant-photo"
                className="size-20 rounded-lg object-contain"
              />
            )}

            {/* applicant's photo */}
            <FileInput
              label="Applicant's Photo"
              {...register(
                "applicantPhoto",
                edit
                  ? {
                      validate: validateImage,
                    }
                  : {
                      required: "Required",
                      validate: validateImage,
                    }
              )}
              error={errors?.applicantPhoto?.message}
            />
          </div>

          {!edit && (
            <>
              {/* university name */}
              <CommonInput
                label="University Name"
                inputType="text"
                readOnly={true}
                {...register("universityName")}
              />

              {/* scholarship category */}
              <CommonInput
                label="Scholarship Category"
                inputType="text"
                readOnly={true}
                {...register("scholarshipCategory")}
              />

              {/* subject category */}
              <CommonInput
                label="Subject Category"
                inputType="text"
                readOnly={true}
                {...register("subjectCategory")}
              />
            </>
          )}
          <button type="submit" className="hidden" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <SubmitButton
          label={edit ? "Update now" : "Apply now"}
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

ApplicationFormModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setPayStatus: PropTypes.func,
  edit: PropTypes.bool,
};

export default ApplicationFormModal;
