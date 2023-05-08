const UsersInRoom = ({ room, users }) => {
  return (
    <div>
      <h3>Room: {room}</h3>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
