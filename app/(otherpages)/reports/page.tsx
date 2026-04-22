"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Eye, Newspaper, TrendingUp, Download, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MetricCard from '@/components/reports/MetricCard';
import WorldMapLeaflet from '@/components/reports/WorldMapLeaflet';


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
  { outlet: 'Digital Journal', pickups: 22 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <a href={'#'} className="fixed left-2 top-[49vh] w-10 h-10 flex items-center justify-center rounded-full bg-[#D34586] hover:bg-[#D34586]/90 text-white">
        <Download className="w-4 h-4" />
      </a>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#0B163F] mb-2">
              Live Report Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time analytics for your press release campaigns
            </p>
          </div>
          <div className="flex gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-45 bg-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Audience"
            value={150000000}
            suffix=""
            icon={Users}
            color="#D34586"
          />
          <MetricCard
            title="Media Pickups"
            value={645}
            suffix="+"
            icon={Newspaper}
            color="#1676BF"
          />
          <MetricCard
            title="Guaranteed Views"
            value={125000}
            suffix=""
            icon={Eye}
            color="#10B981"
          />
          <MetricCard
            title="Engagement Rate"
            value={8.5}
            suffix="%"
            icon={TrendingUp}
            color="#F59E0B"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Reach Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-[#0B163F] mb-6">Reach Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D34586" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D34586" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1676BF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1676BF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v: number) => `${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B163F',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                  formatter={(value) => [value && value.toLocaleString(), '']}
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stroke="#D34586"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReach)"
                  name="Reach"
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#1676BF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Views"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D34586]" />
                <span className="text-gray-600 text-sm">Total Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1676BF]" />
                <span className="text-gray-600 text-sm">Confirmed Views</span>
              </div>
            </div>
          </motion.div>

          {/* Top Outlets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
          >
            <h3 className="text-xl font-bold text-[#0B163F] mb-6">Top Media Outlets</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pickupData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                <YAxis type="category" dataKey="outlet" stroke="#9CA3AF" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B163F',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <Bar
                  dataKey="pickups"
                  fill="#D34586"
                  radius={[0, 4, 4, 0]}
                  name="Pickups"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* World Map */}
        <WorldMapLeaflet />

        {/* Download Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-linear-to-r from-[#0B163F] to-[#1676BF] rounded-3xl p-8 lg:p-12"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Download Your Complete Report
              </h3>
              <p className="text-white/70">
                Get a comprehensive PDF report with all metrics, charts, and insights
              </p>
            </div>
            <Button size="lg" className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-8">
              <Download className="w-5 h-5 mr-2" />
              Download PDF Report
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}