import { Spinner } from "flowbite-react";

const MySpinner = () => {
  return (
    <div className="flex justify-center items-center h-dvh bg-white dark:bg-gray-900">
      <Spinner aria-label="spinner" size="xl" />
    </div>
  );
};

export default MySpinner;
