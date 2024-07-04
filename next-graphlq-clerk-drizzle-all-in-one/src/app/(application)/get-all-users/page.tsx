"use client";

import { useQuery } from "@apollo/client";

import { GET_USERS } from "@/queries/users";

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { offset: 0, limit: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data.users.map((user: any) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>
              Profile: <img src={user.profile} alt={user.name} />
            </p>
            <p>Created At: {new Date(user.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(user.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Page() {
  return <UsersList />;
}
