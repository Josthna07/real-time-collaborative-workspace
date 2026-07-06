function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <h2>Workspace</h2>

      <ul>
        <li>Dashboard</li>
        <li>Projects</li>
        <li>Tasks</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;