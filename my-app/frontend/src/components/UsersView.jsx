import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersView = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="2">BlogApp users</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;
