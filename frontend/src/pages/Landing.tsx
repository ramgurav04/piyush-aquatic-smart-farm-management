
import React from "react";
import { Link } from "react-router-dom";
import {
  Fish,
  ArrowRight,
  Waves,
  ShieldCheck,
  Store,
  UserRound,
  Menu,
} from "lucide-react";

const fishList = [
  {
    name: "Discus",
    type: "Premium ornamental fish",
    description: "Explore availability for colorful discus varieties.",
    image:
      "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Angelfish",
    type: "Freshwater collection",
    description: "Discover elegant fish for freshwater aquariums.",
    image:
      "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Guppy",
    type: "Colorful varieties",
    description: "Ask about available colors, quantities, and pricing.",
    image:
      "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80",
  },
];

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="rounded-xl bg-cyan-700 p-2 text-white">
              <Fish size={26} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900">
                Piyush Aquatic
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-cyan-700">
                Ornamental Fish Farm
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-cyan-700">Home</a>
            <a href="#collection" className="hover:text-cyan-700">Fish Collection</a>
            <a href="#about" className="hover:text-cyan-700">About Farm</a>
            <a href="#contact" className="hover:text-cyan-700">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:text-cyan-700 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
            >
              Get Started
            </Link>
            <button
              type="button"
              aria-label="Navigation menu"
              className="rounded-lg p-2 text-slate-700 md:hidden"
              onClick={() => {
                document.getElementById("mobile-navigation")?.classList.toggle("hidden");
              }}
            >
              <Menu size={23} />
            </button>
          </div>
        </nav>

        <div id="mobile-navigation" className="hidden border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            <a href="#home">Home</a>
            <a href="#collection">Fish Collection</a>
            <a href="#about">About Farm</a>
            <a href="#contact">Contact</a>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=2000&q=85"
          alt="Ornamental fish swimming in an aquarium"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-cyan-950/30" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              <Waves size={17} />
              Premium ornamental fish farming
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover the beauty of aquatic life.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Explore ornamental fish for home aquariums, retailers, and
              wholesale businesses. Connect with Piyush Aquatic to enquire
              about species, availability, and quantities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                Explore Fish <ArrowRight size={18} />
              </a>
              <Link
                to="/signup"
                className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-cyan-300" />
                Care-focused farming
              </span>
              <span className="flex items-center gap-2">
                <Fish size={18} className="text-cyan-300" />
                Retail & wholesale
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1000&q=85"
                alt="Colorful ornamental fish"
                className="h-80 w-full rounded-2xl object-cover"
              />
              <div className="px-2 pb-2 pt-5 text-white">
                <p className="text-xl font-bold">A world beneath the water</p>
                <p className="mt-1 text-sm text-slate-300">
                  Find fish for your aquarium or business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer types */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
            Shop your way
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            For hobbyists and businesses
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Whether you are choosing fish for your aquarium or sourcing
            fish for your business, start with the account that suits you.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
            <span className="inline-flex rounded-xl bg-cyan-50 p-3 text-cyan-700">
              <UserRound size={27} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Individual Customers
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Browse ornamental fish for your home aquarium and enquire
              about current availability and pricing.
            </p>
            <Link
              to="/signup"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-800 hover:text-cyan-600"
            >
              Register as an individual <ArrowRight size={17} />
            </Link>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
            <span className="inline-flex rounded-xl bg-teal-50 p-3 text-teal-700">
              <Store size={27} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-slate-900">
              Business & Wholesale
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              For retailers, resellers, and aquarium businesses looking
              for bulk quantities and wholesale enquiries.
            </p>
            <Link
              to="/signup"
              className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-800 hover:text-teal-600"
            >
              Register your business <ArrowRight size={17} />
            </Link>
          </article>
        </div>
      </section>

      {/* Fish collection */}
      <section id="collection" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
                Featured species
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Explore our fish collection
              </h2>
              <p className="mt-3 text-slate-600">
                Contact the farm for current stock and pricing.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-semibold text-cyan-800"
            >
              Customer sign in <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fishList.map((fish) => (
              <article
                key={fish.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={fish.image}
                  alt={fish.name}
                  loading="lazy"
                  className="h-60 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm font-semibold text-cyan-700">
                    {fish.type}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {fish.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {fish.description}
                  </p>
                  <Link
                    to="/signup"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-cyan-800"
                  >
                    Make an enquiry <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-2 md:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-700">
            About Piyush Aquatic
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Dedicated to ornamental fish and farm management.
          </h2>
          <p className="mt-5 leading-7 text-slate-600">
            Based in Dabhil, Ratnagiri, Piyush Aquatic focuses on
            ornamental fish breeding, rearing, water management, and
            supplying fish to individual customers and businesses.
          </p>
          <p className="mt-4 leading-7 text-slate-600">
            Explore the collection and contact us to discuss your
            requirements.
          </p>
          <Link
            to="/signup"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-5 py-3 font-semibold text-white hover:bg-cyan-800"
          >
            Join Piyush Aquatic <ArrowRight size={18} />
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=85"
          alt="Fish swimming in an aquarium"
          loading="lazy"
          className="h-80 w-full rounded-3xl object-cover shadow-lg"
        />
      </section>

      {/* Contact call to action */}
      <section id="contact" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">
              Looking for your next fish collection?
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-300">
              Create your customer account to start exploring and
              enquiring about available fish.
            </p>
          </div>
          <Link
            to="/signup"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-400"
          >
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-5 py-7 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Piyush Aquatic. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
