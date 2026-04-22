"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Upload, FileText, X, Globe, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/Cart';
import { toast } from 'sonner';
import axios from 'axios';

export default function Cart() {
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    const fileRefs = useRef<Record<string, HTMLInputElement>>({});
    const { cart, setCart, removeFromCart } = useCart();

    const handleFileUpload = async (itemId: number, file: File) => {
        if (!file) return;

        setUploading(prev => ({ ...prev, [itemId]: true }));

        const formData = new FormData();
        formData.append("files", file);

        const res = await axios.post("/api/press-release-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const fileUrl = res.data.url;

        setCart(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, documentUrl: fileUrl }
                    : item
            )
        );

        setUploading(prev => ({ ...prev, [itemId]: false }));
        toast.success("Document attached!");
    };

    const handleRemoveDoc = async (itemId: number, fileUrl: string) => {
        try {
            setUploading(prev => ({ ...prev, [itemId]: true }));

            const res = await fetch("/api/images/delete-file", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filePath: fileUrl }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete file");
            }

            setCart(prev =>
                prev.map(item =>
                    item.id === itemId
                        ? { ...item, documentUrl: "" }
                        : item
                )
            );

            toast.success("Document removed!");
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Delete failed");
        } finally {
            setUploading(prev => ({ ...prev, [itemId]: false }));
        }
    };

    const handleDeletePost = async (itemId: number) => {
        const item = cart.find(i => i.id === itemId);
        removeFromCart(itemId);
        if (item && item.documentUrl) {
            await handleRemoveDoc(itemId, item.documentUrl);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#D34586]/10 flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-[#D34586]" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#0B163F]">Your Cart</h1>
                    </div>
                    <p className="text-gray-500 ml-13">{cart.length} guest post{cart.length !== 1 ? 's' : ''} selected</p>
                </motion.div>

                {cart.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-[#0B163F] mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Browse our guest post opportunities and add sites to your cart.</p>
                        <a href="/guestposting">
                            <Button className="bg-[#D34586] hover:bg-[#D34586]/90 text-white px-8">Browse Guest Posts</Button>
                        </a>
                    </motion.div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cart.map((item, i) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                                    >
                                        {/* Item Header */}
                                        <div className="p-5 flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="w-12 h-12 rounded-xl bg-[#0B163F]/5 flex items-center justify-center shrink-0">
                                                    <Globe className="w-6 h-6 text-[#0B163F]" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-[#0B163F] truncate">{item.websiteName}</h3>
                                                    {item.url && (
                                                        <a href={item.url} target="_blank" rel="noreferrer" className="text-[#1676BF] text-sm hover:underline truncate block">
                                                            {item.url}
                                                        </a>
                                                    )}
                                                    <div className="flex flex-wrap gap-2 mt-1.5">
                                                        {item.categories.name && <span className="text-xs bg-[#1676BF]/10 text-[#1676BF] px-2 py-0.5 rounded-full font-medium">{item.categories.name}</span>}
                                                        {item.da && <span className="text-xs bg-[#0B163F]/10 text-[#0B163F] px-2 py-0.5 rounded-full font-medium">DA {item.da}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="text-xl font-bold text-[#D34586]">${item.price}</span>
                                                <button onClick={() => handleDeletePost(item.id)} className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer">
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Attach Document */}
                                        <div className="px-5 pb-4 border-t border-gray-50 pt-4">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Attach Content / Article</p>
                                            {item.documentUrl ? (
                                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                                                    <FileText className="w-5 h-5 text-green-600 shrink-0" />
                                                    <a href={'/api/images?url='+item.documentUrl} target="_blank" rel="noreferrer" className="text-green-700 text-sm font-medium flex-1 truncate hover:underline">
                                                        {item.documentUrl.slice(0, 15) || 'Attached Document'}
                                                    </a>
                                                    <button onClick={() => handleRemoveDoc(item.id, item.documentUrl)} className="w-6 h-6 cursor-pointer rounded-full bg-green-100 flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors">
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <input
                                                        type="file"
                                                        ref={el => { if (el) fileRefs.current[item.id] = el; }}
                                                        className="hidden"
                                                        accept=".pdf,.doc,.docx,.txt"
                                                        onChange={e => e.target.files?.[0] && handleFileUpload(item.id, e.target.files[0])}
                                                    />
                                                    <button
                                                        onClick={() => fileRefs.current[item.id]?.click()}
                                                        disabled={uploading[item.id]}
                                                        className="flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#D34586] hover:bg-[#D34586]/5 text-gray-400 hover:text-[#D34586] transition-all text-sm font-medium w-full justify-center"
                                                    >
                                                        {uploading[item.id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                        {uploading[item.id] ? 'Uploading...' : 'Upload Article / Brief (PDF, DOC, TXT)'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-28">
                                <h2 className="text-lg font-bold text-[#0B163F] mb-5">Order Summary</h2>
                                <div className="space-y-3 mb-5">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600 truncate flex-1 mr-2">{item.websiteName}</span>
                                            <span className="font-semibold text-[#0B163F] shrink-0">${item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between font-bold text-[#0B163F]">
                                        <span>Total</span>
                                        <span className="text-[#D34586] text-xl">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => window.location.href = '/cart/checkout'}
                                    disabled={cart.some(item => !item.documentUrl)}
                                    className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white py-6 text-base font-semibold rounded-xl"
                                >
                                    Proceed to Checkout <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                                <p className="text-xs text-center text-gray-400 mt-3">Secure checkout · 100% satisfaction guarantee</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}