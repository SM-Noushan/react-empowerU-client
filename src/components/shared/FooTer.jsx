import { Link } from "react-router-dom";

const FooTer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link
          to="/"
          className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            src="./assets/logo.jpg"
            className="rounded-md mr-3 h-6 sm:h-9"
            alt="empoweru-logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            EmpowerU
          </span>
        </Link>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          A comprehensive platform with over 100+ scholarships, designed for
          superior scholarship administration and applicant experience.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Scholarships
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Campaigns
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Blogs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Affiliate Programs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024
          <Link href="#" className="hover:underline">
            EmpowerU™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooTer;
