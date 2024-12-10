import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({socket}) => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", {userName , socketId: socket.id});
    navigate("/chat");
  };
  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        className="username__input"
        type="text"
        id="username"
        name="username"
        value={userName}
        onChange={(event) => setUsername(event.target.value)}
        required
      />

      <button className="home__cta">Sign in</button>
    </form>
  );
};

export default Home;
