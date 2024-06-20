import {
  FaEllipsisVertical,
  FaPenToSquare,
  FaRegRectangleXmark,
} from "react-icons/fa6";
import { useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { HiInformationCircle } from "react-icons/hi";
import { Alert, Dropdown, Table } from "flowbite-react";

import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import PopUpModal from "../../components/PopUpModal";
import { useQueryClient } from "@tanstack/react-query";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import ReviewModal from "../../components/dashboard/review/ReviewModal";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

const MyReviews = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewData, setReviewData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const { data, isLoading } = useFetchData(
    "myReviews",
    `reviews/${user?.uid}`,
    {},
    true
  );

  const { mutateAsync: deleteReviewMutation } = usePostData();

  const handleDelete = async ({ id }) => {
    try {
      const object = {
        method: "delete",
        url: `reviews/${id}?uid=${user.uid}`,
      };
      const resDB = await deleteReviewMutation(object);
      if (resDB.data?.deletedCount) {
        setReviewData({});
        setDeleteModal(false);
        queryClient.invalidateQueries([
          "myReviews, myApplications, scholarships",
        ]);
        return toast.success("Review Deleted");
      }
    } catch (error) {
      // console.log(error);
      return toast.error("Failed! Try again");
    }
  };
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: My Reviews</title>
      </Helmet>
      <div className={`max-h-[calc(100dvh-100px)] ${data?.length || "w-full"}`}>
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
                  <Table.Cell className="max-w-xs text-justify">
                    {review.reviewMessage}
                  </Table.Cell>
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
                        onClick={() => {
                          setReviewData(review);
                          setReviewModal(true);
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-red-400 dark:text-red-600"
                        icon={FaRegRectangleXmark}
                        onClick={() => {
                          setReviewData({ id: review._id });
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
        {/* confirm before delete */}
        <PopUpModal
          modalState={deleteModal}
          toggleModal={setDeleteModal}
          onClick={() => handleDelete(reviewData)}
          typeDelete={true}
        />

        {/* review modal */}
        <ReviewModal
          modalState={reviewModal}
          toggleModalState={setReviewModal}
          defaultData={reviewData}
          edit={true}
        />
      </div>
    </DashboardContainer>
  );
};

export default MyReviews;
