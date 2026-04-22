"use client";
import { motion } from 'framer-motion';
import { FileCheck, CheckCircle, XCircle, AlertTriangle, Globe, Clock, RefreshCw, Award } from 'lucide-react';

const standards = [
    {
        icon: CheckCircle,
        color: '#10B981',
        title: 'What We Accept',
        bg: '#F0FDF4',
        border: '#BBF7D0',
        items: [
            'New product or service launches',
            'Corporate milestones and funding announcements',
            'Executive appointments and promotions',
            'Mergers, acquisitions, and partnerships',
            'Research findings and industry reports',
            'Events, conferences, and award recognitions',
            'Non-profit initiatives and community impact',
            'Legal settlements (public interest only)',
        ],
    },
    {
        icon: XCircle,
        color: '#EF4444',
        title: 'What We Reject',
        bg: '#FEF2F2',
        border: '#FECACA',
        items: [
            'False, misleading, or unverifiable claims',
            'Content promoting illegal activities',
            'Hate speech, discrimination, or offensive material',
            'Spam, repetitive, or low-quality submissions',
            'Unsubstantiated health or financial claims',
            'Plagiarized or previously published content',
            'Personal opinions masquerading as news',
            'Explicit, adult, or inappropriate material',
        ],
    },
];

const process = [
    { step: '01', title: 'Submission', desc: 'Your press release is received and a unique ID is assigned.', icon: FileCheck, color: '#1676BF' },
    { step: '02', title: 'Editorial Review', desc: 'Our editors verify accuracy, completeness, and policy compliance.', icon: Award, color: '#D34586' },
    { step: '03', title: 'Optimization', desc: 'Content is optimized for SEO and GEO (AI search visibility).', icon: Globe, color: '#10B981' },
    { step: '04', title: 'Scheduling', desc: 'Release is queued for distribution on your requested date and time.', icon: Clock, color: '#F59E0B' },
    { step: '05', title: 'Distribution', desc: 'Simultaneous distribution across all assigned media outlets.', icon: RefreshCw, color: '#8B5CF6' },
    { step: '06', title: 'Reporting', desc: 'Analytics report delivered showing reach, pickups, and engagement.', icon: CheckCircle, color: '#0B163F' },
];

const guidelines = [
    { title: 'Word Count', desc: 'Press releases must be between 300–800 words. Summaries under 300 words may be rejected.' },
    { title: 'Format', desc: 'Must include a headline, dateline, lead paragraph, body, boilerplate, and contact information.' },
    { title: 'Language', desc: 'Must be written in professional English. Non-English submissions are accepted for international packages only.' },
    { title: 'Images & Media', desc: 'Images must be high-resolution (min 800x600px). No watermarked or copyrighted images without permission.' },
    { title: 'Links', desc: 'Maximum 2 hyperlinks per release. Links must be relevant and lead to legitimate websites.' },
    { title: 'Attribution', desc: 'All quotes must be attributed to a real, named individual. Fabricated quotes are grounds for rejection.' },
    { title: 'Embargo', desc: 'Embargoed releases are accepted. Clearly state the embargo date/time in your submission notes.' },
    { title: 'Revisions', desc: 'Revisions are allowed per your package. Revision requests must be submitted before distribution begins.' },
];

