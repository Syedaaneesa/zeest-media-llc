import { motion } from 'framer-motion';
import { FileText, Users, Clock, CheckCircle, XCircle, Rocket } from 'lucide-react';
import { format } from 'date-fns';
import { useAdminPressRelease } from '@/context/AdminPressReleases';


export default function AdminOverview({ users }: { users: any[];}) {
  const { pressReleases, setPressReleases, loading } = useAdminPressRelease();

  const stats = [
    { label: 'Total Releases', value: pressReleases.length, icon: FileText, color: '#0B163F', bg: '#0B163F15' },
    { label: 'Total Users', value: users?.length || 0, icon: Users, color: '#1676BF', bg: '#1676BF15' },
    { label: 'Pending Review', value: pressReleases.filter(p => p.status === 'pending').length, icon: Clock, color: '#F59E0B', bg: '#F59E0B15' },
    { label: 'Scheduled', value: pressReleases.filter(p => p.status === 'scheduled').length, icon: Rocket, color: '#10B981', bg: '#10B98115' },
    { label: 'Published', value: pressReleases.filter(p => p.status === 'published').length, icon: CheckCircle, color: '#8B5CF6', bg: '#8B5CF615' },
    { label: 'Rejected', value: pressReleases.filter(p => p.status === 'rejected').length, icon: XCircle, color: '#EF4444', bg: '#EF444415' },
  ];

  const statusColors = {
    draft: 'bg-gray-100 text-gray-600',
    pending: 'bg-yellow-100 text-yellow-700',
    scheduled: 'bg-blue-100 text-blue-700',
    published: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const packageColors: Record<string, string> = {
    '199': 'bg-gray-100 text-gray-600',
    '299': 'bg-blue-100 text-blue-700',
    '599': 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: stat.bg }}>
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold text-[#0B163F]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Press Releases */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-[#0B163F]">Recent Press Releases</h2>
            <span className="text-xs text-gray-400">{pressReleases.length} total</span>
          </div>
          <div className="divide-y divide-gray-50">
            {pressReleases.slice(0, 6).map((pr) => (
              <div key={pr.id} className="px-6 py-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <a href={`/press-release/${pr.id}`} target='_blank' className="block text-sm font-medium text-[#0B163F] truncate">{pr.title}</a>
                  <p className="text-xs text-gray-400 mt-0.5">{pr.company_name} · {pr.created_at ? format(new Date(pr.created_at), 'MMM d, yyyy') : '—'}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize whitespace-nowrap ${statusColors[pr.status] || 'bg-gray-100 text-gray-600'}`}>
                  {pr.status?.replace('_', ' ')}
                </span>
              </div>
            ))}
            {pressReleases.length === 0 && (
              <div className="px-6 py-10 text-center text-gray-400 text-sm">No press releases yet</div>
            )}
          </div>
        </motion.div>

        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#0B163F]">Package Breakdown</h2>
          </div>
          <div className="p-6 space-y-4">
            {['199', '299', '599'].map((pkg) => {
              const count = pressReleases.filter(p => p.package === pkg).length;
              const pct = pressReleases.length > 0 ? Math.round((count / pressReleases.length) * 100) : 0;

              return (
                <div key={pkg}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${packageColors[pkg]}`}>{pkg}</span>
                    <span className="text-sm font-semibold text-[#0B163F]">{count} <span className="text-gray-400 font-normal">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="h-full rounded-full bg-linear-to-r from-[#D34586] to-[#1676BF]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Users */}
          <div className="border-t border-gray-100 px-6 py-4">
            <h3 className="font-bold text-[#0B163F] mb-3 text-sm">Recent Users</h3>
            <div className="space-y-2">
              {users && users?.slice(0, 4).map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#D34586]/20 flex items-center justify-center text-[#D34586] text-xs font-bold">
                    {u.user_metadata.avatar_url ? (
                      <img src={u.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      u.email?.[0]?.toUpperCase() || 'U'
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0B163F] truncate">{u.user_metadata.full_name || '—'}</p>
                    <p className="text-xs text-gray-400 truncate">{u.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-[#D34586]/10 text-[#D34586]' : 'bg-gray-100 text-gray-500'}`}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}