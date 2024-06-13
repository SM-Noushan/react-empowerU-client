import { Helmet } from "react-helmet-async";
import CommonInput from "../../components/form/CommonInput";
import FileInput from "../../components/form/FileInput";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import validateImage from "../../utils/validateImage";
import SubmitButton from "../../components/form/SubmitButton";
import { useEffect, useState } from "react";
import SelectInput from "../../components/form/SelectInput";
import moment from "moment";
import { Datepicker } from "flowbite-react";

import DatePicker from "../../components/form/DatePicker";

const AddScholarship = () => {
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

  const handleFormSubmit = (data) => {
    console.log(data);
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
              {/* scholarship name */}
              <CommonInput
                label="Scholarship Name"
                inputType="text"
                {...register("scholarshipName", {
                  required: "Required",
                })}
                error={errors?.scholarshipName?.message}
              />

              {/* university name */}
              <CommonInput
                label="University Name"
                inputType="text"
                {...register("universityName", {
                  required: "Required",
                })}
                error={errors?.universityName?.message}
              />

              {/* university country */}
              <CommonInput
                label="Country"
                inputType="text"
                {...register("universityCountry", {
                  required: "Required",
                })}
                error={errors?.universityCountry?.message}
              />

              {/* university country */}
              <CommonInput
                label="World Rank"
                inputType="number"
                {...register("universityWorldRank", {
                  required: "Required",
                  min: {
                    value: 1,
                    message: "Invalid Rank",
                  },
                })}
                error={errors?.universityWorldRank?.message}
              />

              {/* application fee */}
              <CommonInput
                label="Application Fee"
                inputType="number"
                {...register("applicationFee", {
                  required: "Required",
                  min: {
                    value: 0,
                    message: "Invalid Application Fee",
                  },
                })}
                error={errors?.applicationFee?.message}
              />

              {/* service charge */}
              <CommonInput
                label="Service Charge"
                inputType="number"
                {...register("serviceCharge", {
                  required: "Required",
                  min: {
                    value: 0,
                    message: "Invalid Service Charge",
                  },
                })}
                error={errors?.serviceCharge?.message}
              />

              {/* subject category */}
              <SelectInput
                label="Subject Category"
                options={["Agriculture", "Engineering", "Doctor"]}
                {...register("subjectCategory", {
                  required: "Required",
                  pattern: {
                    value: /^(?!default$).*$/i,
                    message: "Pick subject subject",
                  },
                })}
                error={errors?.subjectCategory?.message}
              />

              {/* scholarship category */}
              <SelectInput
                label="Scholarship Category"
                options={["Full Fund", "Partial Fund", "Self Fund"]}
                {...register("scholarshipCategory", {
                  required: "Required",
                  pattern: {
                    value: /^(?!default$).*$/i,
                    message: "Pick scholarship category",
                  },
                })}
                error={errors?.subjectCategory?.message}
              />
              {/* degree category */}
              <SelectInput
                label="Degree"
                options={["Diploma", "Bachelor", "Masters"]}
                {...register("degree", {
                  required: "Required",
                  pattern: {
                    value: /^(?!default$).*$/i,
                    message: "Pick a degree",
                  },
                })}
                error={errors?.degree?.message}
              />

              <DatePicker
                label="Application Deadline"
                name="applicationDeadline"
                error={errors?.applicationDeadline?.message}
              >
                <Controller
                  name="applicationDeadline"
                  control={control}
                  rules={{
                    validate: (value) => {
                      if (!value) {
                        return "Date is required";
                      }
                      const today = moment().format("YYYY-MM-DD");
                      const selectedDate = moment(value).format("YYYY-MM-DD");
                      if (selectedDate < today) {
                        return "Date cannot be in the past";
                      }
                      const oneWeekFromNow = moment()
                        .add(7, "days")
                        .format("YYYY-MM-DD");
                      if (selectedDate < oneWeekFromNow) {
                        return "Date must be at least one week from today";
                      }
                      return true;
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Datepicker
                      minDate={new Date()}
                      title="Application Deadline"
                      selected={value}
                      onSelectedDateChanged={(date) => {
                        onChange(date);
                      }}
                    />
                  )}
                />
              </DatePicker>

              {/* university logo */}
              <FileInput
                label="University Logo"
                {...register("universityLogo", {
                  required: "Required",
                  validate: validateImage,
                })}
                error={errors?.universityLogo?.message}
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
