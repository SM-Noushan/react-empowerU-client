import Banner from "../../components/home/Banner";
import ContactUs from "../../components/home/ContactUs";
import OurBlog from "../../components/home/OurBlog";
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
      <OurBlog />
      <StudentReview />
      <ContactUs />
    </>
  );
};

export default Home;
