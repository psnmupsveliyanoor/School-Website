import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Megaphone, CalendarDays, Users, Image as ImageIcon, Building2 } from 'lucide-react';

const TILES = [
  { to: '/admin/announcements', label: 'Announcements', icon: <Megaphone size={32} />, desc: 'Manage school notices' },
  { to: '/admin/events',        label: 'Events',         icon: <CalendarDays size={32} />, desc: 'Add or edit events' },
  { to: '/admin/staff',         label: 'Staff',          icon: <Users size={32} />, desc: 'Manage team members' },
  { to: '/admin/gallery',       label: 'Gallery',        icon: <ImageIcon size={32} />, desc: 'Upload gallery images' },
  { to: '/admin/facilities',    label: 'Facilities',     icon: <Building2 size={32} />, desc: 'Edit facility listings' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function AdminDashboard() {
  const { admin } = useAuth();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">{admin?.username}</span> 👋
        </h1>
        <p className="text-gray-500 text-base mt-2">Select a section to manage content on the public website.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {TILES.map(({ to, label, icon, desc }) => (
          <motion.div variants={itemVariants} key={to}>
            <Link
              to={to}
              className="group block bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white shadow-[0_10px_30px_rgba(37,99,235,0.06)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition-all duration-300 h-full"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">{label}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
