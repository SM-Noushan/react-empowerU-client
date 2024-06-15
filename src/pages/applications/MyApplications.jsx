import React from "react";
import { Alert } from "flowbite-react";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { Helmet } from "react-helmet-async";
import useFetchData from "../../hooks/useFetchData";
import useAuth from "../../hooks/useAuth";
import MyApplicationTable from "./MyApplicationTable";
import { HiInformationCircle } from "react-icons/hi";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";

const MyApplications = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "myApplications",
    `appliedScholarships/${user?.uid}`,
    {},
    true
  );
  console.log(data, isLoading);
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: My Applications</title>
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
          data.map((item) => <MyApplicationTable key={item._id} data={item} />)
        )}
      </div>
    </DashboardContainer>
  );
};

export default MyApplications;
