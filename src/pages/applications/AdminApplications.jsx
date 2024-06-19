import { Alert, Modal } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { HiInformationCircle } from "react-icons/hi";

import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import MyApplicationTable from "./MyApplicationTable";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

import {
  FaEllipsisVertical,
  FaFileCircleExclamation,
  FaPenToSquare,
  FaRegRectangleList,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Dropdown, Table } from "flowbite-react";

import usePostData from "../../hooks/usePostData";
import PopUpModal from "../../components/PopUpModal";
import { useQueryClient } from "@tanstack/react-query";
import ReviewModal from "../../components/dashboard/review/ReviewModal";
import ApplicationFormModal from "../../components/ApplicationFormModal";
import CommonInput from "../../components/form/CommonInput";
import { useForm } from "react-hook-form";
import FeedBackModal from "../../components/dashboard/feedback/FeedBackModal";

const AdminApplications = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "allApplications",
    `appliedScholarships?uid=${user?.uid}`,
    {},
    true
  );
  const { register, setValue } = useForm();

  const [modalData, setModalData] = useState({});
  useEffect(() => {
    setValue("name", modalData.applicantName);
    setValue("university", modalData.additionalDetails?.universityName);
    setValue("degree", modalData.applicantDegree);
    setValue("scholarship", modalData.additionalDetails?.scholarshipCategory);
  }, [modalData]);

  const queryClient = useQueryClient();
  const [deleteModal, setDeleteModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [cancelApplication, setCancelApplication] = useState(null);

  const { mutateAsync: cancelScholarshipMutation } = usePostData();
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: Manage Applications</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <SectionHeading heading="My Applications" />
        {isLoading ? (
          <MySpinner />
        ) : data.length === 0 ? (
          <Alert
            color="info"
            className="items-center"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium">Info!</span> No Application Found.
          </Alert>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>University</Table.HeadCell>
              <Table.HeadCell>Scholarship</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Subject</Table.HeadCell>
              <Table.HeadCell>
                Applied <br /> Degree
              </Table.HeadCell>
              <Table.HeadCell>Fees</Table.HeadCell>
              <Table.HeadCell>
                Service <br /> Charge
              </Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
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
                    {d.additionalDetails.universityName}
                  </Table.Cell>
                  <Table.Cell>{d.additionalDetails.scholarshipName}</Table.Cell>
                  <Table.Cell>
                    {d.additionalDetails.scholarshipCategory}
                  </Table.Cell>
                  <Table.Cell>{d.additionalDetails.subjectCategory}</Table.Cell>
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
                        onClick={() => {
                          setModalData(d);
                          setDetailsModal(true);
                        }}
                      >
                        Details
                      </Dropdown.Item>
                      <Dropdown.Item
                        icon={FaFileCircleExclamation}
                        onClick={() => {
                          setModalData(d);
                          setFeedbackModal(true);
                        }}
                      >
                        Feedback
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
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
      {/* modal: view applicants details */}
      {detailsModal && (
        <Modal
          show={detailsModal}
          size="md"
          onClose={() => setDetailsModal(false)}
          popup
        >
          <Modal.Header>
            <span className="text-2xl font-medium text-gray-900 dark:text-white pl-4">
              Applicant&apos;s Details
            </span>
          </Modal.Header>

          <Modal.Body className="pb-0 text-center mx-auto space-y-2.5 mb-6">
            {/* photo */}
            <img
              src={modalData.applicantPhoto}
              alt="applicant-photo"
              className="h-36 rounded-md"
            />
            <div className="flex items-center gap-2.5">
              {/* applicant's name */}
              <CommonInput
                label="Applicant's Name"
                inputType="text"
                readOnly={true}
                {...register("name")}
              />

              {/* scholarship type */}
              <CommonInput
                label="Scholarship Type"
                inputType="text"
                readOnly={true}
                {...register("scholarship")}
              />
            </div>

            <div className="flex items-center gap-2.5">
              {/* applied university */}
              <CommonInput
                label="Applied University"
                inputType="text"
                readOnly={true}
                {...register("university")}
              />

              {/* applied degree */}
              <CommonInput
                label="Applied Degree"
                inputType="text"
                readOnly={true}
                {...register("degree")}
              />
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* modal: feedback modal */}
      {feedbackModal && (
        <FeedBackModal
          modalState={feedbackModal}
          toggleModalState={setFeedbackModal}
          applicantId={modalData._id}
          defaultValue={modalData.feedback || ""}
        />
      )}
    </DashboardContainer>
  );
};

export default AdminApplications;
