function Workspace() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Workspace Board</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "250px",
            minHeight: "300px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3>To Do</h3>
          <p>Task 1</p>
          <p>Task 2</p>
        </div>

        <div
          style={{
            width: "250px",
            minHeight: "300px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3>In Progress</h3>
          <p>Task 3</p>
        </div>

        <div
          style={{
            width: "250px",
            minHeight: "300px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <h3>Done</h3>
          <p>Task 4</p>
        </div>
      </div>
    </div>
  );
}

export default Workspace;