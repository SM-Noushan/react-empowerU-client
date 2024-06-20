import { useQueryClient } from "@tanstack/react-query";
import { Alert, Select, Table } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { FaTrashCan } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { useState } from "react";

import useAuth from "../../hooks/useAuth";
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import PopUpModal from "../../components/PopUpModal";
import MySpinner from "../../components/shared/MySpinner";
import SectionHeading from "../../components/shared/SectionHeading";
import DashboardContainer from "../../components/dashboard/shared/DashboardContainer";

const ManageUsers = () => {
  const { user: currUser } = useAuth();
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState("default");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const { data, isLoading } = useFetchData(
    "users",
    `users?uid=${currUser.uid}&role=${sortBy}`,
    { sortBy },
    true
  );
  const { mutateAsync: deleteUserMutation } = usePostData();
  const { mutateAsync: changeUserRoleMutation } = usePostData();

  const handleUserRole = async (role, id) => {
    const obj = {
      method: "patch",
      url: `users/${id}?uid=${currUser.uid}`,
      data: { role },
    };
    try {
      const resDB = await changeUserRoleMutation(obj);
      if (resDB.data?.modifiedCount) {
        queryClient.invalidateQueries(["users"]);
        return toast.success(`Role changed to ${role}`);
      }
    } catch (error) {
      // console.log(error);
      return toast.error("Failed! Try again");
    }
  };

  const handleDelete = async (id) => {
    const obj = {
      method: "delete",
      url: `users/${id}?uid=${currUser.uid}`,
    };
    try {
      const resDB = await deleteUserMutation(obj);
      if (resDB.data?.deletedCount) {
        setDeleteModal(false);
        queryClient.invalidateQueries(["users"]);
        return toast.success("User Removed");
      }
    } catch (error) {
      // console.log(error);
      return toast.error("Failed! Try again");
    }
  };

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
          <>
            <div className="w-56 ml-auto flex items-center justify-between gap-x-2">
              <h1 className="text-xl font-semibold">Filter By</h1>
              <Select
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                defaultValue={sortBy}
              >
                <option value="default">Default</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </Select>
            </div>
            {data.length ? (
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
                      <Table.Cell className="uppercase">
                        {user.role === "admin" && user.uid === currUser.uid ? (
                          <p>
                            Admin <br />
                            <span className="capitalize text-xs text-yellow-400">
                              *Self-revoke denied
                            </span>
                          </p>
                        ) : (
                          <Select
                            onChange={(e) => {
                              handleUserRole(e.target.value, user._id);
                            }}
                            className="w-32"
                            defaultValue={user.role}
                          >
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="user">User</option>
                          </Select>
                        )}
                      </Table.Cell>
                      {/* <Table.Cell className="uppercase">{user.role}</Table.Cell> */}
                      <Table.Cell>
                        {user.role === "admin" && user.uid === currUser.uid ? (
                          <span className="capitalize text-xs text-yellow-400">
                            Self Delete <br /> Denied
                          </span>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedUserId(user._id);
                              setDeleteModal(true);
                            }}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                          >
                            <FaTrashCan />
                          </button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <Alert
                color="info"
                className="items-center mt-6"
                icon={HiInformationCircle}
                withBorderAccent
              >
                <span className="font-medium">Info!</span> No Users Found.
              </Alert>
            )}
          </>
        )}
      </div>

      {/* confirm delete modal */}
      {deleteModal && (
        <PopUpModal
          modalState={deleteModal}
          toggleModal={setDeleteModal}
          onClick={() => handleDelete(selectedUserId)}
          typeDelete={true}
        />
      )}
    </DashboardContainer>
  );
};

export default ManageUsers;
