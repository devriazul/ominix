import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogById, getBlogs } from "@/lib/db";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ id: b.id }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="bg-slate-50 border-b border-slate-200 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-accent transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Blogs</span>
            </Link>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 leading-tight">
              {blog.title.en}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-accent" />
                <span>{blog.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>{blog.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{blog.readTime}</span>
              </span>
            </div>
          </div>
        </div>

        <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={blog.image}
              alt={blog.title.en}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5 rs-card p-8 sm:p-12 rounded-3xl border-slate-200 bg-white"
            dangerouslySetInnerHTML={{ __html: blog.content.en }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
