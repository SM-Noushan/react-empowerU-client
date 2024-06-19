import { Alert, Button, Dropdown, Table } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { HiInformationCircle } from "react-icons/hi";

import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import MyApplicationTable from "../applications/MyApplicationTable";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import ReviewModal from "../../components/dashboard/review/ReviewModal";
import PopUpModal from "../../components/PopUpModal";

import PropTypes from "prop-types";
import {
  FaEllipsisVertical,
  FaPenToSquare,
  FaRegRectangleList,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../../hooks/usePostData";

const ManageScholarships = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData("scholarships", `scholarships`);

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
    // try {
    //   const object = {
    //     method: "delete",
    //     url: `appliedScholarships/${id}?uid=${user.uid}`,
    //   };
    //   const resDB = await cancelScholarshipMutation(object);
    //   if (resDB.data?.modifiedCount) {
    //     setDeleteModal(false);
    //     queryClient.invalidateQueries(["myApplications"]);
    //     return toast.success("Application cancelled");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return toast.error("Failed! Try again");
    // }
  };
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: Manage Scholarships</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <SectionHeading heading="Manage Scholarships" />
        {isLoading ? (
          <MySpinner />
        ) : data.length === 0 ? (
          <Alert
            color="info"
            className="items-center"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium">Info!</span> No Scholarships Found.
          </Alert>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>
                <span className="sr-only">Logo</span>
              </Table.HeadCell>
              <Table.HeadCell>Scholarship</Table.HeadCell>
              <Table.HeadCell>University</Table.HeadCell>
              <Table.HeadCell>Subject</Table.HeadCell>
              <Table.HeadCell>Degree</Table.HeadCell>
              <Table.HeadCell>Fees</Table.HeadCell>
              <Table.HeadCell>
                Service <br /> Charge
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
                  <Table.Cell>
                    <img
                      src={d.universityLogo}
                      alt="university-logo"
                      className="size-16 rounded-lg object-contain"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {d.scholarshipName}
                  </Table.Cell>
                  <Table.Cell>{d.universityName}</Table.Cell>
                  <Table.Cell>{d.subjectCategory}</Table.Cell>
                  <Table.Cell>{d.degree}</Table.Cell>
                  <Table.Cell>{d.applicationFee}$</Table.Cell>
                  <Table.Cell>{d.serviceCharge}$</Table.Cell>
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
                        to={`/scholarship/${d._id}`}
                      >
                        Details
                      </Dropdown.Item>
                      {/* <Dropdown.Item
                          icon={FaPenToSquare}
                          onClick={() => handleEdit(d)}
                        >
                          Edit
                        </Dropdown.Item> */}
                      <Dropdown.Item
                        className="text-red-400 dark:text-red-600"
                        icon={FaRegRectangleXmark}
                        onClick={() => {
                          setCancelApplication(d._id);
                          setDeleteModal(true);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
      {/* confirm delete modal */}
      <PopUpModal
        modalState={deleteModal}
        toggleModal={setDeleteModal}
        onClick={() => handleCancel(cancelApplication)}
      />
    </DashboardContainer>
  );
};

export default ManageScholarships;
