import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Pagination } from "flowbite-react";
import { useState } from "react";

import useFetchData from "../../hooks/useFetchData";
import ScholarshipCard from "../../components/ScholarshipCard";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import SectionHeading from "../../components/shared/SectionHeading";

const AllScholarship = () => {
  const limit = 6;
  const { count } = useLoaderData();
  const totalPages = Math.ceil(count / limit);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetchData(
    "scholarships",
    `scholarships?page=${currentPage}&limit=${limit}`,
    { currentPage }
  );

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <section className="bg-white dark:bg-gray-900 relative">
      <Helmet>
        <title>EmpowerU: All Scholarship</title>
      </Helmet>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <SectionHeading heading="All Scholarship" />
        <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-6 xl:gap-10 md:space-y-0">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            data.map((data) => <ScholarshipCard key={data._id} data={data} />)
          )}
        </div>
        <div className="flex overflow-x-auto sm:justify-center mt-12">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            previousLabel="Go back"
            nextLabel="Go forward"
            showIcons
          />
        </div>
      </div>
    </section>
  );
};

export default AllScholarship;
