import {
  FaEllipsisVertical,
  FaPenToSquare,
  FaRegRectangleList,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import moment from "moment";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, Dropdown, Modal, Table } from "flowbite-react";

import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import uploadImage from "../../utils/uploadImage";
import useFetchData from "../../hooks/useFetchData";
import PopUpModal from "../../components/PopUpModal";
import MySpinner from "../../components/shared/MySpinner";
import SubmitButton from "../../components/form/SubmitButton";
import SectionHeading from "../../components/shared/SectionHeading";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import ScholarshipDetailsInputFields from "../../components/dashboard/ScholarshipDetailsInputFields";

const ManageScholarships = () => {
  const formRef = useRef();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editData, setEditData] = useState({});
  const [deleteId, setDeleteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const {
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();

  const { data, isLoading } = useFetchData("scholarships", `scholarships`);

  const { mutateAsync: deleteScholarshipMutation } = usePostData();
  const { mutateAsync: editScholarshipMutation } = usePostData();

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const modifiedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
      if (Object.keys(modifiedData).length === 0) {
        setLoading(false);
        return toast.warn("No changes were made");
      }

      if (modifiedData.applicationDeadline)
        modifiedData.applicationDeadline = moment(
          modifiedData.applicationDeadline
        ).format("DD MMMM, YYYY");

      if (modifiedData.universityLogo) {
        const res = await uploadImage(modifiedData.universityLogo);
        if (res.data.success)
          modifiedData.universityLogo = res.data.data.display_url;
      }
      const object = {
        method: "patch",
        url: `scholarships/${data._id}?uid=${user.uid}`,
        data: modifiedData,
      };
      const resDB = await editScholarshipMutation(object);
      //   console.log(resDB.data);
      if (resDB.data?.matchedCount && !resDB.data?.modifiedCount) {
        toast.warn("No changes were made");
      }
      if (resDB.data?.modifiedCount) {
        queryClient.invalidateQueries(["scholarships, myApplications"]);
        setEditModal(false);
        reset();
        toast.success("Successfully Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed! Try again");
    }
    return setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const object = {
        method: "delete",
        url: `scholarships/${id}?uid=${user.uid}`,
      };
      const resDB = await deleteScholarshipMutation(object);
      if (resDB.data?.deletedCount) {
        setDeleteId("");
        setDeleteModal(false);
        queryClient.invalidateQueries(["scholarships, myApplications"]);
        return toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Failed! Try again");
    }
  };

  useEffect(() => {
    Object.keys(editData).forEach((key) => {
      setValue(key, editData[key]);
    });
  }, [editData]);

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
              <Table.HeadCell>Deadline</Table.HeadCell>
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
                  <Table.Cell className="p-0">
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
                  <Table.Cell>{d.applicationDeadline}</Table.Cell>
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
                      <Dropdown.Item
                        icon={FaPenToSquare}
                        onClick={() => {
                          setEditData(d);
                          setEditModal(true);
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-red-400 dark:text-red-600"
                        icon={FaRegRectangleXmark}
                        onClick={() => {
                          setDeleteId(d._id);
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
        onClick={() => handleDelete(deleteId)}
      />

      {/* edit modal */}
      {editModal && (
        <Modal
          show={editModal}
          size="lg"
          onClose={() => setEditModal(false)}
          popup
        >
          <Modal.Header>
            <span className="text-2xl font-medium text-gray-900 dark:text-white pl-4">
              Scholarship Details
            </span>
          </Modal.Header>

          <Modal.Body className="pb-0">
            <form
              ref={formRef}
              onSubmit={handleSubmit(handleFormSubmit)}
              className="space-y-2"
            >
              <ScholarshipDetailsInputFields
                register={register}
                errors={errors}
                control={control}
                edit={true}
                deadline={new Date(editData.applicationDeadline)}
              />
              <button type="submit" className="hidden" />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <SubmitButton
              label="Update"
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
      )}
    </DashboardContainer>
  );
};

export default ManageScholarships;
