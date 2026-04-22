"use client";

import convertToSubcurrency from '@/lib/convertToSubcurrency';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import PressForm from './PressForm';
import AppSidebar from '../AppSidebar';
import { Bell, Menu } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const StripeWrapper = ({ user }: any) => {

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const selectedPackage = searchParams.get("package") || '599';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingPostById, setloadingPostById] = useState(false);

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }

    const [formData, setFormData] = useState({
      id: '',
      method: null,
      title: '',
      summary: '',
      content: '',
      package: selectedPackage || '599',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
      company_name: '',
      company_website: '',
      scheduled_date: '',
      company_logo: '',
      featured_image: '',
      upload_file_press_release: '',
      timezone: '',
      status: 'draft',
      publish_type: null,
    });

  useEffect(() => {
    const fetchPressRelease = async () => {
      setloadingPostById(true);
      try {
        const response = await fetch(`/api/press-release/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch press release');
        }
        const { data } = await response.json();

        if ((data.status !== 'draft' && data.status !== 'rejected') && user?.app_metadata?.superadmin !== true) {
          window.location.href = `/dashboard?message=With status of ${data.status}, this press release cannot be edited. Please contact support for more information.`;
        }

        setCurrentStep(4);
        setFormData({
          id: data.id || '',
          method: data.method || null,
          title: data.title || '',
          summary: data.summary || '',
          content: data.content || '',
          package: data.package || '599',
          contact_name: data.contact_name || '',
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
          company_name: data.company_name || '',
          company_website: data.company_website || '',
          scheduled_date: data.scheduled_date || '',
          featured_image: data.featured_image || '',
          company_logo: data.company_logo || '',
          upload_file_press_release: data.upload_file_press_release || '',
          timezone: data.timezone || '',
          status: data.status || 'draft',
          publish_type: data.publish_type || null,
        });
        setloadingPostById(false);
      } catch (error) {
        console.error('Error fetching press release:', error);
        setloadingPostById(false);
      }
    };

    if (id) {
      fetchPressRelease();
    }

  }, [id, user])




  return (
    <div className="w-full min-h-screen flex">

      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-[#0B163F]">
                Dashboard
              </h1>
              <p className="text-xs text-gray-400">Zeest Media</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D34586] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#D34586] flex items-center justify-center text-white text-sm font-bold">
              {user?.user_metadata?.full_name?.[0] || 'A'}
            </div>
          </div>
        </header>

        <div className="w-full mx-auto px-6 py-3 min-h-[90vh]">

          <Elements stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(Number(formData.package) || 599),
              currency: "usd"
            }}
          >
            <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /></div>}>
              {
                !loadingPostById ? <PressForm formData={formData} setFormData={setFormData} user={user} currentStep={currentStep} setCurrentStep={setCurrentStep} /> : <div className="w-full min-h-screen flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4 animate-spin flex items-center justify-center" /></div>
              }
            </Suspense>
          </Elements>
        </div>

      </div>
    </div>
  )
}

export default StripeWrapper;