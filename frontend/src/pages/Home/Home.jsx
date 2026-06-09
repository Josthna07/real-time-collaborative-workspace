import Navbar from "../../components/auth/board/common/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <h1>Real-Time Collaborative Workspace</h1>

        <p
          style={{
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          Manage projects, collaborate with teams, and track tasks in real time.
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Kanban Boards</h3>
          <p>Organize tasks using drag-and-drop boards.</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Real-Time Collaboration</h3>
          <p>Work together with your team instantly.</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Task Tracking</h3>
          <p>Monitor progress and improve productivity.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;