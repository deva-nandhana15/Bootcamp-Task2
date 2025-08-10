// pages/ProfileTab.tsx
import { useEffect, useState } from "react";

interface SectionStats {
  name: string;
  pending: number;
  completed: number;
}

interface ProfileData {
  name: string;
  email: string;
  totalSections: number;
  totalTasks: number;
  sections: SectionStats[];
}

export default function ProfileTab() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace this URL with your backend endpoint
    fetch("http://localhost:8000/profile/123") // placeholder user ID
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      {/* Basic Info */}
      <div className="mb-6">
        <p className="text-lg">
          <strong>Name:</strong> {profile.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {profile.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow">
          <p className="text-sm">Total Sections</p>
          <p className="text-2xl font-bold">{profile.totalSections}</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg shadow">
          <p className="text-sm">Total Tasks</p>
          <p className="text-2xl font-bold">{profile.totalTasks}</p>
        </div>
      </div>

      {/* Section Breakdown */}
      <h2 className="text-2xl font-semibold mb-3">Section Breakdown</h2>
      <table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Section</th>
            <th className="px-4 py-2 text-center">Pending</th>
            <th className="px-4 py-2 text-center">Completed</th>
          </tr>
        </thead>
        <tbody>
          {profile.sections.map((section, idx) => (
            <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
              <td className="px-4 py-2">{section.name}</td>
              <td className="px-4 py-2 text-center">{section.pending}</td>
              <td className="px-4 py-2 text-center">{section.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
