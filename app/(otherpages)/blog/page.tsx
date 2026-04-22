"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Loader2, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
    }[];

    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}[];

export default function Blog() {
  const [posts, setPosts] = useState<PostsType>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setPosts([]);
      const response = await fetch(
        `https://zeestmedia.com/wp-json/wp/v2/posts?_embed&per_page=12&page=${pageNo}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const totalPages = response.headers.get("X-WP-TotalPages");
      setTotalPages(Number(totalPages) || 1)

      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts().catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, [pageNo]);

  const getFeaturedImage = (post: any) => {
    return post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  };

  const getAuthor = (post: any) => {
    return post?._embedded?.author?.[0]?.name || 'Zeest Media';
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-[#0B163F] py-32 mb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/20 text-[#D34586] mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Insights & News</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Zeest Media Blog
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Stay updated with the latest in PR, GEO, media distribution, and digital marketing.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#D34586] animate-spin mb-4" />
            <p className="text-gray-500">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">Unable to load blog posts. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => {
              const featuredImage = getFeaturedImage(post);
              const author = getAuthor(post);
              const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 120) + '...';
              const date = post.date ? format(new Date(post.date), 'MMM d, yyyy') : '';

              return (
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-linear-to-br from-[#0B163F] to-[#1676BF] overflow-hidden shrink-0">
                    {featuredImage ? (
                      <img
                        src={featuredImage}
                        alt={post.title?.rendered || ''}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h2
                      className="text-lg font-bold text-[#0B163F] mb-3 line-clamp-2 group-hover:text-[#D34586] transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered }}
                    />
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                      {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          <span>{author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[#D34586] text-xs font-semibold group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}

      </div>

      {totalPages > 1 && (
        <div className="my-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setTotalPages(totalPages - 1);
                  }}
                  className={pageNo === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Show current pageNo + some around it */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    (p >= pageNo - 2 && p <= pageNo + 2)
                )
                .map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === pageNo}
                      onClick={(e: any) => {
                        e.preventDefault();
                        setPageNo(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setPageNo(pageNo + 1);
                  }}
                  className={pageNo === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}