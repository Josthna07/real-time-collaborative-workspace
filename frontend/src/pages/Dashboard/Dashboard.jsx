import MainLayout from "../../layouts/MainLayout";

function Dashboard() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold">
            Total Projects
          </h3>
          <p className="text-3xl mt-2">5</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold">
            Total Tasks
          </h3>
          <p className="text-3xl mt-2">24</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h3 className="text-lg font-semibold">
            Completed Tasks
          </h3>
          <p className="text-3xl mt-2">12</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;