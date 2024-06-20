import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";
import { Helmet } from "react-helmet-async";
import SectionHeading from "../../components/shared/SectionHeading";
import MySpinner from "../../components/shared/MySpinner";
import { Alert, Dropdown, Table } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import PopUpModal from "../../components/PopUpModal";
import useFetchData from "../../hooks/useFetchData";
import useAuth from "../../hooks/useAuth";
import { FaTrashCan } from "react-icons/fa6";

const ManageUsers = () => {
  const { user } = useAuth();
  const { data, isLoading } = useFetchData(
    "users",
    `users?uid=${user.uid}`,
    {},
    true
  );
  return (
    <DashboardContainer>
      <Helmet>
        <title>EmpowerU: Manage Users</title>
      </Helmet>
      <div className="overflow-x-auto w-full">
        <SectionHeading heading="Manage Users" />
        {isLoading ? (
          <MySpinner />
        ) : (
          <Table striped>
            <Table.Head>
              <Table.HeadCell>
                <span className="sr-only">Logo</span>
              </Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Role</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="p-0">
                    <img
                      src={user.image}
                      alt="user-image"
                      className="size-16 rounded-lg object-contain"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <button
                      //   onClick={() => setDeleteModal(true)}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      <FaTrashCan />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>

      {/* confirm delete modal */}
      {/* <PopUpModal
      // modalState={deleteModal}
      // toggleModal={setDeleteModal}
      // onClick={() => handleDelete(deleteId)}
      /> */}
    </DashboardContainer>
  );
};

export default ManageUsers;
