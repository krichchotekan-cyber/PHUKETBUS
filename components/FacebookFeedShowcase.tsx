'use client';

import React, { useEffect, useState } from 'react';
import { ThumbsUp, Share2, ExternalLink, Calendar, RefreshCw } from 'lucide-react';

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  full_picture?: string;
  permalink_url?: string;
  likes?: number;
  shares?: number;
}

interface FacebookFeedProps {
  facebookPageUrl: string;
}

export default function FacebookFeedShowcase({ facebookPageUrl }: FacebookFeedProps) {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/facebook/feed')
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching Facebook feed:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-3">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Facebook Page Live Updates & Graph API Sync</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight">
            อัปเดตทริปล่าสุดจาก <span className="text-blue-600">Facebook Page</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            ติดตามภาพบรรยากาศการเดินทาง ความปลอดภัย และกิจกรรมระหว่างทริปแบบเรียลไทม์
          </p>
        </div>

        {/* Feed Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            <span className="text-sm">กำลังเชื่อมต่อข้อมูลจาก Facebook API...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-3xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-clean hover:shadow-clean-hover group"
              >
                <div>
                  {/* Post Header */}
                  <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                        ม
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{formatDate(post.created_time)}</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={post.permalink_url || facebookPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-50 transition"
                      title="ดูโพสต์บน Facebook"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Post Image */}
                  {post.full_picture && (
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.full_picture}
                        alt="Facebook Trip Post"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Post Message */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line line-clamp-4">
                      {post.message}
                    </p>
                  </div>
                </div>

                {/* Post Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-blue-600 font-semibold">
                      <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                      <span>{post.likes || 120}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{post.shares || 18}</span>
                    </span>
                  </div>

                  <a
                    href={post.permalink_url || facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 hover:underline text-[11px]"
                  >
                    <span>อ่านต่อบน Facebook</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Facebook Page CTA Card */}
        <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                กดติดตามเพจ Facebook "ห้างหุ้นส่วนจำกัด เมืองสองย่า ทรานสปอร์ต แอนด์ ทัวร์"
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                อัปเดตโปรโมชั่นพิเศษ รีวิวทริปท่องเที่ยว และตรวจเช็คคิวรถว่างได้ตลอด 24 ชั่วโมง
              </p>
            </div>
          </div>

          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition whitespace-nowrap active:scale-95"
          >
            <span>ไปยังแฟนเพจ Facebook</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
