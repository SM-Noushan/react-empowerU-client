import moment from "moment";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQueryClient } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import uploadImage from "../../utils/uploadImage";
import SubmitButton from "../../components/form/SubmitButton";
import parseScholarshipDetailsData from "../../utils/parseScholarshipDetailsData";
import ScholarshipDetailsInputFields from "../../components/dashboard/ScholarshipDetailsInputFields";

const AddScholarship = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("applicationDeadline", new Date());
  }, []);

  const onSuccess = () => {
    queryClient.invalidateQueries(["scholarships"]);
  };

  const { mutateAsync: addScholarshipMutation } = usePostData(onSuccess);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await uploadImage(data.universityLogo);
      if (res.data.success) {
        data.universityLogo = res.data.data.display_url;
        data.scholarshipPostDate = moment().format("DD MMMM, YYYY");
        data.postedUserName = user?.displayName;
        data.postedUserEmail = user?.email;
        data.postedUserUID = user.uid;
        const parsedData = parseScholarshipDetailsData(data);
        const object = {
          method: "post",
          url: "adminOrMod/scholarship",
          data: parsedData,
        };
        const resDB = await addScholarshipMutation(object);
        // console.log(resDB.data);
        if (resDB.data?.insertedId) {
          reset();
          toast.success("Scholarship Added");
        }
      }
    } catch (error) {
      //   console.log(error);
      toast.error("Failed! Try again.");
    }
    return setLoading(false);
  };
  return (
    <section className="">
      <Helmet>
        <title>EmpowerU: Add Scholarship</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center mx-auto min-h-dvh py-6">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-900">
          <div className=" space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white capitalize">
              scholarship details
            </h1>
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <ScholarshipDetailsInputFields
                register={register}
                errors={errors}
                control={control}
              />

              {/* submit button */}
              <SubmitButton
                label="Add Scholarship"
                dependencies={{ loading }}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddScholarship;
