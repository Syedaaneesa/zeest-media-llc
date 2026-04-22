

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, FileText, Calendar, CreditCard, ArrowLeft, User2, Eye, X, Star, Menu, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import '@mouseoverllc/quill-image-resizer/dist/style.css';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js"
import { cn } from '@/lib/utils';
import { getPackagePrice, pressPackages } from '@/lib/pressPackages';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PressReleaseView from '@/components/pressrelease/PressReleaseView';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { marked } from 'marked';
import SubmissionMethodSelector from '@/components/pressrelease/SubmissionMethodSelection';
import AIWriterForm from '@/components/pressrelease/AIWriterForm';
import UploadDocForm from '@/components/pressrelease/UploadDocForm';
import { useSearchParams } from 'next/navigation';

const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill-new');
  return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
}, {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const steps = [
  { id: 1, name: 'Content', icon: FileText },
  { id: 2, name: 'Contact', icon: User2 },
  { id: 3, name: 'Schedule', icon: Calendar },
  { id: 4, name: 'Payment', icon: CreditCard },
];

const uploadImageToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", file);

  const res = await axios.post("/api/press-release-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url;
};

const MAX_LINKS = 13;

export default function PressForm({ user, formData, setFormData, currentStep, setCurrentStep }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [uploadFilesPressRelease, setUploadFilesPressRelease] = useState<string | File | null>(null);
  const [loading, setloading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const quillRef = useRef<any>(null);
  const [linkCount, setLinkCount] = useState(0);
  const [preview, setPreview] = useState(false)
  const [tone, seTtone] = useState<string | null>(null)
  const [sendProof, setSendProof] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [total, setTotal] = useState(formData.package)


  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
  }

  const timezones = [
    "Select",
    "(GMT-04:00) Atlantic Time (Canada)",
    "(GMT-05:00) Eastern Time (US & Canada)",
    "(GMT-06:00) Central Time (US & Canada)",
    "(GMT-07:00) Mountain Time (US & Canada)",
    "(GMT-08:00) Pacific Time (US & Canada)",
  ]

  const updateForm = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const loadQuillModules = async () => {
      const Quill = (await import("quill")).default;
      const ImageResizer = (await import("@mouseoverllc/quill-image-resizer")).default;

      Quill.register("modules/imageResizer", ImageResizer);
      setloading(false);
    };

    loadQuillModules();

    setTotal(formData.package)
  }, []);

  useEffect(() => {

    const handleEnhance = async () => {
      if (!formData.content || formData.content.length < 20) {
        toast.error("Please enter your press release content.");
        return;
      }

      setloading(true);
      try {
        const res = await fetch("/api/aienhance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: formData.content, tone }),
        });

        const data = await res.json();

        if (!data.success) {
          toast.error(data.error || "Failed to enhance press release.");
          return;
        }

        const html = marked.parse(data.text);

        setFormData((prev: any) => ({ ...prev, content: html }));

        toast.success("Press release enhanced!");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong. Try again.");
      } finally {
        setloading(false);
      }
    };

    if (tone) {
      handleEnhance()
    }

  }, [tone])


  const countLinks = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    if (!quill) return 0;

    const contents = quill.getContents();
    let count = 0;
    contents.ops?.forEach((op: any) => {
      if (op.attributes?.link) count++;
    });
    return count;
  }, []);


  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: async function () {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              if (!input.files?.length) return;

              const file = input.files[0];
              const quill = (this as any).quill;
              const range = quill.getSelection(true);

              try {
                setImageLoading(true);
                const imageUrl = await uploadImageToServer(file);
                quill.insertEmbed(range.index, "image", "/api/images?url=" + imageUrl);
                quill.setSelection(range.index + 1);
                setImageLoading(false);
              } catch (err) {
                toast.error("Image upload failed");
                setImageLoading(false);
              }
            };
          },

          link: function (this: any, value: boolean | string) {
            const quill = this.quill;

            if (!value) {
              quill.format('link', false);
              return;
            }

            if (countLinks() >= MAX_LINKS) {
              alert(`Maximum ${MAX_LINKS} links allowed.`);
              return;
            }

            const href = prompt('Enter the URL:');
            if (href) {
              quill.format('link', href);
            }
          },
        },
      },
      clipboard: {
        matchers: [
          [
            1,
            (node: Node, delta: any) => {
              if (node.nodeName === 'IMG') {
                const img = node as HTMLImageElement;

                if (img.src && img.src.startsWith('data:')) {
                  return new delta.constructor();
                }

                return delta;
              }

              const ops = delta.ops.filter((op: any) => {
                if (op.insert && op.insert.image) {
                  const imageSrc = op.insert.image;
                  if (typeof imageSrc === 'string' && imageSrc.startsWith('data:')) {
                    return false;
                  }
                }
                return true;
              });

              return new delta.constructor(ops);
            },
          ],
        ],
      },
      imageResizer: {
        keepAspectRatio: true
      }
    }), [countLinks]);


  useEffect(() => {
    if (!quillRef) return;
    const quill = quillRef.current?.editor;
    if (!quill) return;

    const handleTextChange = () => {
      const current = countLinks();
      setLinkCount(current);
    };

    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('text-change', handleTextChange);
    };
  }, [countLinks, loading, formData.content]);

  const handleSubmit = async () => {
    if (!formData.title || (!formData.content && formData.method !== "upload")) {
      toast.error("Please Make Sure You have filled Title and content fields");
      return
    }

    try {
      setSaving(true);
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          payload.append(key, String(value));
        }
      });

      payload.append("user_id", user?.id)

      if (featuredImage) {
        payload.append("featured_image", featuredImage);
      }

      if (companyLogo) {
        payload.append("company_logo", companyLogo);
      }

      if (uploadFilesPressRelease) {
        payload.append("upload_file_press_release", uploadFilesPressRelease);
      }

      payload.append("status", "draft");


      if (formData.id && formData.id !== undefined) {
        if ((formData.status !== 'rejected' && formData.status !== "draft") && user?.app_metadata?.superadmin !== true) {
          toast.error("Published press releases cannot be edited. Please contact support.");
          setIsSubmitting(false);
          setSaving(false);
          return;
        };
        payload.append("id", formData.id);
      }

      const res = await axios.post("/api/press-release", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status !== 201 && res.status !== 200) {
        toast.error(res.data.message || "Failed to submit. Please try again!");
        return;
      }

      setSaving(false);
      window.location.href = `/press-release/${res.data.data.id}?message=${encodeURI("Press release saved successfully!")}`;

    } catch (error: any) {
      toast.error(error.message || "Failed to submit. Please try again!")
      setSaving(false);
    };
  };


  const handleSubmitWithPayment = async () => {
  if (
    !formData.title ||
    (!formData.content && formData.method !== "upload")
  ) {
    toast.error("Please make sure title and content are filled");
    return;
  }

  try {
    setIsSubmitting(true);

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        payload.append(key, String(value));
      }
    });

    if (user) payload.append("user_id", user.id);
    if (featuredImage) payload.append("featured_image", featuredImage);
    if (companyLogo) payload.append("company_logo", companyLogo);
    if (uploadFilesPressRelease)
      payload.append("upload_file_press_release", uploadFilesPressRelease);
    if (formData.method) payload.append("method", formData.method);

    if (type === "edit" && formData.id) {
      if (formData.status !== "draft") {
        toast.error(
          "Published press releases cannot be edited. Please contact support."
        );
        setIsSubmitting(false);
        return;
      }
      payload.append("id", formData.id);
    }

    const res = await axios.post("/api/press-release", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status !== 201 && res.status !== 200) {
      toast.error(res.data.message || "Failed to submit.");
      return;
    }

    const id = res.data.data.id;
    const amount = getPackagePrice(formData.package);

    // ✅ 2. Create Payment Intent OR Free Order
    const paymentRes = await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(Number(amount)),
        id,
        code: coupon,
      }),
    });

    const data = await paymentRes.json();

    if (paymentRes.status !== 200) {
      toast.error(data.error || "Failed to initialize payment.");
      return;
    }

    if (data.free) {
      toast.success(data.message || "Order completed successfully");

      window.location.href = `/payment/success?id=${id}&coupon=${coupon}&email=${
        formData.contact_email || user?.email || ""
      }&name=${
        formData.contact_name ||
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "Customer"
      }&title=${formData.title}&publishTime=${
        formData.publish_type === "scheduled"
          ? formData.scheduled_date
          : "instant"
      }`;

      return;
    }

    // ✅ 4. STRIPE FLOW
    if (!stripe || !elements) {
      toast.error("Stripe not loaded yet.");
      return;
    }

    if (!data.clientSecret) {
      toast.error("Failed to initialize payment.");
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      toast.error(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: data.clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success?id=${id}&coupon=${coupon}&email=${
          formData.contact_email || user?.email || ""
        }&name=${
          formData.contact_name ||
          user?.user_metadata?.full_name ||
          user?.email?.split("@")[0] ||
          "Customer"
        }&title=${formData.title}&publishTime=${
          formData.publish_type === "scheduled"
            ? formData.scheduled_date
            : "instant"
        }`,
      },
    });

    if (error) {
      toast.error(error.message || "Payment failed.");
      return;
    }
  } catch (error: any) {
    toast.error(error.message || "Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: {
        const isUpload = formData.method === "upload";

        return (
          !!formData.package &&
          formData.title.trim().length > 0 &&
          (
            isUpload ||
            (
              formData.summary?.trim().length > 5 &&
              formData.content.length > 10
            )
          ) &&
          (formData.package === '199' ||
            formData.package === '299' ||
            formData.package === '599') &&
          linkCount <= MAX_LINKS
        );
      }

      case 2:
        return (
          formData.company_name.trim().length >= 2 &&
          formData.contact_name.trim().length >= 2 &&
          /\S+@\S+\.\S+/.test(formData.contact_email) &&
          formData.company_website.trim().length >= 3
        );

      case 3:
        if (formData.publish_type === "instant") return true;
        if (!formData.scheduled_date) return false;

        const selected = new Date(formData.scheduled_date);
        const now = new Date();
        return selected > now;

      case 4:
        return !!stripe && !!elements;

      default:
        return false;
    }
  };


const applyCoupon = async () => {
  try {
    const res = await axios.post("/api/admin/coupons/apply", {
      code: coupon,
      amount : formData.package,
      type: "press_release",
    });    

    const data = res.data.data;
    if (res.status == 200) {
      setTotal(Math.round(data.finalAmount * 100) / 100);
      setDiscount(data.discount)
      toast.success("Token Applied!")
      return;
    }else{
      toast.error(data.error || "Something Went Wrong!")
      return;
    }
  } catch (err: any) {
    toast.error("Failed to apply coupon");
  }
};


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        switch (formData.method) {
          case 'ai':
            return <AIWriterForm onBack={() => setFormData({ ...formData, method: null })} setForm={setFormData} />;
          default:
            return (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-3"
              >
                <button onClick={() => setFormData({ ...formData, method: null })} className="flex items-center gap-2 text-forground/50 hover:text-forground text-sm transition-colors mb-4 cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Back to options
                </button>

                <div>
                  <Label className="text-foreground mb-2 block">Package Type <i className='text-red-500'>*</i></Label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {pressPackages.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>{ 
                          setTotal(Number(option.value))
                          updateForm('package', formData.package === option.value ? '' : option.value)}}
                        className={cn(
                          "group relative flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all duration-200",
                          "hover:border-foreground/40 hover:shadow-sm hover:scale-[1.02]",
                          formData.package === option.value
                            ? "border-[#D34586] bg-[#D34586]/10 shadow-sm"
                            : "border-foreground/20 bg-foreground/5"
                        )}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <p className="font-semibold text-lg text-foreground">{option.label}</p>
                          <p className="text-xl font-bold text-foreground">{option.price}</p>
                        </div>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {option.desc}
                        </p>

                        {/* Optional: subtle checkmark when selected */}
                        {formData.package === option.value && (
                          <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-[#D34586] flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 my-2">

                  <div>
                    <Label className="text-forground mb-2 block">Company Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCompanyLogo(e.target.files?.[0] || null)}
                      className="border-foreground/20 text-forground file:text-forground"
                    />
                    {companyLogo && (
                      <p className="text-forground/60 text-sm mt-1">
                        Selected: {companyLogo.name || formData?.company_logo}
                      </p>
                    )}
                  </div>
                </div>
                {
                  companyLogo || formData?.company_logo ? (
                    <img src={companyLogo ? URL.createObjectURL(companyLogo) : formData?.company_logo} className='w-full max-w-52 h-auto max-h-100 object-cover rounded-2xl shadow' alt="Company Logo" />
                  ) : null
                }


                <div className="space-y-4 my-2">
                  {/* Featured Image */}
                  <div>
                    <Label className="text-forground mb-2 block">Featured Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
                      className="border-foreground/20 text-forground file:text-forground"
                    />
                    {featuredImage && (
                      <p className="text-forground/60 text-sm mt-1">
                        Selected: {featuredImage.name}
                      </p>
                    )}
                  </div>
                </div>
                {
                  featuredImage || formData?.featured_image ? (
                    <img src={featuredImage ? URL.createObjectURL(featuredImage) : formData?.featured_image} className='w-full h-auto max-h-100 object-cover rounded-2xl shadow' alt="Featured Image" />
                  ) : null
                }


                <div className='relative'>
                  <Label className="text-forground mb-2 block">Press Release Title<i className='text-red-500'>*</i></Label>
                  <Input
                    placeholder="Enter your headline..."
                    value={formData.title}
                    required={true}
                    onChange={(e) => updateForm('title', e.target.value)}
                    className="border-foreground/20 text-forground placeholder:text-forground/40"
                  />
                  {formData?.title && <p className={`absolute right-2 top-8 font-bold text-xs bg-white px-2 ${formData?.title?.length < 10 || formData?.title?.length > 70 ? 'text-red-400' : 'text-green-700'}`}>{formData?.title?.length}/ 70</p>}
                </div>

                {formData.method == 'upload' ? <UploadDocForm uploadFiles={uploadFilesPressRelease || formData.upload_file_press_release} setFormData={setFormData} setUploadFiles={setUploadFilesPressRelease} postId={formData.id || null} /> : (

                  <>

                    <div className='relative'>
                      <Label className="text-forground mb-2 block">Press Release Summary<i className='text-red-500'>*</i></Label>
                      <Input
                        placeholder="Enter your summary..."
                        value={formData.summary}
                        required={false}
                        onChange={(e) => updateForm('summary', e.target.value)}
                        className="border-foreground/20 text-forground placeholder:text-forground/40"
                      />
                      {formData?.summary && <p className={`absolute right-2 top-8 font-bold text-xs bg-white px-2 ${formData?.summary?.length < 10 || formData?.summary?.length > 250 ? 'text-red-400' : 'text-green-700'}`}>{formData?.summary?.length}/ 250</p>}

                    </div>

                    <div className='mt-8 relative'>
                      <Label className="text-forground mb-2 block">Content<i className='text-red-500'>*</i></Label>

                      <div className="text-black rounded-xl">
                        {loading ? (
                          <div className="w-full min-h-72 border-2 border-gray-500 rounded-2xl animate-pulse">
                            <div className="w-full min-h-72 bg-gray-400 rounded-2xl flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="relative">

                            <ReactQuill
                              forwardedRef={quillRef}
                              value={formData.content}
                              onChange={(value: any) => updateForm("content", value)}
                              theme="snow"
                              modules={modules}
                              placeholder="Write your press release content..."
                            />
                            {imageLoading && (
                              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4">
                                </motion.div>
                              </div>
                            )}

                          </div>
                        )}
                        <p className={`${linkCount > 13 ? 'text-red-500' : 'text-forground/50'}`}>links: {linkCount}   {linkCount > 13 && <span className="text-red-500">Maximum 13 links allowed</span>}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-forground mb-2 block">Enhance Your Content (Optional)</Label>
                      <p className="text-forground/50 text-sm mb-3">Choose a tone to professionally enhance your press release</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'professional', label: 'Professional', desc: 'Corporate & polished' },
                          { value: 'exciting', label: 'Exciting', desc: 'Energetic & dynamic' },
                          { value: 'formal', label: 'Formal', desc: 'Traditional & serious' },
                          { value: 'conversational', label: 'Conversational', desc: 'Friendly & approachable' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => seTtone(option.label)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${tone === option.value
                              ? 'border-[#D34586] bg-[#D34586]/20'
                              : 'border-foreground/20 hover:border-foreground/40 bg-foreground/5'
                              }`}
                          >
                            <p className="text-forground font-medium">{option.label}</p>
                            <p className="text-forground/50 text-xs">{option.desc}</p>
                          </button>
                        ))}
                      </div>

                    </div>

                  </>
                )}
              </motion.div>
            );
        }
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <Label className="text-forground mb-2 block">Company Name<i className='text-red-500'>*</i></Label>
              <Input
                placeholder="Your company name..."
                value={formData.company_name}
                onChange={(e) => updateForm('company_name', e.target.value)}
                className="border-foreground/20 text-forground placeholder:text-forground/40"
              />
            </div>
            <div>
              <Label className="text-forground mb-2 block">Company Website<i className='text-red-500'>*</i></Label>
              <Input
                placeholder="Website Domain Name..."
                value={formData.company_website}
                type='url'
                onChange={(e) => updateForm('company_website', e.target.value)}
                className="border-foreground/20 text-forground placeholder:text-forground/40"
              />
            </div>
            <div>
              <Label className="text-forground mb-2 block">Contact Name<i className='text-red-500'>*</i></Label>
              <Input
                placeholder="Full name..."
                value={formData.contact_name}
                onChange={(e) => updateForm('contact_name', e.target.value)}
                className="border-foreground/20 text-forground placeholder:text-forground/40"
              />
            </div>
            <div>
              <Label className="text-forground mb-2 block">Email<i className='text-red-500'>*</i></Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.contact_email}
                onChange={(e) => updateForm('contact_email', e.target.value)}
                className="border-foreground/20 text-forground placeholder:text-forground/40"
              />
            </div>
            <div>
              <Label className="text-forground mb-2 block">Phone</Label>
              <Input
                placeholder="+1 (555) 000-0000"
                value={formData.contact_phone}
                onChange={(e) => updateForm('contact_phone', e.target.value)}
                className="border-foreground/20 text-forground placeholder:text-forground/40"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Radio Group */}
            <div>
              <Label className="mb-3 block">Publish Option<i className='text-red-500'>*</i></Label>

              <RadioGroup
                value={formData.publish_type}
                onValueChange={(value) => {
                  updateForm("publish_type", value);

                  if (value === "instant") {
                    updateForm("scheduled_date", "");
                    updateForm("timezone", "");
                  }
                }}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="h-4 w-4" value="instant" id="instant" />
                  <Label htmlFor="instant">Publish Instantly</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem className="h-4 w-4" value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled">Schedule for Later</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Fields */}
            {formData.publish_type === "scheduled" && (
              <div className="flex items-center gap-x-6">
                <div>
                  <Label className="mb-2 block">Scheduled Date<i className='text-red-500'>*</i></Label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduled_date}
                    onChange={(e) =>
                      updateForm("scheduled_date", e.target.value)
                    }
                    className="border-foreground/20"
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => updateForm("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>

                    <SelectContent className="max-h-80">
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Please send me a copy (proof) of the release for my review before publishing it. */}
            <div className="flex items-center space-x-2 mt-10">

              <Input
                type='checkbox'
                checked={sendProof}
                id='my-proof'
                size={10}
                onChange={(e) => setSendProof(e.target.checked)}
                className="w-4 h-4 border-foreground/20 text-forground focus:ring-0"
              />
              <Label className="text-forground" htmlFor="my-proof">
                Please send me a copy (proof) of the release for my review before publishing it.
              </Label>
            </div>

          </motion.div>
        ); case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-forground mb-4">Order Summary</h3>
              <div className="space-y-3 text-forground/80 mb-4">
                <div className="flex justify-between">
                  <span>Package:</span>
                  <span className="capitalize">{formData.package}</span>
                </div>
                <div className="flex justify-between">
                  <span>Title:</span>
                  <span className="truncate max-w-50">{formData.title || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Company:</span>
                  <span>{formData.company_name || '-'}</span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-forground">
                    <span>Total:</span>
                    <span>
                      ${total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="coupons my-5 flex items-end gap-2">
                
                <div className='relative'>
                  <Label className="text-forground mb-2 block">Coupon</Label>
                  <Input
                    placeholder="Put Your Coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-fit border-foreground/20 text-forground placeholder:text-forground/40"
                  />

                </div>

                <Button className='text-white bg-primary' onClick={applyCoupon}>Apply Coupon</Button>

              </div>

              {discount > 0 && <p className='my-5 text-sm text-green-600'>You saved ${discount.toFixed(2)}</p>}

              {total > 0 && <PaymentElement />}
            </div>
            <p className="text-forground/60 text-sm text-center">
              Click submit to proceed to payment. Your press release will be reviewed within 24 hours.
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };


  if (!formData.method) {
    return (
      <div className="p-8 min-h-100 relative z-10 bg-background rounded-2xl border border-white/10">
        <AnimatePresence mode="wait">
          <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SubmissionMethodSelector onSelect={(method: string | null) => setFormData({ ...formData, method })} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }


  return (
    <div className="pr-5 pl-2 relative min-h-screen">

      <div className="w-full flex items-center justify-between sticky top-14 left-0 z-50 bg-background/95 py-2 mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center ">
              <motion.div
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: currentStep >= step.id ? '#D34586' : 'rgba(0,0,0,0.1)'
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 border-foreground/20"
              >
                {currentStep >= step.id ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <step.icon className="w-5 h-5 text-foreground" />
                )}
              </motion.div>
              <span className={`text-sm font-medium ${currentStep >= step.id ? 'text-forground' : 'text-forground/50'}`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 bg-foreground/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                  className="h-full bg-[#D34586]"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {
        preview && <div className="min-h-[70vh] bg-[#F8F9FC]  z-50 py-4 w-[98%] mx-auto">

          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => setPreview(false)}
            className="flex items-center gap-2 mx-7 my-2 text-[#0B163F]/60 hover:text-[#0B163F] border-2 border-[#0B163F]/60 rounded px-2 cursor-pointer py-1 transition-colors text-sm font-medium"
          >
            <X className="w-4 h-4" />
            Close Preview
          </motion.button>

          <PressReleaseView
            pressRelease={{
              ...formData,
              featured_image: featuredImage ?? formData.featured_image,
              company_logo: companyLogo ?? formData.company_logo,
              upload_file_press_release: uploadFilesPressRelease ?? formData.upload_file_press_release
            }}
            error={""}
          />
        </div>
      }


      {/* Step Content */}



      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>





      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-white/10 mb-10">
        <Button
          variant="ghost"
          onClick={() => {
            setPreview(false);
            setCurrentStep((prev: number) => prev - 1)
          }}
          disabled={currentStep === 1}
          className="text-forground hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className=" flex items-center justify-center gap-2">


          {
            currentStep === 3 && (
              <Button
                variant="ghost"
                onClick={() => setPreview(true)}
                className={cn(
                  "bg-[#D34586] hover:bg-[#D34586]/90 text-foreground"
                )}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            )
          }

          {currentStep < 4 ? (
            <Button
              onClick={() => {
                if (isStepValid(currentStep)) {
                  setPreview(false);
                  setCurrentStep((prev: number) => prev + 1);
                } else {
                  toast.error('Please fill in all required fields correctly before continuing.');
                }
              }}
              disabled={!isStepValid(currentStep)}
              className={cn(
                "bg-[#D34586] hover:bg-[#D34586]/90 text-foreground",
                !isStepValid(currentStep) && "opacity-60 cursor-not-allowed"
              )}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Button
                onClick={handleSubmit}
                disabled={saving || isSubmitting}
                className="bg-[#0B163F] border-2 border-foreground text-white"
              >
                {saving ? 'Saving...' : 'Save & Preview'}
              </Button>

              <Button
                onClick={handleSubmitWithPayment}
                disabled={saving || isSubmitting || !stripe || !elements}
                className="bg-[#D34586] hover:bg-[#D34586]/90 text-forground"
              >
                {isSubmitting ? 'Submitting...' : 'Submit & Pay'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}