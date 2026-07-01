function Settings() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Settings</h1>

      <div
        style={{
          width: "400px",
          marginTop: "20px",
        }}
      >
        <label>Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Name"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <label>Email</label>
        <br />
        <input
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          style={{
            padding: "10px 20px",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;