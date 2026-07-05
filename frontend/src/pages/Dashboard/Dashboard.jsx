function Dashboard() {
  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Total Workspaces</h3>
          <p>5</p>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Total Tasks</h3>
          <p>20</p>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>Completed</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;