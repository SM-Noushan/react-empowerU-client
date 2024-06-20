import { HiInformationCircle } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { Alert } from "flowbite-react";

import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import ReviewCard from "../../components/dashboard/review/ReviewCard";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

const ManageReviews = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "manageReviews",
    `reviews?uid=${user.uid}`,
    {},
    true
  );

  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: Manage Reviews</title>
      </Helmet>
      <div className={`max-h-[calc(100dvh-100px)] ${data?.length || "w-full"}`}>
        <SectionHeading heading="Manage Reviews" />
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
          <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-10 md:space-y-0">
            {data.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}
      </div>
    </DashboardContainer>
  );
};

export default ManageReviews;
