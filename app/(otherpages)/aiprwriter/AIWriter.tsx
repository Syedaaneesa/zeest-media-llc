"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, ArrowRight, Loader2, RefreshCw, CheckCircle, FileText, MessageSquare, Coins } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { marked } from 'marked';
import LoginClient from '../auth/login/LoginClient';


export default function AIPRWriter({ user, usage }: { user: any, usage: any }) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [keyQuotes, setKeyQuotes] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isUsed, setIsUsed] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [didShowLogin, setDidShowLogin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topicParam = params.get('topic');
    if (topicParam) setTopic(topicParam);

    const alreadyUsed = localStorage.getItem('ai-request');
    if (alreadyUsed && !user) {
      setIsUsed(true);
    }

    setRemaining(usage ? 10 - Number(usage.request_count) : 1);

  }, []);

  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Please enter a topic');
      return;
    }

    const alreadyUsed = localStorage.getItem('ai-request')
    if (alreadyUsed && !user) {
      toast.error('You have already generated a press release. Please log in to generate more.');
      setIsUsed(true);
      return;
    }

    if (remaining <= 0) {
      toast.error('You have reached your limit for generating press releases this week.');
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("/api/aigenerate", {
        method: "POST",
        body: JSON.stringify({
          title: topic,
          company: companyName,
          tone: tone,
          quotes: keyQuotes,
        }),
      });

      const data = await res.json();
      setRemaining((prev) => prev - 1);

      if (data.success) {
        if (!user) {
          setDidShowLogin(true);
        }
        setGeneratedContent(data?.result?.response);
        toast.success('Press release generated!');
        localStorage.setItem('ai-request', 'true');
        setIsUsed(true);
        return;
      }

      toast(data?.error || "Something Went Wrong!")
    } catch (error) {
      toast.error('Failed to generate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };


  const handleCopy = async () => {
    try {
      const htmlContent = await marked(generatedContent);

      const plainText = generatedContent.replace(/[*_~`]/g, '');

      await copyFormattedTextToClipboard(htmlContent, plainText);
    } catch (err) {
      console.error('Copy failed:', err);
      toast.error('Failed to copy formatted text');
    }
  };

  async function copyFormattedTextToClipboard(htmlContent: string, plainTextContent: string) {
    try {
      // Create clipboard blobs
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      const plainTextBlob = new Blob([plainTextContent], { type: 'text/plain' });

      const clipboardItem = new ClipboardItem({
        'text/html': htmlBlob,
        'text/plain': plainTextBlob,
      });

      await navigator.clipboard.write([clipboardItem]);
      toast.success('Formatted text copied to clipboard!');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy text to clipboard');
    }
  }


  return (
    <div className="relative min-h-screen pb-16">

      <div className="relative bg-[#0B163F] pt-32 pb-14 overflow-hidden">

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/20 text-[#D34586] mb-6 border border-[#D34586]/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Free AI Tool</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              AI Press Release  <span className="text-[#D34586]">Writer</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Generate professional press releases in seconds with our AI-powered tool
            </p>

            <Button onClick={() => window.scrollTo(0, 380)} size={'lg'} className='transition-all bg-primary text-white mt-8' >
              <FileText size={16} /> Try It Now
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-3">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold text-[#0B163F] mb-6">Enter Your Details</h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-[#0B163F] mb-2 block font-medium">Topic / Announcement *</Label>
                  <Input
                    placeholder="e.g., Company launches new AI-powered product..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border-gray-200 focus:border-[#D34586] focus:ring-[#D34586]"
                  />
                </div>

                <div>
                  <Label className="text-[#0B163F] mb-2 block font-medium">Company Name</Label>
                  <Input
                    placeholder="Your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="border-gray-200 focus:border-[#D34586] focus:ring-[#D34586]"
                  />
                </div>

                <div>
                  <Label className="text-[#0B163F] mb-2 block font-medium">Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="exciting">Exciting</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[#0B163F] mb-2 block font-medium">Key Quotes (Optional)</Label>
                  <Textarea
                    placeholder="Include any quotes you want in the press release..."
                    value={keyQuotes}
                    onChange={(e) => setKeyQuotes(e.target.value)}
                    className="border-gray-200 focus:border-[#D34586] focus:ring-[#D34586] min-h-25"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                  className="w-full bg-[#D34586] hover:bg-[#D34586]/90 text-white py-6 text-lg group"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Press Release
                    </>
                  )}
                </Button>


                {
                  usage && user ? (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2 justify-center">
                      <Button variant={'outline'}>🪙 {remaining}</Button>
                      {usage.request_count >= 10 ? "Please wait until your limit resets." : `You can generate ${remaining} more press releases this week.`}
                    </p>
                  ) : isUsed ? (
                    <div className="flex items-center  gap-2 justify-center">
                      <Button variant={'outline'}>🪙 0 </Button>
                      <p className="text-sm text-gray-500 text-center">Please <a href={`/auth/login?redirect=${encodeURI('/aiprwriter')}`} className="text-primary hover:underline">log in</a> to generate more.</p>
                    </div>
                  ) : (<div className="flex items-center gap-2 justify-center">
                    <Button variant={'outline'}>🪙 1 </Button>
                    <p className="text-sm text-gray-500 text-center"> <a href={`/auth/login?redirect=${encodeURI('/aiprwriter')}`} className="text-primary hover:underline">Log in</a> to track your usage and generate more!</p>
                  </div>
                  )
                }

              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 h-full relative flex flex-col">
              {didShowLogin &&
                <div className="w-full min-h-screen absolute top-0 left-0 height-full">
                  <LoginClient />
                </div>
              }
              <div className="flex sm:flex-row flex-col gap-2 items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#0B163F]">Generated Press Release</h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="text-gray-600"
                    >
                      {copied ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleGenerate} className="text-gray-600">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 min-h-100 border border-gray-100">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full py-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586] mb-4"
                    />
                    <p className="text-gray-500">Generating your press release...</p>
                  </div>
                ) : generatedContent ? (
                  <div className="prose prose-sm max-w-none">
                    {/* <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed"> */}
                    <MarkdownPreview source={!user? generatedContent.slice(0, 1300)+ "..." : generatedContent} style={{ background: 'transparent', color: 'inherit' }} />
                    {/* </pre> */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-[#D34586]/10 flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-[#D34586]" />
                    </div>
                    <p className="text-gray-500 mb-2">Your generated press release will appear here</p>
                    <p className="text-gray-400 text-sm">Fill in the details and click generate</p>
                  </div>
                )}
              </div>

              {generatedContent && (
                <div className="mt-6 p-4 rounded-xl bg-[#0B163F] text-white" >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Ready to distribute?</p>
                      <p className="text-white/60 text-sm">Reach 150M+ readers with Zeest Media</p>
                    </div>
                    <a onClick={async () => await handleCopy()} href={'/dashboard/sent-press-release?type=new'} className="flex items-center justify-center gap-2 rounded py-1.5 px-3 bg-[#D34586] hover:bg-[#D34586]/90 text-white">
                      Submit to Distribute
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}