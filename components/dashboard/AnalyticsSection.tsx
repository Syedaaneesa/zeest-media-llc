"use client";

import { PressReleaseType } from '@/context/PressReleaseContext';
import { motion } from 'framer-motion';
import { Users, Eye, Newspaper, TrendingUp, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MetricCard from '../reports/MetricCard';

const chartData = [
  { date: 'Jan 1', reach: 12000, views: 8500 },
  { date: 'Jan 2', reach: 19000, views: 12000 },
  { date: 'Jan 3', reach: 28000, views: 18500 },
  { date: 'Jan 4', reach: 45000, views: 32000 },
  { date: 'Jan 5', reach: 52000, views: 38000 },
  { date: 'Jan 6', reach: 89000, views: 62000 },
  { date: 'Jan 7', reach: 125000, views: 95000 },
];

const pickupData = [
  { outlet: 'Yahoo Finance', pickups: 45 },
  { outlet: 'MarketWatch', pickups: 38 },
  { outlet: 'Bloomberg', pickups: 32 },
  { outlet: 'AP News', pickups: 28 },
  { outlet: 'Benzinga', pickups: 25 },
];

export default function AnalyticsSection({ pressRelease }: {pressRelease: PressReleaseType}) {
  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Reach"
          value={pressRelease?.total_reach || 150000}
          suffix=""
          icon={Users}
          color="#D34586"
        />
        <MetricCard
          title="Media Pickups"
          value={pressRelease?.pickups || 45}
          suffix="+"
          icon={Newspaper}
          color="#1676BF"
        />
        <MetricCard
          title="Views"
          value={pressRelease?.views || 12500}
          suffix=""
          icon={Eye}
          color="#10B981"
        />
        <MetricCard
          title="Engagement"
          value={8.5}
          suffix="%"
          icon={TrendingUp}
          color="#F59E0B"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Reach Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-lg font-bold text-[#0B163F] mb-4">Reach Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorReach2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D34586" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D34586" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(v) => `${v/1000}K`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0B163F', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="reach" 
                stroke="#D34586" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorReach2)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Outlets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-gray-100"
        >
          <h3 className="text-lg font-bold text-[#0B163F] mb-4">Top Media Outlets</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pickupData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" fontSize={11} />
              <YAxis type="category" dataKey="outlet" stroke="#9CA3AF" fontSize={11} width={90} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0B163F', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="pickups" 
                fill="#D34586" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <Button className="bg-[#0B163F] hover:bg-[#0B163F]/90 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download PDF Report
        </Button>
      </div>
    </div>
  );
}