import Navbar from "../../components/auth/board/common/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Real-Time Collaborative Workspace
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Manage projects, collaborate with teams, track tasks,
          and boost productivity with real-time updates.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Get Started
          </button>

          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Kanban Boards
            </h3>
            <p className="text-gray-600">
              Organize tasks efficiently using drag-and-drop boards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Real-Time Collaboration
            </h3>
            <p className="text-gray-600">
              Work with teammates instantly through live updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-3">
              Task Management
            </h3>
            <p className="text-gray-600">
              Create, assign, and monitor tasks with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© 2026 Real-Time Collaborative Workspace</p>
      </footer>
    </div>
  );
}

export default Home;