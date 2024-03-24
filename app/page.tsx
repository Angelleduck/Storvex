import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function page() {
  return (
    <div className=" min-h-screen bg-[#272525]">
      <section className="flex items-center bg-[#1E1919] flex-col sm:flex-row mb-10">
        <div className="bg-[#2B2929] text-white p-10">
          <h1 className="text-4xl font-bold pb-10">Welcome to Stovex</h1>
          <h2 className="text-3xl font-bold pb-6">
            Storing everything for you and your business needs. All in one place
          </h2>
          <p className="pb-20">
            Enchance your personal storage with Storvex, offering a simple and
            efficient way to uplaod, organize , and access files from anywhere.
            security store important documents and media, and experience the
            convenience of easy life management and sharing in one solution.
          </p>
          <Link
            href="/dashboard"
            className="bg-red-200 p-4 flex items-center w-fit"
          >
            Try for free
            <ArrowRight className="ml-8" />
          </Link>
        </div>
        <div className="p-10 rounded ">
          <video autoPlay loop muted className="rounded">
            <source src="/grappres.mp4" type="video/mp4" />
          </video>
        </div>
      </section>
    </div>
  );
}
