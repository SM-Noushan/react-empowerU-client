import React from "react";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import {
  FaEllipsisVertical,
  FaPenToSquare,
  FaRegRectangleList,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Dropdown, Table } from "flowbite-react";

import { toast } from "react-toastify";
// import usePostData from "../../hooks/usePostData";
// import PopUpModal from "../../components/PopUpModal";
import { useQueryClient } from "@tanstack/react-query";
import SectionHeading from "../../components/shared/SectionHeading";
import MySpinner from "../../components/shared/MySpinner";
import { HiInformationCircle } from "react-icons/hi";
// import ReviewModal from "../../components/dashboard/review/ReviewModal";

const MyReviews = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "myReviews",
    `reviews/${user?.uid}`,
    {},
    true
  );
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: My Reviews</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <SectionHeading heading="My Reviews" />
        {isLoading ? (
          <MySpinner />
        ) : data.length === 0 ? (
          <Alert
            color="info"
            className="items-center"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium">Info!</span> No Reviews Found.
          </Alert>
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Scholarship</Table.HeadCell>
              <Table.HeadCell>University</Table.HeadCell>
              <Table.HeadCell>Feedback</Table.HeadCell>
              <Table.HeadCell>Rating</Table.HeadCell>
              <Table.HeadCell>Posted On</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((review) => (
                <Table.Row
                  key={review._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {review.scholarshipDetails.scholarshipName}
                  </Table.Cell>
                  <Table.Cell>
                    {review.scholarshipDetails.universityName}
                  </Table.Cell>
                  <Table.Cell>{review.reviewMessage}</Table.Cell>
                  <Table.Cell>{review.rating}</Table.Cell>
                  <Table.Cell>{review.reviewDate}</Table.Cell>
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
                        icon={FaPenToSquare}
                        //   onClick={() => handleEdit(d)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-red-400 dark:text-red-600"
                        icon={FaRegRectangleXmark}
                        //   onClick={() => {
                        //     setCancelApplication(d._id);
                        //     setDeleteModal(true);
                        //   }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                  {/* <Table.Cell>
                      <Button
                        onClick={() => {
                          setReviewId(d.scholarshipId);
                          setReviewModal(true);
                        }}
                        disabled={d.reviewStatus}
                      >
                        Review
                      </Button>
                    </Table.Cell> */}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </DashboardContainer>
  );
};

export default MyReviews;
