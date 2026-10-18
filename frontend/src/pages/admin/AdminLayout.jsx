import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Megaphone, 
  CalendarDays, 
  Users, 
  Image as ImageIcon, 
  Building2, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { to: '/admin/announcements', label: 'Announcements', icon: <Megaphone size={20} /> },
  { to: '/admin/events', label: 'Events', icon: <CalendarDays size={20} /> },
  { to: '/admin/staff', label: 'Staff', icon: <Users size={20} /> },
  { to: '/admin/gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
  { to: '/admin/facilities', label: 'Facilities', icon: <Building2 size={20} /> },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] text-white shadow-2xl relative z-40">
        <SidebarContent admin={admin} handleLogout={handleLogout} />
      </aside>

      {/* Sidebar Mobile (Animated) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] text-white shadow-2xl z-40 flex flex-col md:hidden"
            >
              <SidebarContent admin={admin} handleLogout={handleLogout} onClickLink={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100/80 transition-colors"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-semibold text-gray-800 text-lg tracking-tight hidden sm:block">Content Management System</h2>
            <h2 className="font-semibold text-gray-800 text-base sm:hidden">CMS Portal</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
               {admin?.username?.charAt(0).toUpperCase() || 'A'}
             </div>
             <span className="text-sm font-medium text-gray-700 hidden sm:block capitalize">{admin?.username}</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ admin, handleLogout, onClickLink }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center gap-4 px-6 py-8 border-b border-white/10">
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="font-bold text-base leading-tight tracking-wide">PSNM UPS</p>
          <p className="text-xs text-blue-300 font-medium tracking-wider uppercase">Admin Portal</p>
        </div>
        {onClickLink && (
           <button onClick={onClickLink} className="ml-auto p-2 md:hidden text-gray-400 hover:text-white rounded-lg">
             <X size={20} />
           </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">Menu</div>
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin/dashboard'}
            onClick={onClickLink}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/90 text-white shadow-md shadow-blue-900/20'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <span className="opacity-90">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logged in user & Logout */}
      <div className="px-6 py-6 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-9 h-9 rounded-full bg-blue-900/50 flex items-center justify-center border border-white/10">
             <span className="text-sm font-bold text-blue-200">{admin?.username?.charAt(0).toUpperCase()}</span>
           </div>
           <div>
             <p className="text-xs text-gray-400">Logged in as</p>
             <p className="text-sm font-semibold text-white capitalize">{admin?.username}</p>
           </div>
        </div>
        <button
          onClick={handleLogout}
          id="admin-logout-btn"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 hover:text-red-200 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </>
  );
}

