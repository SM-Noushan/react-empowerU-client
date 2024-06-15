import PropTypes from "prop-types";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const MyApplicationTable = ({ data }) => {
  const {
    scholarshipId,
    universityName,
    feedback,
    status,
    subjectCategory,
    additionalDetails,
    applicantDegree,
  } = data || {};
  const { applicationFee, serviceCharge, universityCity, universityCountry } =
    additionalDetails;
  return (
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
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {universityName}
          </Table.Cell>
          <Table.Cell>
            {universityCity}, <br /> {universityCountry}
          </Table.Cell>
          <Table.Cell>{feedback || "None"}</Table.Cell>
          <Table.Cell>{subjectCategory}</Table.Cell>
          <Table.Cell>{applicantDegree}</Table.Cell>
          <Table.Cell>{applicationFee}$</Table.Cell>
          <Table.Cell>{serviceCharge}$</Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {status || "Pending"}
          </Table.Cell>
          <Table.Cell>7</Table.Cell>
          <Table.Cell>
          <Button
            //   onClick={() => setOpenModal(true)}
            //   disabled={!payStatus}
            >
              Review
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

MyApplicationTable.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MyApplicationTable;
