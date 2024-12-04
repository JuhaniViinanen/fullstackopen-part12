import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="login-username">username</label>
        <input
          type="text"
          value={username}
          name="username"
          id="login-username"
          onChange={({ target }) => setUsername(target.value)}
          required
          autoFocus
        />
      </div>
      <div>
        <label htmlFor="login-password">password</label>
        <input
          type="password"
          value={password}
          name="password"
          id="login-password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div className="formButtons">
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;
