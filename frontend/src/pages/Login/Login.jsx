function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <button style={{ width: "100%" }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;