export default function PublicationPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative bg-[#0B163F] pt-32 pb-24 overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Publication Policy</h1>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">
                            Our editorial standards ensure every press release we distribute meets the highest quality bar and reaches the right audiences.
                        </p>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm">
                            Last updated: March 24, 2026
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-2xl md:text-4xl font-bold mt-2 mb-6">Content Distribution (Press Release and Guest Posting)</h1>
                <p><strong>Information Collection and Use:</strong></p>
                <ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet"><span className="ql-ui" contentEditable="false"></span><span>We collect basic contact information such as your name, email address, and company details for communication purposes and to facilitate the distribution of content, including press releases and guest posts.</span></li></ol>
                <p><strong>Content Distribution:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet"><span className="ql-ui" contentEditable="false"></span><span>Zeest Media and Marketing distributes content, including press releases and guest posts, to a curated list of third-party websites. However, it is important to note that all websites in our distribution list are third-party entities, and any changes to their policies regarding content removal or alterations are beyond our control.</span></li></ol>
                <p><strong>Refund Policy:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet"><span className="ql-ui" contentEditable="false"></span><span>Due to the nature of our service, which involves pre-payment for content distribution, Zeest Media and Marketing operates on a strict no-refund policy. Once payment is made, it is non-refundable, and we cannot guarantee the retention or visibility of content on third-party websites.</span></li></ol>
                <p><strong>Responsibility Disclaimer:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet"><span className="ql-ui" contentEditable="false"></span><span>Zeest Media and Marketing is not responsible for any changes in content policies or decisions made by the third-party websites in our distribution list. If a website decides to change its policies or remove content for any reason, Zeest Media will not be held accountable.</span></li></ol>
                <p><strong>Press Release Guidelines:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-3"><span className="ql-ui" contentEditable="false"></span><span>Zeest Media Press Releases should adhere to the following guidelines:</span></li><li data-list="bullet" className="ql-indent-3"><span className="ql-ui" contentEditable="false"></span><span>Must be newsworthy, accurate, and in an acceptable press release format.</span></li>
                    <li data-list="bullet" className="ql-indent-3"><span className="ql-ui" contentEditable="false"></span><span>Should not contain advertising hype, direct address, or spam.</span></li><li data-list="bullet" className="ql-indent-3"><span className="ql-ui" contentEditable="false"></span><span>Must have a clear, timely, and newsworthy angle.</span></li></ol>
                <p><strong>Press Release Content Features/Qualities:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Newsworthy Content: Timely information about a new product or service, business expansion, organizational milestone, or expert opinion on a current news topic.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Objective Tone: Avoid hype flags and direct address to maintain credibility.</span></li>
                    <li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Legally Accurate: Legal references require proper documentation.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Valid Contact Info: Press releases must include a valid phone number and email address.</span></li></ol><p><strong>Formatting and Length:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span>
                        <span>Press releases should be between 300 and 1200 words with standard grammar and spelling.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Avoid HTML tags, non-standard characters, and excessive capitalization.</span></li></ol><p><strong>Content Restrictions:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Zeest Media does not distribute:</span></li>
                    <li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Advertisements.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Personal opinions intended to harm or exact revenge.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Explicitly sexually explicit content.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span>
                        <span>SPAM, link SPAM, blog posts, and opinion pieces.</span></li></ol><p><strong>Unaccepted Attachments and Content Types:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Zeest Media does not accept releases with links or attachments with extensions other than specified formats.</span></li><li data-list="bullet" className="ql-indent-2"><span className="ql-ui" contentEditable="false"></span><span>Restrictions on sexually explicit content, SPAM, link SPAM, blog posts, opinion pieces, reprints, fiction, duplicate content, and content with the intent to harm.</span></li></ol>
                <p><strong>Additional Restrictions:</strong></p><ol className='list-disc list-inside my-2 ml-6'><li data-list="bullet" className="ql-indent-1"><span className="ql-ui" contentEditable="false"></span><span>Unauthorized Ticker Symbols.</span></li><li data-list="bullet" className="ql-indent-1"><span className="ql-ui" contentEditable="false"></span><span>Online Gambling, Streaming Video Sites, Payday or Short Term Loans, Online Pharmaceuticals, Work from Home, Stock Recommendations, Electronic Cigarettes, Green Coffee Beans, Raspberry Ketone, Over-optimization, Illegal Cell Phone or Tablet Unlocking, BlackHat SEO Tactics.</span></li></ol>
                <p><span>Zeest Media retains the authority to eliminate news releases found to have acquired unnatural inbound links through engagement in paid link schemes. Periodically, Zeest Media may assess client releases to guarantee their ongoing adherence to search engine Webmaster Guidelines.</span></p><p><span>By using our services, you acknowledge that you have read, understood, and agree to the terms outlined in this Publication/Privacy Policy. Zeest Media and Marketing reserves the right to update or modify this policy at any time, and users are encouraged to check for changes periodically.</span></p><p><span>If you have any questions or concerns regarding this policy, please contact us at</span><strong style={{ color: "rgb(7, 28, 77)" }}>
                    <a href="mailto:info@zeestmedia.com" rel="noopener noreferrer" target="_blank"> info@zeestmedia.com</a></strong></p><p><br /></p></div>

            {/* 
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {standards.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl p-8 border"
              style={{ background: s.bg, borderColor: s.border }}>
              <div className="flex items-center gap-3 mb-6">
                <s.icon className="w-7 h-7" style={{ color: s.color }} />
                <h2 className="text-xl font-bold text-[#0B163F]">{s.title}</h2>
              </div>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: s.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/10 text-[#D34586] mb-4 text-sm font-semibold">
              <RefreshCw className="w-4 h-4" /> Our Process
            </div>
            <h2 className="text-3xl font-bold text-[#0B163F]">From Submission to Distribution</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Every press release goes through a rigorous multi-step process before reaching media outlets.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="text-3xl font-black opacity-10 text-[#0B163F] leading-none">{p.step}</div>
                  <div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                      style={{ backgroundColor: `${p.color}15` }}>
                      <p.icon className="w-5 h-5" style={{ color: p.color }} />
                    </div>
                    <h3 className="font-bold text-[#0B163F] mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1676BF]/10 text-[#1676BF] mb-4 text-sm font-semibold">
              <AlertTriangle className="w-4 h-4" /> Submission Guidelines
            </div>
            <h2 className="text-3xl font-bold text-[#0B163F]">Formatting & Content Requirements</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {guidelines.map((g, i) => (
              <motion.div key={g.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                <div className="w-2 rounded-full shrink-0" style={{ background: 'linear-gradient(to bottom, #D34586, #1676BF)', minHeight: '100%' }} />
                <div>
                  <h3 className="font-bold text-[#0B163F] mb-1">{g.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{g.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl p-8 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0B163F 0%, #1676BF 100%)' }}>
          <AlertTriangle className="w-10 h-10 text-[#D34586] mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">Press Release Rejected?</h3>
          <p className="text-white/70 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
            If your submission was rejected, our editorial team will provide a reason. You may revise and resubmit, or appeal the decision by contacting our editorial team directly.
          </p>
          <a href="mailto:editorial@zeestmedia.com"
            className="inline-flex items-center gap-2 bg-[#D34586] hover:bg-[#D34586]/90 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
            <FileCheck className="w-4 h-4" /> Contact Editorial Team
          </a>
        </motion.div>
      </div> */}
        </div>
    );
}