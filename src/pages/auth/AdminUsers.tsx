import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { getAllUsers } from "../../auth/authService";

export default function AdminUsers() {
  const token = useAuthStore(
    (s) => s.accessToken
  );

  const [users, setUsers] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      const data = await getAllUsers(token);
      setUsers(data.users || data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-6">
        All Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}