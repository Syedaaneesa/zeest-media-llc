"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, Mail, Bell, Shield, Package } from 'lucide-react';
import { toast } from 'sonner';


interface AdminSettingsType {
    site_name: string;
    support_email: string;
    auto_approve: boolean;
    email_notifications: boolean;
    basic_price: string;
    premium_price: string;
    enterprise_price: string;
    review_time_hours: string;
    max_daily_submissions: string;
}

export default function AdminSettings() {
    const [saved, setSaved] = useState(false);

    const [settings, setSettings] = useState<AdminSettingsType>({
        site_name: 'Zeest AI Media Suite',
        support_email: 'info@zeestmedia.com',
        auto_approve: false,
        email_notifications: true,
        basic_price: '299',
        premium_price: '599',
        enterprise_price: '1299',
        review_time_hours: '24',
        max_daily_submissions: '50',
    });

    const update = (key: string, value: string | boolean) => setSettings(prev => ({ ...prev, [key]: value }));

    const handleSave = () => {
        setSaved(true);
        toast.success('Settings saved successfully');
        setTimeout(() => setSaved(false), 2000);
    };

    const sections = [
        {
            title: 'General', icon: Globe, fields: [
                { label: 'Site Name', key: 'site_name', type: 'text' },
                { label: 'Support Email', key: 'support_email', type: 'email' },
            ]
        },
        {
            title: 'Pricing', icon: Package, fields: [
                { label: 'Basic Package Price ($)', key: 'basic_price', type: 'number' },
                { label: 'Premium Package Price ($)', key: 'premium_price', type: 'number' },
                { label: 'Enterprise Package Price ($)', key: 'enterprise_price', type: 'number' },
            ]
        },
        {
            title: 'Operations', icon: Shield, fields: [
                { label: 'Review Time (hours)', key: 'review_time_hours', type: 'number' },
                { label: 'Max Daily Submissions', key: 'max_daily_submissions', type: 'number' },
            ]
        },
    ];

    const toggles = [
        { label: 'Auto-approve submissions', desc: 'Automatically approve submitted press releases without manual review', key: 'auto_approve' },
        { label: 'Email notifications', desc: 'Send email alerts for new submissions and status changes', key: 'email_notifications' },
    ];

    return (
        <div className="max-w-3xl space-y-6">
            {sections.map((section, si) => {
                const Icon = section.icon;
                return (
                    <motion.div key={section.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.07 }}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0B163F]/8 flex items-center justify-center">
                                <Icon className="w-4 h-4 text-[#0B163F]" />
                            </div>
                            <h2 className="font-bold text-[#0B163F]">{section.title}</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {section.fields.map(field => (
                                <div key={field.key}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                                    <input
                                        type={field.type}
                                        value={settings[field.key]}
                                        onChange={e => update(field.key, e.target.value)}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D34586]/20 focus:border-[#D34586]"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}

            {/* Toggles */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0B163F]/8 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-[#0B163F]" />
                    </div>
                    <h2 className="font-bold text-[#0B163F]">Preferences</h2>
                </div>
                <div className="p-6 space-y-5">
                    {toggles.map(t => (
                        <div key={t.key} className="flex items-center justify-between gap-6">
                            <div>
                                <p className="text-sm font-semibold text-[#0B163F]">{t.label}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
                            </div>
                            <button
                                onClick={() => update(t.key, !settings[t.key])}
                                className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${settings[t.key] ? 'bg-[#D34586]' : 'bg-gray-200'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[t.key] ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all ${saved ? 'bg-green-500' : 'bg-[#D34586] hover:bg-[#D34586]/90'
                        }`}
                >
                    <Save className="w-4 h-4" />
                    {saved ? 'Saved!' : 'Save Settings'}
                </button>
            </div>
        </div>
    );
}