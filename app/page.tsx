import {
  getServices,
  getPortfolio,
  getBlogs,
  getTestimonials,
  getFaqs,
} from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClient from "@/components/HomeClient";

export const revalidate = 0; // Fresh dynamic data on every request

export default async function HomePage() {
  const services = await getServices();
  const portfolio = await getPortfolio();
  const blogs = await getBlogs();
  const testimonials = await getTestimonials();
  const faqs = await getFaqs();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HomeClient
          services={services}
          portfolio={portfolio}
          blogs={blogs}
          testimonials={testimonials}
          faqs={faqs}
        />
      </main>
      <Footer />
    </div>
  );
}
