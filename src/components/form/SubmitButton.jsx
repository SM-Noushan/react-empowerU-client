import PropTypes from "prop-types";
import { FaCircleNotch } from "react-icons/fa6";

const SubmitButton = ({ label, dependencies, onClick = () => {} }) => {
  let isDisabled = dependencies.loading;
  if (Object.keys(dependencies).length === 2)
    isDisabled = !dependencies.editProfile || dependencies.loading;
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full py-2 text-sm font-medium text-white bg-primary-700 rounded-lg dark:bg-primary-600 disabled:bg-gray-400 dark:disabled:bg-gray-400 flex items-center justify-center gap-x-2"
      disabled={isDisabled}
    >
      {label}
      {dependencies.loading && <FaCircleNotch className="animate-spin" />}
    </button>
  );
};

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  dependencies: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default SubmitButton;
