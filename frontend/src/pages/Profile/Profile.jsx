import { useSelector } from "react-redux";
import { Mail, User, Briefcase, Calendar, Shield } from "lucide-react";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto pb-8">

      {/* Header Card */}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl shadow-lg p-8 mb-8 text-white">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-300 text-blue-900 flex items-center justify-center text-5xl font-bold shadow-lg border-4 border-white/20">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user?.name || "User"}
            </h1>

            <p className="text-blue-100 mt-2 text-lg">
              Team Member & Collaborator
            </p>

            <div className="flex items-center gap-2 mt-3 text-sm text-blue-100">
              <Shield size={16} />
              <span>Active Member</span>
            </div>

          </div>

        </div>

      </div>

      {/* Information Cards */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* Name Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-md border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition">

          <div className="flex items-start gap-4">

            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
              <User size={24} className="text-blue-600 dark:text-blue-400" />
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Full Name
              </p>

              <p className="font-semibold text-slate-900 dark:text-white mt-1 text-lg">
                {user?.name || "Not Available"}
              </p>

            </div>

          </div>

        </div>

        {/* Email Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-md border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition">

          <div className="flex items-start gap-4">

            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg flex-shrink-0">
              <Mail size={24} className="text-green-600 dark:text-green-400" />
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Email Address
              </p>

              <p className="font-semibold text-slate-900 dark:text-white mt-1 text-lg break-all">
                {user?.email || "Not Available"}
              </p>

            </div>

          </div>

        </div>

        {/* Role Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-md border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition">

          <div className="flex items-start gap-4">

            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
              <Briefcase size={24} className="text-purple-600 dark:text-purple-400" />
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Role
              </p>

              <p className="font-semibold text-slate-900 dark:text-white mt-1 text-lg">
                Team Member
              </p>

            </div>

          </div>

        </div>

        {/* Member Since Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-md border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition">

          <div className="flex items-start gap-4">

            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex-shrink-0">
              <Calendar size={24} className="text-orange-600 dark:text-orange-400" />
            </div>

            <div className="flex-1 min-w-0">

              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                Member Since
              </p>

              <p className="font-semibold text-slate-900 dark:text-white mt-1 text-lg">
                {user?.createdAt ? moment(user.createdAt).format("MMM DD, YYYY") : "Recently"}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Additional Info */}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700/30 p-6">

        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">About This Platform</h3>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Welcome to Workspace Manager! This is a real-time collaborative platform where you can manage workspaces, boards, tasks, and communicate with your team seamlessly. Make the most of your membership by creating and participating in collaborative projects.
        </p>

      </div>

    </div>
  );
}

export default Profile;