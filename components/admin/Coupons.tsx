import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Pencil, Trash2, Tag, CheckCircle, XCircle,
    Loader2, X, Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";


const empty = {
    code: '', discount_type: 'percentage', discount_value: '',
    max_uses: '', valid_from: '', valid_until: '',
    is_active: true, applies_to: 'both',
};

const appliesToLabel = { guest_post: 'Guest Post', press_release: 'Press Release', both: 'Both' };
export type Coupon = {
    id: string;

    code: string;

    discount_type: 'percentage' | 'fixed';
    discount_value: number;

    max_uses: number | null;
    used_count: number;

    valid_from: string;
    valid_until: string | null;

    is_active: boolean;

    applies_to: 'guest_post' | 'press_release' | 'both';

    created_at: string;
};
export default function AdminCoupons() {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [loading, setLoading] = useState(false)
    const [isSending, setIsSending] = useState(false)


    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const couponsData = await fetch('/api/admin/coupons')
            const jsData = await couponsData.json();
            if (jsData.success) {
                setCoupons(jsData?.data || []);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching coupons:', error);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const openCreate = () => { setEditing(null); setForm(empty); setShowForm(true); };
    const openEdit = (c: any) => {
        setEditing(c.id);
        setForm({
            code: c.code || '',
            discount_type: c.discount_type || 'percentage',
            discount_value: c.discount_value ?? '',
            max_uses: c.max_uses ?? '',
            valid_from: c.valid_from ? c.valid_from.slice(0, 16) : '',
            valid_until: c.valid_until ? c.valid_until.slice(0, 16) : '',
            is_active: c.is_active ?? true,
            applies_to: c.applies_to || 'both',
        });
        setShowForm(true);
    };
    const closeForm = () => { setShowForm(false); setEditing(null); setForm(empty); };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSending(true)
        const payload = {
            ...form,
            discount_value: Number(form.discount_value),
            max_uses: form.max_uses !== '' ? Number(form.max_uses) : null,
            valid_from: form.valid_from || null,
            valid_until: form.valid_until || null,
        };

        try {
            if (editing) {
                const res = await axios.put(`/api/admin/coupons/${editing}`, payload);
                if (res.status == 200 || res.status == 201) {
                    toast.success("Coupon Successfully Edited!")
                    return;
                }

                toast.error("Something Went Wrong!")
            } else {
                const res = await axios.post(`/api/admin/coupons`, payload);
                if (res.status == 200 || res.status == 201) {
                    toast.success("Coupon Successfully Edited!")
                    return;
                }
                toast.error("Something Went Wrong!")
            }

        } catch (err: any) {
            toast.error("Error:" + err.message);
        } finally {
            setIsSending(false);
            closeForm()
            await fetchCoupons()
        }
    };


    const deleteCoupon = async (id: string) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/admin/coupons/${id}`);
            if (res.status == 200) {
                toast.success("Coupon Successfully Deleted!")
                return;
            }

            toast.error("Something Went Wrong!")

        } catch (err: any) {
            toast.error("Error:" + err.message);
        } finally {
            await fetchCoupons()
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0B163F]">Coupons</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manage discount codes for your products</p>
                </div>
                <Button onClick={openCreate} className="bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Coupon
                </Button>
            </div>

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={closeForm}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#0B163F]">{editing ? 'Edit Coupon' : 'New Coupon'}</h3>
                                    <button onClick={closeForm} className="text-gray-400 cursor-pointer hover:text-gray-600"><X className="w-5 h-5" /></button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Code */}
                                    <div>
                                        <Label className="text-[#0B163F] font-medium mb-1 block">Code *</Label>
                                        <Input
                                            value={form.code}
                                            onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })}
                                            placeholder="e.g. SAVE20"
                                            required
                                        />
                                    </div>

                                    {/* Discount Type + Value */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Discount Type *</Label>
                                            <select
                                                value={form.discount_type}
                                                onChange={e => setForm({ ...form, discount_type: e.target.value })}
                                                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            >
                                                <option value="percentage">Percentage (%)</option>
                                                <option value="fixed">Fixed ($)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Value *</Label>
                                            <Input
                                                type="number" min="0" step="0.01"
                                                value={form.discount_value}
                                                onChange={e => setForm({ ...form, discount_value: e.target.value })}
                                                placeholder={form.discount_type === 'percentage' ? '20' : '10.00'}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Applies To + Max Uses */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Applies To</Label>
                                            <select
                                                value={form.applies_to}
                                                onChange={e => setForm({ ...form, applies_to: e.target.value })}
                                                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                            >
                                                <option value="both">Both</option>
                                                <option value="guest_post">Guest Post</option>
                                                <option value="press_release">Press Release</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Max Uses</Label>
                                            <Input
                                                type="number" min="1"
                                                value={form.max_uses}
                                                onChange={e => setForm({ ...form, max_uses: e.target.value })}
                                                placeholder="Unlimited"
                                            />
                                        </div>
                                    </div>

                                    {/* Valid From / Until */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Valid From</Label>
                                            <Input
                                                type="datetime-local"
                                                value={form.valid_from}
                                                onChange={e => setForm({ ...form, valid_from: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-[#0B163F] font-medium mb-1 block">Valid Until</Label>
                                            <Input
                                                type="datetime-local"
                                                value={form.valid_until}
                                                onChange={e => setForm({ ...form, valid_until: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Active Toggle */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setForm({ ...form, is_active: !form.is_active })}
                                            className={`relative w-11 h-6 rounded-full transition-colors ${form.is_active ? 'bg-[#D34586]' : 'bg-gray-300'}`}
                                        >
                                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-5' : ''}`} />
                                        </button>
                                        <Label className="text-[#0B163F] font-medium cursor-pointer" onClick={() => setForm({ ...form, is_active: !form.is_active })}>
                                            {form.is_active ? 'Active' : 'Inactive'}
                                        </Label>
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button type="button" variant="outline" onClick={closeForm} className="flex-1 cursor-pointer">Cancel</Button>
                                        <Button type="submit" className="flex-1 cursor-pointer bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                                            {isSending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            {editing ? 'Save Changes' : 'Create Coupon'}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-7 h-7 animate-spin text-[#D34586]" /></div>
            ) : coupons.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                        <Tag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0B163F] mb-2">No coupons yet</h3>
                    <p className="text-gray-500 mb-4">Create your first discount coupon to get started.</p>
                    <Button onClick={openCreate} className="bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add Coupon
                    </Button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Code</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Discount</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Applies To</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Uses</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Valid Until</th>
                                    <th className="text-left px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Status</th>
                                    <th className="px-5 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {coupons.map((c, i) => (
                                    <motion.tr
                                        key={c.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-4">
                                            <span className="font-mono font-bold text-[#0B163F] bg-[#0B163F]/5 px-2 py-1 rounded-lg uppercase">{c.code}</span>
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-[#D34586]">
                                            {c.discount_type === 'percentage' ? `${c.discount_value}%` : `$${c.discount_value}`}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">{appliesToLabel[c.applies_to] || c.applies_to}</td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {c.used_count ?? 0}{c.max_uses ? ` / ${c.max_uses}` : ' / ∞'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-500">
                                            {c.valid_until ? new Date(c.valid_until).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => { }}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${c.is_active
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {c.is_active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                {c.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2 justify-end">
                                                <button
                                                    onClick={() => openEdit(c)}
                                                    className="w-8 h-8 cursor-pointer rounded-lg bg-gray-100 hover:bg-[#1676BF]/10 hover:text-[#1676BF] flex items-center justify-center transition-colors"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

                                                <Dialog>
                                                    <DialogTrigger  className="w-8 h-8 cursor-pointer rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                The action will not be undo!
                                                            </DialogDescription>

                                                            <div className="flex items-center justify-between mt-10">
                                                                <DialogClose asChild>

                                                                    <Button variant={'secondary'} className='text-white'>Cancel</Button>
                                                                </DialogClose>

                                                                <DialogClose asChild>
                                                                    <Button variant={'default'}
                                                                        onClick={() => deleteCoupon(c.id)}
                                                                        className='text-white'>Delete</Button>
                                                                </DialogClose>

                                                            </div>
                                                        </DialogHeader>
                                                    </DialogContent>
                                                </Dialog>


                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}