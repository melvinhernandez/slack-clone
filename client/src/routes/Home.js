import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const allUsersQuery = gql`
{
	allUsers {
    id
    username
    email
  }
}
`;

const Home = () => {
  const { loading, error, data } = useQuery(allUsersQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <ul>
      {data.allUsers.map(user => (
        <li key={user.id}>email: {user.email}, username: {user.username}</li>
      ))}
    </ul>
  );
};

export default Home;