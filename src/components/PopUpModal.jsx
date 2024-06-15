import PropTypes from "prop-types";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const PopUpModal = ({ modalState, toggleModal, onClick }) => {
  return (
    <Modal show={modalState} size="md" onClose={() => toggleModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to cancel the application?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onClick}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => toggleModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

PopUpModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PopUpModal;
