import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Fish, 
  ShieldCheck, 
  Truck, 
  ThermometerSnowflake, 
  Award, 
  Layers, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Mail, 
  Clock, 
  ChevronRight,
  LogOut,
  User as UserIcon,
  Sparkles
} from 'lucide-react'

interface SpeciesItem {
  id: string
  commonName: string
  scientificName: string
  category: 'Freshwater' | 'Marine' | 'Planted' | 'Invertebrate'
  moq: string
  temperature: string
  ph: string
  stockStatus: 'In Stock' | 'Limited Stock' | 'Quarantine Ready'
  grade: 'Show Grade' | 'Commercial' | 'Wild Caught'
}

const SAMPLE_SPECIES: SpeciesItem[] = [
  {
    id: 'sp-1',
    commonName: 'Neon Blue Discus',
    scientificName: 'Symphysodon aequifasciatus',
    category: 'Freshwater',
    moq: '10 pcs',
    temperature: '28° - 30°C',
    ph: '6.0 - 6.8',
    stockStatus: 'In Stock',
    grade: 'Show Grade'
  },
  {
    id: 'sp-2',
    commonName: 'Percula Clownfish Pair',
    scientificName: 'Amphiprion percula',
    category: 'Marine',
    moq: '6 pairs',
    temperature: '24° - 26°C',
    ph: '8.1 - 8.4',
    stockStatus: 'Quarantine Ready',
    grade: 'Show Grade'
  },
  {
    id: 'sp-3',
    commonName: 'Albino Full Red Guppy',
    scientificName: 'Poecilia reticulata',
    category: 'Freshwater',
    moq: '50 pairs',
    temperature: '22° - 26°C',
    ph: '7.0 - 7.5',
    stockStatus: 'In Stock',
    grade: 'Commercial'
  },
  {
    id: 'sp-4',
    commonName: 'Anubias Nana Petite',
    scientificName: 'Anubias barteri var. nana',
    category: 'Planted',
    moq: '25 pots',
    temperature: '22° - 28°C',
    ph: '6.5 - 7.5',
    stockStatus: 'In Stock',
    grade: 'Commercial'
  },
  {
    id: 'sp-5',
    commonName: 'Cardinal Tetra (Jumbo)',
    scientificName: 'Paracheirodon axelrodi',
    category: 'Freshwater',
    moq: '100 pcs',
    temperature: '24° - 28°C',
    ph: '5.5 - 6.5',
    stockStatus: 'In Stock',
    grade: 'Commercial'
  },
  {
    id: 'sp-6',
    commonName: 'Yellow Tang (Captive Bred)',
    scientificName: 'Zebrasoma flavescens',
    category: 'Marine',
    moq: '4 pcs',
    temperature: '24° - 27°C',
    ph: '8.2 - 8.4',
    stockStatus: 'Limited Stock',
    grade: 'Show Grade'
  },
  {
    id: 'sp-7',
    commonName: 'Crystal Red Shrimp (SSS Grade)',
    scientificName: 'Caridina cantonensis',
    category: 'Invertebrate',
    moq: '30 pcs',
    temperature: '21° - 24°C',
    ph: '6.2 - 6.6',
    stockStatus: 'In Stock',
    grade: 'Show Grade'
  },
  {
    id: 'sp-8',
    commonName: 'Assorted African Cichlid Trio',
    scientificName: 'Pseudotropheus sp.',
    category: 'Freshwater',
    moq: '30 trios',
    temperature: '24° - 27°C',
    ph: '7.8 - 8.5',
    stockStatus: 'In Stock',
    grade: 'Commercial'
  }
]

