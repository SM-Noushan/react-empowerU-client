import Banner from "../../components/home/Banner";
import StudentReview from "../../components/home/StudentReview";
import TopScholarships from "../../components/home/TopScholarships";

import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>EmpowerU: Home</title>
      </Helmet>
      <Banner />
      <TopScholarships />
      <StudentReview />
    </>
  );
};

export default Home;
