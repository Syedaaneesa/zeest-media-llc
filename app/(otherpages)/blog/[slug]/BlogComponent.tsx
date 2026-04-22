"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Loader2, BookOpen, Clock, Share2, Twitter, Linkedin, Link2 } from 'lucide-react';
import { format } from 'date-fns';


type PostsType = {
  id: number;
  date: string;
  link: string;

  title: {
    rendered: string;
  };
  slug: string;
  excerpt: {
    rendered: string;
  };

  content?: {
    rendered: string;
  };

  _embedded?: {
    author?: {
      name: string;
      avatar_urls: string;
    }[];

    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
};

export default function BlogPost({slug}: {slug: string;}) {
  const [post, setPost] = useState<PostsType>();
  const [relatedPosts, setRelatedPosts] = useState<PostsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `https://zeestmedia.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
      );
      if (!response.ok) throw new Error('Failed to fetch post');
      const data = await response.json();
      if (!data.length) throw new Error('Post not found');
      setPost(data[0]);

      // Fetch related posts
      const relRes = await fetch(
        'https://zeestmedia.com/wp-json/wp/v2/posts?_embed&per_page=3'
      );
      const relData = await relRes.json();
      setRelatedPosts(relData.filter((p: PostsType)=> p.slug !== slug).slice(0, 3));
      setIsLoading(false);
    };
    fetchPost().catch(() => setIsLoading(false));
  }, [slug]);


  const getFeaturedImage = (p: PostsType) =>
    p?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  const getAuthor = (p: PostsType) =>
    p?._embedded?.author?.[0]?.name || 'Zeest Media';

  const getAuthorAvatar = (p: PostsType) =>
    p?._embedded?.author?.[0]?.avatar_urls?.['96'] || null;

  const readingTime = (content: string) => {
    const words = content?.replace(/<[^>]+>/g, '').split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 200));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#D34586] animate-spin" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0B163F] mb-2">Post not found</h2>
          <a href="/blog" className="text-[#D34586] hover:underline">← Back to Blog</a>
        </div>
      </div>
    );
  }

  const featuredImage = getFeaturedImage(post);
  const author = getAuthor(post);
  const authorAvatar = getAuthorAvatar(post);
  const date = post.date ? format(new Date(post.date), 'MMMM d, yyyy') : '';
  const minutes = readingTime(post.content?.rendered || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-[#0B163F] pt-24 pb-0 overflow-visible">
        <div className="absolute inset-0">
          {featuredImage && (
            <img src={featuredImage} alt="" className="w-full h-full object-cover opacity-10" />
          )}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D34586]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#1676BF]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-12">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </a>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1
              className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
            />

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={author} className="w-8 h-8 rounded-full border border-white/20" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#D34586]/30 flex items-center justify-center">
                    <User className="w-4 h-4 text-[#D34586]" />
                  </div>
                )}
                <span className="text-white font-medium">{author}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{minutes} min read</span>
              </div>
                          <button
              onClick={() => 
                navigator.share({
                  url: window.location.href,
                  title: encodeURIComponent(post.title?.rendered || ''),
                  text: encodeURIComponent(post.excerpt?.rendered.slice(0, 120) || '')
                })
              }
              className="w-10 h-10 rounded-full bg-[#D34586] text-white shadow-sm flex items-center justify-center animate-pulse hover:bg-white hover:text-black transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
            </div>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="relative h-12">
          <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,48 L1440,48 L1440,0 Q720,48 0,0 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* Featured Image */}
      {featuredImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-6 mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img src={featuredImage} alt={post.title?.rendered} className="w-full h-64 lg:h-96 object-cover" />
          </motion.div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="flex gap-12 lg:gap-16">
          {/* Share Sidebar (desktop) */}
          <div className="sticky top-32 left-0 hidden lg:flex flex-col items-center gap-4 pt-2 self-start">
            <p className="text-xs text-[#D34586] font-semibold uppercase tracking-widest -rotate-90 mb-6 whitespace-nowrap">Share</p>
            <button
              onClick={() => 
                navigator.share({
                  url: window.location.href,
                  title: encodeURIComponent(post.title?.rendered || ''),
                  text: encodeURIComponent(post.excerpt?.rendered.slice(0, 120) || '')
                })
              }
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>

          </div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 min-w-0"
          >
            <div
              className="prose prose-lg max-w-none
                prose-headings:text-[#0B163F] prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
                prose-a:text-[#D34586] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#0B163F]
                prose-ul:text-gray-600 prose-li:mb-1
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                prose-blockquote:border-l-4 prose-blockquote:border-[#D34586] prose-blockquote:bg-[#D34586]/5 prose-blockquote:rounded-r-xl prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:not-italic prose-blockquote:text-[#0B163F]"
                dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }}
            />

            {/* Mobile Share */}
            <div className="flex lg:hidden items-center gap-3 mt-10 pt-6 border-t border-gray-200">
              <span className="text-sm text-gray-500 font-medium">Share:</span>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1DA1F2] hover:text-white transition-all"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0077B5] hover:text-white transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button onClick={handleCopy} className="w-9 h-9 cursor-pointer rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#D34586] hover:text-white transition-all">
                <Link2 className="w-4 h-4" />
              </button>
              {copied && <span className="text-xs text-[#D34586]">Link copied!</span>}
            </div>

            {/* Author Card */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-5">
              {authorAvatar ? (
                <img src={authorAvatar} alt={author} className="w-16 h-16 rounded-full shrink-0" />
              ) : (
                 <img src="/logo/rocket-logo.png" alt="Zeest Media Logo" className="w-16 h-16 shrink-0 object-contain" />
              )}
              <div>
                <p className="text-xs text-[#D34586] font-semibold uppercase tracking-wider mb-1">Written by</p>
                <h4 className="text-lg font-bold text-[#0B163F]">{author}</h4>
                <p className="text-gray-500 text-sm mt-1">Expert contributor at Zeest Media — covering PR, GEO, and digital media strategy.</p>
              </div>
            </div>
          </motion.article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#0B163F]">Related Articles</h3>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => {
                const img = getFeaturedImage(rp);
                return (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={`/blog/${rp.slug}`}
                      className="group block bg-white rounded-2xl overflow-visible border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="h-36 bg-linear-to-br from-[#0B163F] to-[#1676BF] overflow-visible">
                        {img ? (
                          <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-white/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p
                          className="text-sm font-bold text-[#0B163F] group-hover:text-[#D34586] transition-colors line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: rp.title?.rendered }}
                        />
                        <p className="text-xs text-gray-400 mt-2">
                          {rp.date ? format(new Date(rp.date), 'MMM d, yyyy') : ''}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}