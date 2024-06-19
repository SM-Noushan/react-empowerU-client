import { Controller } from "react-hook-form";
import { Datepicker } from "flowbite-react";
import PropTypes from "prop-types";
import moment from "moment";

import FileInput from "../form/FileInput";
import DatePicker from "../form/DatePicker";
import CommonInput from "../form/CommonInput";
import SelectInput from "../form/SelectInput";
import TextAreaInput from "../form/TextAreaInput";
import validateImage from "../../utils/validateImage";

const ScholarshipDetailsInputFields = ({
  register,
  errors,
  control,
  edit = false,
  deadline = new Date(),
}) => {
  return (
    <>
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

      <div className="flex items-center gap-4 *:flex-1">
        {/* university country */}
        {/* university city */}
        <CommonInput
          label="City"
          inputType="text"
          {...register("universityCity", {
            required: "Required",
          })}
          error={errors?.universityCity?.message}
        />

        <CommonInput
          label="Country"
          inputType="text"
          {...register("universityCountry", {
            required: "Required",
          })}
          error={errors?.universityCountry?.message}
        />
      </div>

      {/* university rank */}
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

      <div className="flex items-center gap-4 *:flex-1">
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
      </div>

      <div className="flex items-center gap-4 *:flex-1">
        {/* subject category */}
        <SelectInput
          label="Subject"
          options={["Agriculture", "Engineering", "Doctor"]}
          {...register("subjectCategory", {
            required: "Required",
            pattern: {
              value: /^(?!default$).*$/i,
              message: "Pick subject category",
            },
          })}
          error={errors?.subjectCategory?.message}
        />

        {/* scholarship category */}
        <SelectInput
          label="Scholarship"
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
      </div>

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

      <div
        className={
          edit
            ? "flex flex-col-reverse gap-y-2"
            : "flex flex-col-reverse md:flex-row md:items-center gap-4 *:flex-1"
        }
      >
        {/* university logo */}
        <FileInput
          label="University Logo"
          {...register(
            "universityLogo",
            !edit && {
              required: "Required",
              validate: validateImage,
            }
          )}
          error={errors?.universityLogo?.message}
        />
        {/* application deadline */}
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
                if (edit) return true;
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
                defaultDate={deadline}
                title="Application Deadline"
                selected={value}
                onSelectedDateChanged={(date) => {
                  onChange(date);
                }}
              />
            )}
          />
        </DatePicker>
      </div>

      {/* scholarship descriptions */}
      <TextAreaInput
        label="Scholarship Description"
        {...register("scholarshipDescription", {
          required: "Required",
          minLength: {
            value: 250,
            message: "Must be at least 250 characters long",
          },
        })}
        error={errors?.scholarshipDescription?.message}
      />
    </>
  );
};

ScholarshipDetailsInputFields.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired,
  deadline: PropTypes.object,
  edit: PropTypes.bool,
};

export default ScholarshipDetailsInputFields;
