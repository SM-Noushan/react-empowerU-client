import { Helmet } from "react-helmet-async";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";

// const data = [
//   {
//     name: "Masters",
//     "Total Scholarships": 4000,
//     "Applied Scholarships": 2400,
//   },
//   {
//     name: "Bachelors",
//     "Total Scholarships": 3000,
//     "Applied Scholarships": 1398,
//   },
//   {
//     name: "Diploma",
//     "Total Scholarships": 2000,
//     "Applied Scholarships": 9800,
//   },
// ];

const Statistics = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "statistics",
    `statistics?uid=${user.uid}`,
    {},
    true
  );
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: Statistics</title>
      </Helmet>

      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-8 w-[300px] md:w-[600px] lg:w-[700px] xl:w-[1000px] h-[calc(100dvh-200px)] relative">
        <div className="*:*:!text-lg *:*:!font-semibold absolute -left-12 sm:left-1/2 sm:-translate-x-1/3 -top-16 lg:-top-10 w-96 lg:w-auto">
          <SectionHeading heading="Applied Scholarships vs Total Scholarships" />
        </div>
        {isLoading ? (
          <MySpinner />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="Applied Scholarships"
                fill="#82ca9d"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="Total Scholarships"
                fill="#8884d8"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </DashboardContainer>
  );
};

export default Statistics;
