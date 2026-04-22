"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Filter, TrendingUp, Search, Loader, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import qs from "qs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { useCart } from "@/context/Cart";

type Category = { id: number; name: string };

export default function GuestPosting() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<(number | "All")[]>(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [daFilter, setDaFilter] = useState(0);
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [minMax, setMinMax] = useState([50, 5000])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedMinMax, setDebouncedMinMax] = useState(minMax);
  const { addToCart, removeFromCart, cart } = useCart();


  const limit = 15;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedMinMax(minMax);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [minMax]);

  const categoryOrder = [
    "All Niche Accepted",
    "Premium Websites",
    "Business",
    "Fashion & LifeStyle",
    "International Websites"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");

        const sortedCategories = res.data.sort((a: any, b: any) => {
          const indexA = categoryOrder.indexOf(a.name);
          const indexB = categoryOrder.indexOf(b.name);

          // If category not found in order, push it to end
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });

        setCategories(sortedCategories);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const toggleNiche = (categoryId: number | "All") => {
    if (categoryId === "All") {
      setSelectedCategoryIds(["All"]);
    } else {
      const newIds = selectedCategoryIds.filter((id) => id !== "All");

      if (newIds.includes(categoryId)) {
        const filtered = newIds.filter((id) => id !== categoryId);
        setSelectedCategoryIds(filtered.length === 0 ? ["All"] : filtered);
      } else {
        setSelectedCategoryIds([...newIds, categoryId]);
      }
    }
    setPage(1);
  };


  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);

        const categories =
          selectedCategoryIds.includes("All") || selectedCategoryIds.length === 0
            ? undefined
            : selectedCategoryIds;


        const response = await axios.get("/api/guest-posts", {
          params: {
            page,
            limit,
            minMax: debouncedMinMax,
            search: searchQuery,
            categories,
            minDA: daFilter,
          },
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }),
        });


        const { data, pagination } = response.data;

        setSites(data || []);
        setTotalPages(pagination?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching guest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [searchQuery, selectedCategoryIds, daFilter, page, debouncedMinMax]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };



  return (
    <div className="w-full min-h-screen bg-gray-50 pb-16">
      <div className="min-h-[80vh] relative bg-[#0B163F] pt-32  flex flex-col items-center justify-center pb-14 overflow-hidden">

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D34586]/20 text-[#D34586] mb-6 border border-[#D34586]/30">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">High-DA Backlinks</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Guest Posting <span className="text-[#D34586]"> Services</span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 shrink-0"
          >
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-[#0B163F]" />
                <h3 className="font-bold text-[#0B163F]">Filter by Niche</h3>
              </div>

              <div className="space-y-3 mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox
                    checked={selectedCategoryIds.includes("All")}
                    onCheckedChange={() => toggleNiche("All")}
                    className="border-gray-300 data-[state=checked]:bg-[#D34586]"
                  />
                  <span className="text-gray-700">All</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <Toggle
                      key={cat.id}
                      pressed={selectedCategoryIds.includes(cat.id)}
                      onPressedChange={() => toggleNiche(cat.id)}
                      className="data-[state=on]:bg-[#D34586] 
                   data-[state=on]:text-white
                   data-[state=on]:border-[#D34586]
                   border border-gray-300
                   px-2 py-1 rounded-xl"
                    >
                      {cat.name}
                    </Toggle>
                  ))}
                </div>
              </div>

              <div className="mx-auto grid w-full max-w-xs gap-3">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="slider-demo-temperature">Filter by price</Label>
                  <span className="text-muted-foreground text-sm">
                    {minMax.join(", ")}
                  </span>
                </div>
                <Slider
                  id="slider-demo-temperature"
                  defaultValue={minMax}
                  value={minMax}
                  onValueChange={setMinMax}
                  min={50}
                  max={5000}
                  step={50}
                />
              </div>

              {/* DA Filter remains the same */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-semibold text-[#0B163F] mb-4">Minimum DA</h4>
                <div className="flex gap-2">
                  {[0, 85, 90, 93].map((da) => (
                    <button
                      key={da}
                      onClick={() => {
                        setDaFilter(da);
                        setPage(1);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${daFilter === da
                        ? "bg-[#0B163F] text-white"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {da === 0 ? "All" : `${da}+`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content remains mostly the same */}
          <div className="flex-1">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(1);
                  }}
                  className="pl-12 py-6 bg-white border-gray-200 rounded-xl"
                />
              </div>

            </motion.div>
            
              {loading ? <div className="w-full min-h-[60vh] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-[#D34586]/20 border-t-[#D34586]"
              />
            </div> : <p className="text-gray-500 mt-4 mb-3 text-center">{sites.length} publications found</p>}
            

            {totalPages > 1 && (
              <div className="my-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e: any) => {
                          e.preventDefault();
                          handlePageChange(page - 1);
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {/* Show current page + some around it */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          (p >= page - 2 && p <= page + 2)
                      )
                      .map((p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={(e: any) => {
                              e.preventDefault();
                              handlePageChange(p);
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
                          handlePageChange(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {/* Sites list */}
            <div className="grid gap-4">
              {sites.map((site, index) => {
                const inCart = cart.some((c: any) => c.id === site.id);

                return (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1 flex flex-col">
                        <a href={site.url?.startsWith("http") ? site.url : "https://" + site.url} target="_blank" className="text-xl font-bold text-[#0B163F]">
                          {site.websiteName || site.url}
                        </a>
                        <Badge variant="outline" className="mt-2">
                          {site?.categories?.name || "Uncategorized"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#1676BF]">
                            {site.da}
                          </div>
                          <div className="text-xs text-gray-500">DA</div>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-semibold text-[#0B163F]">
                            ${site.price}/post
                          </div>
                          <div className="text-xs text-gray-500">{site.tat}</div>
                        </div>

                        <Button onClick={() => inCart ? removeFromCart(site.id) : addToCart(site)} className={`${inCart? 'bg-secondary hover:bg-secondary/90': 'bg-[#D34586]'} text-white`}>
                          {inCart ? (
                            <>
                              Remove <X className="w-4 h-4 ml-2" />
                            </>
                          ) : (
                            <>
                              Add To Cart <ShoppingCart className="w-4 h-4 ml-2" />
                            </>
                          )}

                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e: any) => {
                          e.preventDefault();
                          handlePageChange(page - 1);
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {/* Show current page + some around it */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) =>
                          p === 1 ||
                          p === totalPages ||
                          (p >= page - 2 && p <= page + 2)
                      )
                      .map((p) => (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={(e: any) => {
                              e.preventDefault();
                              handlePageChange(p);
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
                          handlePageChange(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}