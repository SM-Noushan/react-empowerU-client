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

import ApplicationFormModal from "../../components/ApplicationFormModal";
import { toast } from "react-toastify";

const MyApplicationTable = ({ data }) => {
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const handleEdit = (d) => {
    // const status = "ProceSSinG";
    setModalData(d);
    // console.log(d);
    if (status?.toLowerCase() === "pending" || !status) {
      return setOpenModal(true);
    } else return toast.warn("Application is in process!");
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
                {status || "Pending"}
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
                  <Dropdown.Item icon={FaRegRectangleXmark}>
                    Cancel
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
              <Table.Cell>
                <Button
                //   onClick={() => setOpenModal(true)}
                //   disabled={!payStatus}
                >
                  Review
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ApplicationFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={modalData}
        edit={true}
      />
    </>
  );
};

MyApplicationTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MyApplicationTable;
