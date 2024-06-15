import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Modal } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import moment from "moment";

import CheckOutForm from "./CheckOutForm";
import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import uploadImage from "../../utils/uploadImage";
import validateImage from "../../utils/validateImage";
import FileInput from "../../components/form/FileInput";
import CommonInput from "../../components/form/CommonInput";
import SelectInput from "../../components/form/SelectInput";
import Container2 from "../../components/shared/Container2";
import SubmitButton from "../../components/form/SubmitButton";
import SectionHeading from "../../components/shared/SectionHeading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckOut = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const data = state?.data || {};
  const queryClient = useQueryClient();
  const [payStatus, setPayStatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const {
    _id,
    applicationFee,
    serviceCharge,
    universityName,
    subjectCategory,
    scholarshipCategory,
  } = data;

  useEffect(() => {
    setValue("universityName", universityName);
    setValue("subjectCategory", subjectCategory);
    setValue("scholarshipCategory", scholarshipCategory);
  }, []);

  const { mutateAsync: applyScholarshipMutation } = usePostData();

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleFormSubmit = async (data) => {
    setLoading(true);
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
        console.log(resDB.data);
        if (resDB.data?.insertedId) {
          setLoading(false);
          setOpenModal(false);
          setPayStatus(false);
          reset();
          queryClient.invalidateQueries(["myApplications"]);
          toast.success("Successfully Applied");
          return navigate("/dashboard/applications");
        }
      }
    } catch (error) {
      //   console.log(error);
      toast.error("Failed! Try again.");
      return setLoading(false);
    }
  };

  if (!Object.keys(data).length) return <Navigate to={"/"} />;
  return (
    <Container2>
      <Helmet>
        <title>EmpowerU: Apply Scholarship</title>
      </Helmet>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <SectionHeading heading="Pay & Proceed" />
        <div className="w-2/3 lg:w-1/2 mx-auto *:space-y-6">
          <Elements stripe={stripePromise}>
            <CheckOutForm
              price={applicationFee + serviceCharge}
              id={_id}
              setPayStatus={setPayStatus}
              setOpenModal={setOpenModal}
            />
            <Button
              onClick={() => setOpenModal(true)}
              className="w-2/3 lg:w-1/2 mx-auto py-0 mt-6"
              disabled={!payStatus}
            >
              Application Form
            </Button>
          </Elements>
        </div>
      </div>
      <div className="w-1/2 mx-auto *:space-y-6">
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

              {/* applicant's photo */}
              <FileInput
                label="Applicant's Photo"
                {...register("applicantPhoto", {
                  required: "Required",
                  validate: validateImage,
                })}
                error={errors?.applicantPhoto?.message}
              />

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
              <button type="submit" className="hidden" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton
              label="Apply"
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
      </div>
    </Container2>
  );
};

export default CheckOut;
