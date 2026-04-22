"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, User, Mail, RefreshCw, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { useAdminPressRelease } from '@/context/AdminPressReleases';

export default function AdminUsers({ users }: { users: any[] }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const { pressReleases, loading } = useAdminPressRelease();

  const getReleaseCount = (id: string) => pressReleases.filter((pr) => pr.user_id === id).length;

  const filtered = users.filter(u => {
    const matchSearch = !search || u.user_metadata.full_name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.app_metadata.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: users.length, color: '#0B163F' },
          { label: 'Admins', value: users.filter(u => u?.app_metadata.role === "super-admin").length, color: '#D34586' },
          { label: 'Regular Users', value: users.filter(u => u.app_metadata.role !== 'super_admin').length, color: '#1676BF' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D34586]/20 focus:border-[#D34586]"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'super-admin'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${roleFilter === r ? 'bg-[#0B163F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>
        <button onClick={() => { }} className="text-gray-400 hover:text-gray-600 px-2">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0B163F]">Users <span className="text-gray-400 font-normal">({filtered.length})</span></h2>
        </div>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Company Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Releases</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Joined</th>
                  <th className="px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#D34586]/15 flex items-center justify-center text-[#D34586] text-sm font-bold shrink-0">
                          {u.user_metadata.avatar_url ? (
                            <img src={u.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                          ) : (
                            u.email?.[0]?.toUpperCase() || 'U'
                          )}
                        </div>
                        <span className="font-medium text-[#0B163F]">{u.user_metadata.full_name || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600"><a href={`mailto:${u.email}`}>{u.email}</a></td>
                    <td><RoleDropdown current={u?.app_metadata?.role === "super-admin"? "Admin" : "User"} onChange={()=> {}} /></td>
                    <td className="px-4 py-4">{u.user_metadata.company_name || '—'}</td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-[#0B163F]">{getReleaseCount(u.id)}</span>
                      <span className="text-xs text-gray-400"> releases</span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs">
                      {u.created_at ? format(new Date(u.created_at), 'MMM d, yyyy') : '—'}
                    </td>
                    <td className="px-4 py-4">
                      <a href={`mailto:${u.email}`}
                        className="w-8 h-8 rounded-lg bg-[#1676BF]/10 text-[#1676BF] items-center justify-center hover:bg-[#1676BF]/20 transition-colors inline-flex">
                        <Mail className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function RoleDropdown({ current, onChange }: { current: string, onChange: (role: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-full capitalize ${current === 'admin' ? 'bg-[#D34586]/10 text-[#D34586]' : 'bg-gray-100 text-gray-600'
          }`}
      >
        {current === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
        {current}
        <ChevronDown className="w-3 h-3" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-xl py-1 min-w-32.5"
            >
              {['admin', 'user'].map(r => (
                <button key={r} onClick={() => { onChange(r); setOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs capitalize hover:bg-gray-50 ${current === r ? 'font-bold' : ''}`}
                >
                  {r === 'admin' ? <Shield className="w-3 h-3 text-[#D34586]" /> : <User className="w-3 h-3 text-gray-400" />}
                  {r}
                  {current === r && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}