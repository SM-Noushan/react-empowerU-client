import { Helmet } from "react-helmet-async";
import ScholarshipCard from "../../components/ScholarshipCard";
import SectionHeading from "../../components/shared/SectionHeading";

const AllScholarship = () => {
  return (
    <section className="bg-white dark:bg-gray-900 relative">
      <Helmet>
        <title>EmpowerU: All Scholarship</title>
      </Helmet>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <SectionHeading heading="All Scholarship" />
        <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-10 md:space-y-0">
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
          <ScholarshipCard />
        </div>
      </div>
    </section>
  );
};

export default AllScholarship;