export function Landing() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    interests: 'Freshwater Ornamental Fish'
  })

  const filteredSpecies = SAMPLE_SPECIES.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch = item.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInquirySubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Wholesale Ticker */}
      <div className="bg-slate-900 text-cyan-300 text-xs py-2 px-4 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
            HATCHERY UPDATE
          </span>
          <span>Weekly wholesale dispatch schedule: Flight freight every Tuesday & Thursday. 100% Live Arrival Guaranteed.</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-cyan-400" /> +91 (022) 555-FISH</span>
          <span className="hidden md:flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> Mon - Sat: 08:00 - 19:00 IST</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Fish className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                <span>Piyush Aquatic</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">Wholesale</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Commercial Hatchery & Livestock Distributor</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#species" className="hover:text-cyan-600 transition-colors">Species Catalogue</a>
            <a href="#advantages" className="hover:text-cyan-600 transition-colors">Why Piyush Aquatic</a>
            <a href="#workflow" className="hover:text-cyan-600 transition-colors">Ordering Workflow</a>
            <a href="#inquiry" className="hover:text-cyan-600 transition-colors">Wholesale Inquiry</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <span className="text-[10px] capitalize px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-semibold">
                    {user.role} Account
                  </span>
                </div>
                {['admin', 'staff'].includes(user.role) && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
                  >
                    <span>Management Console</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  title="Logout"
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Partner Portal</span>
                </Link>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-md shadow-cyan-600/20 hover:from-cyan-500 hover:to-blue-500 transition"
                >
                  <span>Request Price List</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white pt-20 pb-28">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DIRECT HATCHERY & WHOLESALE EXPORTER</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Wholesale Live Aquatic Stock <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                  Engineered for Maximum Survival.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Direct commercial supplier of high-grade freshwater fish, marine livestock, and tissue-culture aquatic plants for aquarium retailers, public aquariums, and commercial breeders.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#species"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Browse Stock Catalogue</span>
                </a>
                <a
                  href="#inquiry"
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-slate-500 transition flex items-center gap-2"
                >
                  <span>Request Dealer Account</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>

              {/* Guarantees Badges */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">14-Day Quarantine</div>
                    <div className="text-[11px] text-slate-400">Pathogen screening verified</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <ThermometerSnowflake className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Pure O₂ Packed</div>
                    <div className="text-[11px] text-slate-400">Thermal insulated boxes</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <Award className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">Live Arrival DOA</div>
                    <div className="text-[11px] text-slate-400">100% claim credit coverage</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Facility Metric Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold tracking-wide uppercase text-emerald-400">Live Facility Status</span>
                  </div>
                  <span className="text-xs text-slate-400">Real-time Telemetry</span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6">
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Active Holding Tanks</div>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-1">128 Tanks</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Automated UV & ozone scrubbed</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Catalogued Species</div>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-1">260+ Strains</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Freshwater, Marine & Plants</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Arrival Survival Rate</div>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">99.4%</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Verified across 12,000+ dispatches</div>
                  </div>
                  <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 font-medium">Average Dispatch Time</div>
                    <div className="text-2xl font-extrabold text-blue-400 mt-1">24 Hours</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Fast-track airport cargo</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 rounded-xl p-3 border border-cyan-800/50 flex items-center justify-between text-xs text-cyan-200">
                  <span>Looking for custom bulk quarantine?</span>
                  <a href="#inquiry" className="font-bold underline text-cyan-300 hover:text-white">Speak with Hatchery Lead</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills & Interactive Live Inventory Section */}
      <section id="species" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 tracking-wider uppercase mb-1">
              <Fish className="w-3.5 h-3.5" />
              <span>Commercial Inventory</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Available Wholesale Livestock</h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Live preview of our current stock ready for commercial order and airport cargo dispatch. Registered partners receive full tier pricing upon login.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search species or strain..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Freshwater', 'Marine', 'Planted', 'Invertebrate'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {category === 'All' ? 'All Categories (260+)' : category}
            </button>
          ))}
        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSpecies.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-cyan-200 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.stockStatus === 'In Stock'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.stockStatus === 'Quarantine Ready'
                      ? 'bg-cyan-100 text-cyan-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.stockStatus}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-cyan-700 transition">
                  {item.commonName}
                </h3>
                <p className="text-xs italic text-slate-500 mb-4">{item.scientificName}</p>

                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Grade:</span>
                    <span className="font-semibold text-slate-800">{item.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min. Order (MOQ):</span>
                    <span className="font-semibold text-slate-800">{item.moq}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Optimum Temp:</span>
                    <span className="font-semibold text-slate-800">{item.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target pH:</span>
                    <span className="font-semibold text-slate-800">{item.ph}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Tier rates on login</span>
                <Link
                  to="/login"
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Order Batch</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredSpecies.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Fish className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-700 font-semibold text-base">No species matching your query.</p>
            <p className="text-xs text-slate-400 mt-1">Try searching another common or scientific name.</p>
          </div>
        )}
      </section>

      {/* Value Propositions / Why Choose Piyush Aquatic */}
      <section id="advantages" className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Commercial Standard</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
              Why 450+ Aquarium Retailers Choose Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              We eliminate the traditional headaches of wholesale live stock: high mortality, disease outbreaks, and unreliable packing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-300 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Hospital-Grade Quarantine</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Every fish batch undergoes a strict 14-day protocol in isolated closed-loop UV sterilised systems. Zero copper contamination in reef stock.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-300 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <ThermometerSnowflake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Oxygen & Heat-Pack Logic</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Triple-ply non-burst bagging with pure medical oxygen injection and seasonal thermal regulation for reliable multi-state transit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-300 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Wholesale Tier Pricing</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Transparent volume breaks for pet stores, chain distributors, and exporters with real-time stock allocation and reserve holds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-cyan-300 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Guaranteed Live Arrival</h3>
              <p className="text-xs leading-relaxed text-slate-600">
                Hassle-free 4-hour claim window. Send an unboxing photo and receive instant credit applied directly to your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="workflow" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Procurement Process</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">How Wholesale Ordering Works</h2>
          <p className="text-slate-600 text-sm mt-2">
            Seamless B2B process designed for commercial speed and animal health integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-cyan-300 font-extrabold flex items-center justify-center mx-auto mb-4 text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Verify Account</h4>
            <p className="text-xs text-slate-500">
              Submit your retail shop registration, pet trade license, or breeding credentials for tier access.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-cyan-300 font-extrabold flex items-center justify-center mx-auto mb-4 text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Reserve Live Batch</h4>
            <p className="text-xs text-slate-500">
              Lock in your species lots from active holding tanks using our live stock availability system.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-cyan-300 font-extrabold flex items-center justify-center mx-auto mb-4 text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">O₂ Thermal Packing</h4>
            <p className="text-xs text-slate-500">
              Our technicians purge, fast, and pack specimens with temperature-stabilized oxygen buffers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center relative shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-cyan-300 font-extrabold flex items-center justify-center mx-auto mb-4 text-sm">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Express Cargo & D.O.A.</h4>
            <p className="text-xs text-slate-500">
              Same-day flight or overnight air freight right to your nearest airport cargo terminal with full insurance.
            </p>
          </div>
        </div>
      </section>

      {/* Wholesale Partnership & Inquiry Form */}
      <section id="inquiry" className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Partner With Us</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Request Weekly Wholesale Price Sheet & Dealer Access
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connect directly with our commercial desk. We provide custom supply contracts for pet store chains, local aquatic shops, and export agents.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>Updated pricing PDF emailed every Monday & Thursday</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>Custom quarantine isolation for special species requests</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span>Airport terminal dispatch coordination across all major hubs</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
                <div>
                  <div className="font-bold text-white">Direct Hatchery Office:</div>
                  <div>MIDC Industrial Aquatic Zone, Navi Mumbai, MH</div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white text-slate-800 rounded-3xl p-8 shadow-2xl">
                {inquirySubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <span className="font-semibold">{formData.ownerName || 'Partner'}</span>. Our wholesale sales desk will contact <span className="font-semibold">{formData.email}</span> within 4 hours with the current price sheet.
                    </p>
                    <button
                      onClick={() => setInquirySubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900">Wholesale Application</h3>
                    <p className="text-xs text-slate-500">Fill out your store details to receive access to dealer rates.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Store / Business Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.storeName}
                          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                          placeholder="e.g. Reef Haven Aquatics"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person *</label>
                        <input
                          required
                          type="text"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="orders@yourbusiness.com"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">City / Nearest Airport *</label>
                        <input
                          required
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="e.g. Bengaluru (BLR)"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Primary Interest</label>
                        <select
                          value={formData.interests}
                          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        >
                          <option>Freshwater Ornamental Fish</option>
                          <option>Marine & Saltwater Livestock</option>
                          <option>Tissue Culture & Aquatic Plants</option>
                          <option>Invertebrates & Shrimp</option>
                          <option>Full Mixed Consignment</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/25 transition mt-2"
                    >
                      Submit Wholesale Application
                    </button>
                    <p className="text-[11px] text-slate-400 text-center">
                      We respect your privacy. Strictly for verified trade and retail partners.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Fish className="w-5 h-5 text-cyan-400" />
              <span>Piyush Aquatic</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Direct commercial breeders, quarantine managers, and wholesale distributors of premium live ornamental fish across India and international trade lanes.
            </p>
            <div className="text-slate-500 text-[11px]">
              FSSAI & Wildlife Compliance Verified
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Live Stock Categories</h4>
            <ul className="space-y-2">
              <li><a href="#species" className="hover:text-cyan-400 transition">South American Discus & Cichlids</a></li>
              <li><a href="#species" className="hover:text-cyan-400 transition">Captive Bred Marine Fish</a></li>
              <li><a href="#species" className="hover:text-cyan-400 transition">Tissue Culture Aquatic Stems</a></li>
              <li><a href="#species" className="hover:text-cyan-400 transition">High-Grade Neocaridina Shrimp</a></li>
              <li><a href="#species" className="hover:text-cyan-400 transition">Wild Rare Catfish & Plecos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Dealer Services</h4>
            <ul className="space-y-2">
              <li><a href="#workflow" className="hover:text-cyan-400 transition">Live Arrival Insurance Policy</a></li>
              <li><a href="#workflow" className="hover:text-cyan-400 transition">Airport-to-Airport Flight Cargo</a></li>
              <li><a href="#advantages" className="hover:text-cyan-400 transition">Custom Quarantine Holding</a></li>
              <li><Link to="/login" className="hover:text-cyan-400 transition">Commercial Portal Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Dispatch Desk</h4>
            <div className="space-y-2 text-slate-400">
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-cyan-400" /> wholesale@piyush-aquatic.com</p>
              <p className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-cyan-400" /> +91 (022) 555-FISH / +91 98200-XXXXX</p>
              <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cyan-400" /> Mon - Sat: 08:00 AM - 07:00 PM</p>
              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-block px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 font-semibold text-[11px] hover:bg-slate-700 transition border border-slate-700"
                >
                  Internal Staff & Admin Access →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-850 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>© {new Date().getFullYear()} Piyush Aquatic Wholesale Ltd. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Live Arrival Terms</span>
            <span>Quarantine Documentation</span>
            <span>Commercial Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
