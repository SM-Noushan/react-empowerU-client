import PropTypes from "prop-types";
import {
  FaEllipsisVertical,
  FaPenToSquare,
  FaRegRectangleList,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Table } from "flowbite-react";

import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import PopUpModal from "../../components/PopUpModal";
import { useQueryClient } from "@tanstack/react-query";
import ReviewModal from "../../components/dashboard/review/ReviewModal";
import ApplicationFormModal from "../../components/ApplicationFormModal";

const MyApplicationTable = ({ data }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalData, setModalData] = useState({});
  const [reviewId, setReviewId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [cancelApplication, setCancelApplication] = useState(null);

  const { mutateAsync: cancelScholarshipMutation } = usePostData();

  const handleEdit = (d) => {
    setModalData(d);
    if (d.status?.toLowerCase() === "pending" || !d.status) {
      return setOpenModal(true);
    } else return toast.warn("Application is in process!");
  };

  const handleCancel = async (id) => {
    try {
      const object = {
        method: "delete",
        url: `appliedScholarships/${id}?uid=${user.uid}`,
      };
      const resDB = await cancelScholarshipMutation(object);
      if (resDB.data?.modifiedCount) {
        setDeleteModal(false);
        queryClient.invalidateQueries(["myApplications"]);
        return toast.success("Application cancelled");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Failed! Try again");
    }
  };
  return (
    <>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>University</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Feedback</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>
            Applied <br /> Degree
          </Table.HeadCell>
          <Table.HeadCell>Fees</Table.HeadCell>
          <Table.HeadCell>
            Service <br /> Charge
          </Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Review</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((d) => (
            <Table.Row
              key={d._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {d.universityName}
              </Table.Cell>
              <Table.Cell>
                {d.additionalDetails.universityCity}, <br />{" "}
                {d.additionalDetails.universityCountry}
              </Table.Cell>
              <Table.Cell>{d.feedback || "None"}</Table.Cell>
              <Table.Cell>{d.subjectCategory}</Table.Cell>
              <Table.Cell>{d.applicantDegree}</Table.Cell>
              <Table.Cell>{d.additionalDetails.applicationFee}$</Table.Cell>
              <Table.Cell>{d.additionalDetails.serviceCharge}$</Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {d.status || "Pending"}
              </Table.Cell>
              <Table.Cell className="*:cursor-pointer">
                <Dropdown
                  dismissOnClick={false}
                  renderTrigger={() => (
                    <span>
                      <FaEllipsisVertical />
                    </span>
                  )}
                >
                  <Dropdown.Item
                    icon={FaRegRectangleList}
                    as={Link}
                    to={`/scholarship/${d.scholarshipId}`}
                  >
                    Details
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={FaPenToSquare}
                    onClick={() => handleEdit(d)}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-red-400 dark:text-red-600"
                    icon={FaRegRectangleXmark}
                    onClick={() => {
                      setCancelApplication(d._id);
                      setDeleteModal(true);
                    }}
                  >
                    Cancel
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => {
                    setReviewId(d.scholarshipId);
                    setReviewModal(true);
                  }}
                  disabled={d.reviewStatus}
                >
                  Review
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <PopUpModal
        modalState={deleteModal}
        toggleModal={setDeleteModal}
        onClick={() => handleCancel(cancelApplication)}
      />
      <ApplicationFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={modalData}
        edit={true}
      />
      <ReviewModal
        modalState={reviewModal}
        toggleModalState={setReviewModal}
        scholarshipId={reviewId}
      />
    </>
  );
};

MyApplicationTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MyApplicationTable;
