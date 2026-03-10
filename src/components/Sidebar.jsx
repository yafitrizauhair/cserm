const Sidebar = ({ role }) => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {/* DASHBOARD */}
      <a href={`/${role}/dashboard`} className="block mb-3 hover:text-blue-400">
        Dashboard
      </a>

      {/* ADMIN MENU */}
      {role === "admin" && (
        <>
          <a href="/admin/content" className="block mb-3 hover:text-blue-400">
            Kelola Konten
          </a>
        </>
      )}

      {/* SUPER ADMIN MENU */}
      {role === "superadmin" && (
        <>
          <a href="/superadmin/users" className="block mb-3 hover:text-blue-400">
            Manajemen User
          </a>

          <a href="/superadmin/admins" className="block mb-3 hover:text-blue-400">
            Manajemen Admin
          </a>

          <a href="/superadmin/content" className="block mb-3 hover:text-blue-400">
            Semua Konten
          </a>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
