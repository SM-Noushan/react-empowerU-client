import { Alert } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { HiInformationCircle } from "react-icons/hi";

import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import MyApplicationTable from "./MyApplicationTable";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

const MyApplications = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "myApplications",
    `appliedScholarships/${user?.uid}`,
    {},
    true
  );
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: My Applications</title>
      </Helmet>
      <div className={`max-h-[calc(100dvh-100px)] ${data?.length || "w-full"}`}>
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
          <MyApplicationTable data={data} />
        )}
      </div>
    </DashboardContainer>
  );
};

export default MyApplications;
