import React from 'react';
import {
  Users,
  Calendar,
  Target,
  MessageSquare,
  FlaskConical,
  Briefcase,
  Cpu,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Linkedin,
  Twitter
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import BackgroundParticles from './components/BackgroundParticles';

// --- Types ---
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

// --- Data ---
const SERVICES = [
  { id: '01', title: "SMS/LMS", desc: "Advanced Learning Management Systems.", icon: <MessageSquare />, link: '/services/sms-lms' },
  { id: '02', title: "IEM Lab", desc: "Virtual & Physical Lab Setups.", icon: <img src="/iem-lab-logo.png" alt="IEM Lab" className="w-10 h-10 object-contain" />, link: '/services/iem-lab' },
  { id: '03', title: "Business Plans", desc: "Strategic Execution Frameworks.", icon: <Briefcase />, link: '/services/business-plans' },
  { id: '04', title: "AI Solutions", desc: "Collaborative Talent Ecosystem.", icon: <Cpu />, link: '/services/ai-solutions' }
];

const RESOURCES = [
  { title: "The Future of EdTech", type: "Overview", date: "2026", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&h=1000&auto=format&fit=crop" },
  { title: "Scaling with AI", type: "Webinar", date: "2026", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&h=1000&auto=format&fit=crop" },
  { title: "Remote Culture", type: "Blog", date: "2026", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&h=1000&auto=format&fit=crop" }
];

const DEMO_EMAIL = 'plumerian@gmail.com';

const openDemoEmail = () => {
  const subject = encodeURIComponent('Request a Demo');
  const body = encodeURIComponent(
    "Hello Plumeria,\n\nI'd like to request a demo.\n\nName:\nOrganization:\nPhone:\nPreferred date/time:\n\nThank you."
  );

  window.location.href = `mailto:${DEMO_EMAIL}?subject=${subject}&body=${body}`;
};

// --- Components ---
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash && hash.length > 1) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

const Logo = ({ className = "" }: { className?: string }) => (
  <a href="#" className={`group ${className}`}>
    <span className="text-2xl font-display uppercase tracking-tighter text-brand">Plumeria</span>
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { name: 'About Us', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Resources', href: '/#resources' },
    { name: 'Contact', href: '/#contact', isButton: true },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-black/5 py-4 px-6 lg:px-12 flex justify-between items-center transition-all duration-300">
      <Logo />
      <div className="hidden lg:flex items-center gap-10 text-[13px] font-medium tracking-tight text-ink/70">
        {navItems.map(item => (
          <Link
            key={item.name}
            to={item.href}
            className={item.isButton ? "px-6 py-2.5 bg-ink text-white rounded-full hover:bg-brand transition-all duration-300" : "hover:text-ink transition-colors"}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <button className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-md shadow-[0_8px_16px_rgba(31,38,135,0.05),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(255,255,255,0.2)] border border-white/50 text-ink hover:bg-white/60 transition-all duration-300" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-40 p-8 sm:p-12 flex flex-col justify-center items-center gap-6 sm:gap-8"
          >
            <button className="absolute top-6 right-4 sm:top-8 sm:right-6 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-white/40 backdrop-blur-xl shadow-[0_8px_16px_rgba(31,38,135,0.05),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(255,255,255,0.2)] border border-white/50 text-ink hover:bg-white/60 transition-all duration-300" onClick={() => setIsOpen(false)}><X size={32} /></button>
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-3xl sm:text-4xl font-bold tracking-tight text-center ${item.isButton ? 'px-6 sm:px-8 py-3 bg-ink text-white rounded-full text-xl sm:text-2xl' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
    {/* Subtle Background Highlights */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/[0.02] blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
    </div>

    {/* Immersive Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          <div className="w-1 h-1 bg-brand rounded-full" />
          <span className="text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] text-brand/60 font-mono font-bold">Innovation Collective</span>
          <div className="w-1 h-1 bg-brand rounded-full" />
        </div>

        <h1 className="text-[22vw] sm:text-[18vw] lg:text-[12vw] font-bold leading-[0.8] tracking-[-0.04em] text-brand mb-12 sm:mb-16 text-center">
          PLUMERIA<br />
          <span className="opacity-20">TECH</span>
        </h1>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          <div className="max-w-xs text-left">
            <p className="text-xs text-brand/60 leading-relaxed uppercase tracking-widest font-mono font-bold">
              // Strategic Frameworks <br />
              // Neural Architectures <br />
              // Digital Excellence
            </p>
          </div>



          <div className="max-w-xs text-right hidden lg:block">
            <p className="text-xs text-brand/60 leading-relaxed uppercase tracking-widest font-mono font-bold">
              Building the next <br />
              generation of digital <br />
              infrastructure.
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Bottom Status Bar */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="absolute bottom-0 left-0 w-full p-5 sm:p-8 lg:p-12 flex justify-between items-end z-20"
    >

      <div className="hidden lg:block">
        <p className="text-[10px] text-brand/30 uppercase tracking-[0.4em] font-bold">Scroll to initialize_interface</p>
      </div>
    </motion.div>

    {/* Decorative Elements */}
    <div className="absolute top-1/4 left-10 w-px h-32 bg-black/10 hidden lg:block" />
    <div className="absolute bottom-1/4 right-10 w-px h-32 bg-black/10 hidden lg:block" />
  </section>
);

const VideoFromImage = ({ imageUrl }: { imageUrl: string }) => {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const generateVideo = async () => {
    try {
      setIsGenerating(true);
      setStatus("Checking API Key...");

      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }

      setStatus("Processing Image...");
      // Fetch image and convert to base64
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(blob);
      });
      const base64Data = await base64Promise;

      setStatus("Initializing Veo...");
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Cinematic slow motion, subtle movement, professional lighting',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setStatus("Generating Video (this may take a minute)...");
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setStatus("Finalizing...");
        const videoResponse = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': (process.env as any).API_KEY,
          },
        });
        const videoBlob = await videoResponse.blob();
        setVideoUrl(URL.createObjectURL(videoBlob));
      }
    } catch (error: any) {
      console.error("Video generation failed:", error);
      if (error.message?.includes("Requested entity was not found")) {
        await window.aistudio.openSelectKey();
      }
      setStatus("Error: " + (error.message || "Generation failed"));
    } finally {
      setIsGenerating(false);
    }
  };

  if (videoUrl) {
    return (
      <video
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="relative w-full h-full group">
      <img
        src={imageUrl}
        className={`w-full h-full object-cover grayscale transition-all duration-700 ${isGenerating ? 'blur-sm' : 'group-hover:grayscale-0'}`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isGenerating ? (
          <button
            onClick={generateVideo}
            className="px-6 py-3 bg-white/40 backdrop-blur-md shadow-[0_8px_16px_rgba(31,38,135,0.1),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(255,255,255,0.2)] border border-white/50 text-ink rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-white hover:border-transparent hover:shadow-[0_8px_16px_rgba(78,165,157,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2"
          >
            <Cpu size={14} /> Animate with AI
          </button>
        ) : (
          <div className="text-center px-6">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[10px] text-white uppercase tracking-widest font-bold">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => (
  <section id="about" className="py-20 sm:py-24 lg:py-48 px-6 lg:px-12">
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
      <div className="lg:col-span-5">
        <p className="micro-label mb-8">About Us</p>
        <h2 className="text-4xl sm:text-5xl lg:text-8xl font-display uppercase leading-none mb-10 sm:mb-12">
          The <span className="text-brand">Integrity</span> <br /> of Code.
        </h2>
        <div className="space-y-8 sm:space-y-12">
          {[
            { label: 'Leadership', desc: 'Guided by industry veterans with a passion for disruptive innovation.', href: '/leadership' },
            { label: 'Who We Service', desc: 'From academic institutions to Fortune 500 companies.', href: '/who-we-service' },
            { label: 'Events', desc: 'Annual tech summits and workshops for digital leaders.', href: '/events' }
          ].map(item => (
            <div key={item.label} className="group border-t border-ink/10 pt-6 sm:pt-8">
              {item.href ? (
                <Link to={item.href} className="block">
                  <h4 className="text-xs font-mono uppercase tracking-widest mb-4 flex justify-between items-center group-hover:text-brand transition-colors">
                    {item.label} <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                </Link>
              ) : (
                <h4 className="text-xs font-mono uppercase tracking-widest mb-4 flex justify-between items-center">
                  {item.label} <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
              )}
              <p className="text-slate-500 max-w-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-12">
        <div className="aspect-[16/9] bg-slate-100 rounded-sm overflow-hidden">
          <iframe
            className="w-full h-full border-0"
            src="https://www.youtube.com/embed/ayiT2Ywv1Aw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
          <div className="aspect-square bg-brand-light p-6 sm:p-12 flex flex-col justify-end">
            <p className="text-4xl sm:text-6xl font-display">EdTech</p>
            <p className="micro-label">We build for education</p>
          </div>
          <div className="aspect-square bg-ink text-white p-6 sm:p-12 flex flex-col justify-end">
            <p className="text-4xl sm:text-6xl font-display">AI</p>
            <p className="micro-label">We build for future Technology</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => {
  const navigate = useNavigate();
  return (
    <section id="services" className="bg-[#f8f9fa] py-24 lg:py-40 px-6 lg:px-12 relative overflow-hidden">
      {/* Liquid Glass Background Textures */}
      <div className="absolute top-0 right-1/4 w-[50%] h-[50%] bg-brand/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[60%] h-[60%] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our Expertise</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6 sm:mb-8">
              Solutions for the <span className="text-brand">modern age.</span>
            </h2>
            <p className="text-lg text-ink/50 max-w-2xl mx-auto leading-relaxed">
              We provide a comprehensive suite of services designed to help your business thrive in an increasingly digital world.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.id}
              onClick={() => s.link && navigate(s.link)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className={`group relative p-8 sm:p-10 bg-white/40 backdrop-blur-2xl backdrop-saturate-200 rounded-[32px] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] hover:bg-white/60 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] transition-all duration-500 overflow-hidden ${s.link ? 'cursor-pointer' : ''}`}
            >
              {/* Liquid Glass Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 w-16 h-16 bg-white/80 backdrop-blur-md shadow-sm border border-white/50 text-brand rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand group-hover:text-white group-hover:border-transparent transition-all duration-500">
                {s.icon}
              </div>
              <h4 className="relative z-10 text-2xl font-bold tracking-tight text-ink mb-4">
                {s.title}
              </h4>
              <p className="relative z-10 text-ink/60 leading-relaxed mb-8">
                {s.desc}
              </p>
              {s.link ? (
                <Link to={s.link} className="relative z-10 flex items-center gap-2 text-brand font-bold text-sm hover:opacity-80 transition-opacity w-max">
                  Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="relative z-10 flex items-center gap-2 text-brand font-bold text-sm w-max cursor-pointer hover:opacity-80 transition-opacity">
                  Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Resources = () => (
  <section id="resources" className="py-24 lg:py-48 px-6 lg:px-12">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
      <h2 className="text-5xl sm:text-6xl lg:text-[10vw] font-display uppercase leading-[0.8]">Journal</h2>
      <div className="max-w-xs">
        <p className="text-sm opacity-60 mb-6">Deep dives into technology, education, and the future of business.</p>
        <a href="#" className="micro-label border-b border-ink pb-1">View all entries</a>
      </div>
    </div>
    <div className="grid lg:grid-cols-3 gap-1">
      {RESOURCES.map((r) => (
        <div key={r.title} className="group relative aspect-[3/4] overflow-hidden bg-slate-100">
          <img src={r.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end text-white">
            <p className="micro-label text-white/60 mb-4">{r.type} / {r.date}</p>
            <h4 className="text-4xl font-display uppercase">{r.title}</h4>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', type: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Inquiry from ${formData.name || 'Website'}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.type}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:plumeriantech@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 lg:py-48 px-6 lg:px-12 bg-ink text-white overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="micro-label text-brand mb-8">03 / Contact</p>
            <h2 className="text-4xl sm:text-6xl lg:text-[10vw] font-display uppercase leading-[0.85] mb-10 sm:mb-12 tracking-tighter">
              Start <br />
              <span className="text-brand">Something</span> <br />
              New.
            </h2>
          </div>

          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <p className="micro-label text-white/40">Inquiries</p>
                <a href="mailto:plumeriantech@gmail.com" className="text-base sm:text-lg hover:text-brand transition-colors break-all">plumeriantech@gmail.com</a>
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <p className="micro-label text-white/40 mb-6">Presence</p>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm uppercase tracking-widest font-medium">
                <span>Singapore</span>
                <span>Yangon</span>
                <span>Mandalay</span>
                <span>Taunggyi</span>
                <span>Pakokku</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 lg:p-16 rounded-2xl border border-white/10">
            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="micro-label text-brand">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand transition-all placeholder:text-white/20"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="micro-label text-brand">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand transition-all placeholder:text-white/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="micro-label text-brand">Project Type</label>
                <div className="flex flex-wrap gap-3 pt-4">
                  {['SMS/LMS', 'Website', 'AI Integration', 'Business Machine'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`px-4 py-2 rounded-full border text-[10px] uppercase tracking-widest transition-all ${formData.type === type
                        ? 'border-brand text-brand bg-brand/10'
                        : 'border-white/10 hover:border-brand hover:text-brand'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="micro-label text-brand">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-brand transition-all resize-none placeholder:text-white/20"
                  placeholder="Tell us about your vision..."
                />
              </div>

              <button type="submit" className="group relative w-full py-6 overflow-hidden bg-brand text-ink font-bold uppercase tracking-[0.2em] text-xs rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 lg:px-12 border-t border-ink/10 flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 text-center lg:text-left">
    <Logo />
    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 micro-label">
      <a href="#" className="hover:text-brand transition-colors">Instagram</a>
      <a href="https://www.facebook.com/share/p/1BhmdUNGjD/" className="hover:text-brand transition-colors">Facebook</a>
      <a href="#" className="hover:text-brand transition-colors">Twitter</a>
    </div>
    <p className="micro-label opacity-40">© 2026 Plumeria Tech. All Rights Reserved.</p>
  </footer>
);

const MouseFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the following effect
  const springConfig = { damping: 35, stiffness: 250 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Rotation based on movement direction
  const rotate = useSpring(0, { damping: 20, stiffness: 100 });
  const scale = useSpring(1, { damping: 15, stiffness: 200 });

  React.useEffect(() => {
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Calculate angle for rotation
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

      // Only rotate if there's significant movement
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        rotate.set(angle);
        scale.set(1.2);
        setTimeout(() => scale.set(1), 100);
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, rotate, scale]);

  return (
    <div className="hidden lg:block">
      {/* Main Tech Triangle */}
      <motion.div
        style={{
          x,
          y,
          rotate,
          scale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
      >
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-brand/20 rounded-full"
          />

          {/* Triangle SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand">
            <motion.path
              d="M12 4L20 18H4L12 4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <path d="M12 8L16 15H8L12 8Z" fill="currentColor" className="opacity-40" />
          </svg>

          {/* Tech Bits */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full shadow-[0_0_8px_rgba(78,165,157,0.8)]" />
          <div className="absolute -bottom-1 left-1/4 w-0.5 h-0.5 bg-brand/50 rounded-full" />
          <div className="absolute -bottom-1 right-1/4 w-0.5 h-0.5 bg-brand/50 rounded-full" />
        </div>
      </motion.div>

      {/* Trailing Glow */}
      <motion.div
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-32 h-32 bg-brand/5 rounded-full z-[9998] pointer-events-none blur-3xl"
      />
    </div>
  );
};

const Leadership = () => {
  const navigate = useNavigate();

  const leaders = [
    {
      name: "Mr.Hlan Htet Naing",
      role: "Chief Executive Officer",
      img: "/Hlan Htet Naing.png"
    },
    {
      name: "Mr.Min Hein Htet",
      role: "Chief Finance Officer",
      img: "/Min Hein Htet.jpg"
    },
    {
      name: "Mr.Yar Pyae Aung",
      role: "Chief Technology Officer",
      img: "/Ko yar pyae.jpg"
    },
    {
      name: "Mr.Ye Yint Thura",
      role: "Chief Operating Officer",
      img: "/Yeyint thura.png"
    },
    {
      name: "Ms.Shun Lai Shwe Sin",
      role: "Human Resource Manager",
      img: "/Hannay.png"
    },
    {
      name: "Ms.Myat Min Khin",
      role: "Head of Data Analysis",
      img: "/Myat Min Khin.jpg"
    },
    {
      name: "Mr.Thiha Yeman",
      role: "Head of Mobile Development",
      img: "/Thiha.png"
    },
    {
      name: "Mr.Lin Khant Kyaw",
      role: "Head of   Web Development",
      img: "/linkhant.png"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => {
            navigate('/');
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
          }}
          className="relative inline-flex items-center gap-2 px-6 py-3 bg-brand text-white text-xs font-bold uppercase tracking-widest rounded-full mb-12 hover:scale-105 shadow-[0_8px_16px_rgba(78,165,157,0.4),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-300 group cursor-pointer"
        >
          <span className="flex items-center gap-2 pointer-events-none">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl lg:text-[12vw] font-display uppercase leading-[0.8] tracking-tighter mb-8 sm:mb-12">
              The <br />
              <span className="text-brand">Visionaries</span>
            </h1>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base sm:text-xl text-slate-500 leading-relaxed">
              Our leadership team is comprised of polymaths, engineers, and designers dedicated to the pursuit of digital excellence.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-3 bg-slate-100">
                <img
                  src={leader.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mb-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-black uppercase tracking-widest border border-brand/20">
                  {leader.role}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-4">{leader.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const WhoWeService = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "education",
      title: "For education",
      desc: "Empowering academic institutions with cutting edge EdTech, Virtual Labs, and Student Management Systems.",
      icon: <Users size={48} className="text-brand mb-6" />,
      features: ["LMS & SMS Integration", "Curriculum Digitization", "Virtual Reality Classrooms"]
    },
    {
      id: "business",
      title: "For Business",
      desc: "Strategic execution frameworks, enterprise-grade cloud architecture, and dynamic team collaboration hubs.",
      icon: <Briefcase size={48} className="text-brand mb-6" />,
      features: ["Cloud Transformation", "Workflow Automation", "Business Machines"]
    },
    {
      id: "ai",
      title: "Ai",
      desc: "Next-generation artificial intelligence integration for predictive analytics and autonomous operations.",
      icon: <Cpu size={48} className="text-brand mb-6" />,
      features: ["Predictive Analytics", "AI Agents", "Intelligent Automation"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => {
            navigate('/');
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
          }}
          className="relative inline-flex items-center gap-2 px-6 py-3 bg-brand text-white text-xs font-bold uppercase tracking-widest rounded-full mb-12 hover:scale-105 shadow-[0_8px_16px_rgba(78,165,157,0.4),inset_0_2px_4px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.1)] border border-white/20 transition-all duration-300 group cursor-pointer"
        >
          <span className="flex items-center gap-2 pointer-events-none">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="lg:col-span-12">
            <h1 className="text-4xl sm:text-6xl lg:text-[12vw] font-display uppercase leading-[0.8] tracking-tighter mb-8 sm:mb-12">
              Who We <br />
              <span className="text-brand">Service</span>
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 sm:p-10 bg-[#f8f9fa] rounded-[32px] border border-ink/5 hover:bg-white hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>
              <h3 className="text-3xl font-display uppercase tracking-tight mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8">{service.desc}</p>

              <ul className="space-y-4">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                    <Target size={16} className="text-brand shrink-0" />
                    <span className="text-ink/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Events = () => {
  const navigate = useNavigate();

  const events = [
    {
      id: "summit-2026",
      title: "IEM Launch 2026",
      date: "April 26, 2026",
      location: "Pakokku, Magway",
      desc: "Join industry leaders and innovators to explore the future of Learning Management Systems, AI integration, and cloud architecture.",
      type: "Conference"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-ink pt-32 pb-24 px-6 lg:px-12 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => {
            navigate('/');
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
          }}
          className="relative inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-12 hover:bg-brand hover:scale-105 shadow-[0_8px_16px_rgba(31,38,135,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] border border-white/20 transition-all duration-300 group cursor-pointer"
        >
          <span className="flex items-center gap-2 pointer-events-none">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </span>
        </button>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-6xl lg:text-[12vw] font-display uppercase leading-[0.8] tracking-tighter mb-8 sm:mb-12">
              Upcoming <br />
              <span className="text-brand">Events</span>
            </h1>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base sm:text-xl text-white/50 leading-relaxed">
              Connect with pioneers, learn from experts, and participate in defining the next era of technological advancement.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 lg:p-12 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 hover:bg-white/10 hover:border-brand/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/5 to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]" />

              <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-3">
                  <p className="micro-label text-brand mb-2">{event.type}</p>
                  <p className="text-sm font-mono text-white/60 mb-1">{event.date}</p>
                  <p className="text-xs font-mono text-white/40">{event.location}</p>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-3xl font-display uppercase tracking-tight mb-4 group-hover:text-brand transition-colors duration-300">{event.title}</h3>
                  <p className="text-white/50 leading-relaxed">{event.desc}</p>
                </div>

                <div className="lg:col-span-3 flex justify-start lg:justify-end">
                  <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand hover:border-brand transition-all duration-300 w-full sm:w-auto">
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SmsLms = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24 lg:space-y-32 relative z-10">

        {/* Header & Back */}
        <div>
          <button
            onClick={() => {
              navigate('/#services');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-white text-ink text-xs font-bold uppercase tracking-widest rounded-full mb-12 hover:scale-105 shadow-[0_8px_16px_rgba(31,38,135,0.05),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 group cursor-pointer"
          >
            <span className="flex items-center gap-2 pointer-events-none">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
            </span>
          </button>

          <div className="bg-[#4ea59d] text-white p-8 sm:p-12 lg:p-24 rounded-[32px] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-[rgba(78,165,157,0.5)] opacity-50 mix-blend-multiply" />
            <div className="relative z-10 max-w-3xl">
              <h1 className="text-5xl sm:text-6xl lg:text-[10vw] font-display uppercase tracking-tighter mb-4 leading-[0.85]">
                IEM
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-light mb-6 sm:mb-8 opacity-90 tracking-tight">
                Learning Management System
              </h2>
              <div className="h-px w-24 bg-white/20 mb-8" />
              <p className="text-sm sm:text-base lg:text-xl font-mono uppercase tracking-[0.12em] sm:tracking-[0.2em] text-brand-light">
                Where Education Meets Innovation
              </p>
            </div>

            {/* Decorative background logo or shape */}
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:bg-brand/20 transition-colors duration-1000" />
          </div>
        </div>

        {/* About IEM & Video */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="micro-label text-brand mb-4">About IEM</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tighter text-ink mb-6 leading-tight">A Smarter Way to <span className="text-brand">Teach</span> and <span className="text-brand">Learn</span></h3>
            </div>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                <strong className="text-ink">IEM</strong> is a comprehensive learning management system built for the modern academic institution. From curriculum delivery to student performance insights, IEM provides the tools that schools and universities need to manage, track, and enhance the learning journey — all in one unified platform.
              </p>
              <p>
                Designed with both educators and learners in mind, IEM streamlines the administrative workload while creating a richer, more engaging experience for students at every level.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="aspect-[16/9] bg-slate-100 rounded-[32px] overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] border border-ink/5 relative group p-2 bg-white/40 backdrop-blur-sm">
              <div className="w-full h-full rounded-[24px] overflow-hidden relative">
                <iframe
                  className="w-full h-full border-0 absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  src="https://www.youtube.com/embed/ioz1UHWsOKc?si=QZPkaRZ6Iu0dajK6"
                  title="SMS/LMS Platform Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="micro-label text-brand mb-4">Platform Features</p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tighter text-ink mb-6">Everything You Need, <br /><span className="text-brand">in One Platform</span></h3>
            <p className="text-slate-500 leading-relaxed text-lg">
              IEM brings together a powerful suite of tools to support teaching, learning, and administration across your institution.
            </p>
          </div>

          <div className="grid gap-6 max-w-5xl mx-auto">
            {[
              { id: '📚', title: "Course delivery", desc: "သင်ခန်းစာများ၊ ဗီဒီယိုများနှင့် သင်ထောက်ကူပစ္စည်းများကို ဒီဂျစ်တယ်စနစ်ဖြင့် ဖန်တီးဖြန့်ဝေပေးနိုင်ပါသည်။ထို့ကြောင့်ကျောင်းသားမျာအနဖြင့် ၂၄ နာရီပတ်လုံး အချိန်မရွေး ဝင်ရောက်လေ့လာနိုင်ပါသည်။" },
              { id: '📊', title: "Progress tracking", desc: "ကျောင်းသားတစ်ဦးချင်းစီ၏ သင်ယူမှုစွမ်းဆောင်ရည်ကို Live Dashboards များ၊ Learning Analytics များမှတစ်ဆင့် အချိန်နှင့်တစ်ပြေးညီ စောင့်ကြည့်စစ်ဆေးနိုင်ပါသည်။" },
              { id: '✏️', title: "Assessments & grading", desc: "ဥာဏ်စမ်းပဟေဠိများ၊ အိမ်စာတာဝန်များနှင့် အမှတ်ပေးစနစ်များကို အလိုအလျောက် (Automate) ဆောင်ရွက်ပေးနိုင်သောကြောင့် ဆရာ/ဆရာမများအတွက် အချိန်ကုန်သက်သာစေပါသည်။" },
              { id: '💬', title: "Communication tools", desc: "စနစ်အတွင်းပါဝင်သော မက်ဆေ့ဂျ်ပေးပို့ခြင်း၊ ဆွေးနွေးပွဲဖိုရမ်များ (Forums) နှင့် အကြောင်းကြားစာများ (Notifications) မှတစ်ဆင့် ဆရာ၊ ကျောင်းသားနှင့် မိဘများအကြား အမြဲမပြတ် ချိတ်ဆက်ပေးထားနိုင်ပါသည်။" },
              { id: '💰', title: "Financial Management", desc: "ကျောင်းလခများ စီမံခန့်ခွဲပေးခြင်း၊ ငွေပေးချေမှုများ၊ ပြေစာထုတ်ပေးခြင်းနှင့် ဘဏ္ဍာရေးဆိုင်ရာ အစီရင်ခံစာများကို ပလက်ဖောင်းတစ်ခုတည်းတွင် ဆောင်ရွက်နိုင်ပါသည်။ ထို့ကြောင့် လူကိုယ်တိုင် လုပ်ဆောင်ရသည့် အမှားများကို လျှော့ချပေးပီး မှန်ကန်တိကျမှုရှိစေပါသည်။" }
            ].map((feature, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={feature.id}
                className="flex flex-col sm:flex-row bg-white/60 backdrop-blur-md rounded-[24px] overflow-hidden shadow-sm border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="sm:w-32 bg-brand/10 flex items-center justify-center py-8 sm:py-0 font-display font-bold text-4xl text-brand/40 group-hover:text-brand group-hover:bg-brand/20 transition-colors shrink-0">
                  {feature.id}
                </div>
                <div className="p-8 lg:p-10">
                  <h4 className="font-bold text-2xl text-ink mb-3 tracking-tight">{feature.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who It's For */}
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="micro-label text-brand mb-4">Who It's For</p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tighter text-ink mb-6 leading-tight">Built for <span className="text-brand">Schools</span> and <span className="text-brand">Universities</span></h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-xl">
              <strong className="text-ink">IEM</strong> is purpose-designed to serve the needs of academic institutions — from primary schools to higher education establishments.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[32px] border border-white/50 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                <Users size={32} />
              </div>
              <h4 className="text-2xl font-bold text-ink mb-4 tracking-tight">K–12 Schools</h4>
              <p className="text-slate-600 leading-relaxed">
                Support teachers in delivering structured curricula, tracking student progress, and maintaining family engagement — all within a safe, age-appropriate environment.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[32px] border border-white/50 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                <Briefcase size={32} />
              </div>
              <h4 className="text-2xl font-bold text-ink mb-4 tracking-tight">Universities</h4>
              <p className="text-slate-600 leading-relaxed">
                Manage complex programmes, large student cohorts, and diverse assessment formats with a platform built for the scale and rigour of higher education.
              </p>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="bg-[#4ea59d] rounded-[40px] text-white overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://picsum.photos/seed/tech1/1920/1080')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/30 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-24">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase tracking-tighter mb-6">Trusted by Educators. <br /><span className="text-brand">Proven by Results.</span></h2>
              <p className="text-white/80 text-xl flex justify-center items-center">IEM is designed to create measurable outcomes for students and institutions alike.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center mb-12 sm:mb-20">
              <div className="p-8 border border-white/10 rounded-[24px] bg-white/5 backdrop-blur-sm">
                <p className="text-6xl font-display font-bold mb-4 text-brand-light">100%</p>
                <p className="text-lg font-mono uppercase tracking-widest text-white/60">Mobile Accessible</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[24px] bg-white/5 backdrop-blur-sm">
                <p className="text-6xl font-display font-bold mb-4 text-brand-light">K–12+</p>
                <p className="text-lg font-mono uppercase tracking-widest text-white/60">Purpose-Built For</p>
              </div>
              <div className="p-8 border border-white/10 rounded-[24px] bg-white/5 backdrop-blur-sm">
                <p className="text-6xl font-display font-bold mb-4 text-brand-light">1</p>
                <p className="text-lg font-mono uppercase tracking-widest text-white/60">Platform End-to-End</p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white/5 rounded-[32px] p-8 sm:p-10 lg:p-16 border border-white/10 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-8">Key advantages of choosing IEM:</h3>
              <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  "Centralised platform for all teaching, learning, and administration needs",
                  "Seamless access across desktop and mobile devices",
                  "Real-time data and analytics to support informed decision-making",
                  "Scalable infrastructure suitable for institutions of any size",
                  "Dedicated support and onboarding for staff and educators"
                ].map((adv) => (
                  <li key={adv} className="flex gap-4 items-start">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-brand shrink-0 shadow-[0_0_8px_rgba(78,165,157,0.8)]" />
                    <span className="text-white/80 leading-relaxed text-lg">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="bg-ink p-8 sm:p-12 lg:p-24 rounded-[40px] text-white relative overflow-hidden flex flex-col lg:flex-row gap-10 sm:gap-16 justify-between items-start lg:items-center shadow-xl">
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-brand/50 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <p className="micro-label text-brand mb-4">Get Started with IEM</p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display uppercase tracking-tighter mb-6">Ready to <span className="text-brand">Transform</span> Your Institution?</h2>
            <p className="text-white/60 text-xl leading-relaxed">
              Discover how IEM can modernise your learning environment, improve student outcomes, and simplify administration — from day one.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
            <button
              onClick={openDemoEmail}
              className="px-10 py-5 bg-brand text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-ink transition-all hover:-translate-y-1 shadow-lg border border-white/10 flex items-center justify-center gap-3 group"
            >
              Request a Demo <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const IemLab = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-20 sm:space-y-24 lg:space-y-32 relative z-10">

        {/* Header & Back */}
        <div>
          <button
            onClick={() => navigate('/#services')}
            className="flex items-center gap-2 text-brand/80 hover:text-brand transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-sm text-ink/70 group-hover:text-ink transition-colors">
              Back to Services
            </span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">IEM VIRTUAL SCIENCE LAB</p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-ink pb-2">Explore Science Without Limits</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A fully interactive virtual laboratory designed for K-12 students — bringing Biology, Chemistry, and Physics experiments to life, safely and accessibly, from any device.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="px-8 py-4 border border-brand bg-brand rounded-[16px] hover:brightness-110 transition-all font-bold text-white shadow-lg shadow-brand/20">Start Exploring</button>
            <button className="px-8 py-4 border border-brand text-brand rounded-[16px] hover:bg-brand/10 transition-colors font-bold shadow-sm">View Experiments</button>
          </div>
        </div>

        {/* About The Lab */}
        <div className="pt-16 border-t border-slate-200 space-y-8">
          <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">ABOUT THE LAB</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-2">Science, reimagined for the classroom</h2>
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed max-w-5xl">
            <p>
              The IEM Virtual Science Lab gives K-12 students the freedom to conduct real experiments in a safe, immersive digital environment. Whether dissecting cells, mixing chemical compounds, or exploring the laws of motion, students engage with science the way it was meant to be experienced — hands-on.
            </p>
            <p>
              Teachers can assign experiments, track student progress, and align lab activities with curriculum standards, all within the IEM platform.
            </p>
          </div>
        </div>

        {/* Subjects Covered */}
        <div className="pt-16 border-t border-slate-200 space-y-12">
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">SUBJECTS COVERED</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink">Four disciplines. One platform.</h2>
            <p className="text-slate-600 text-lg">The lab covers three core science disciplines and Information Technology, with hands-on labs and experiments tailored to K-12 learning levels.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 'biology', title: 'Biology', desc: 'Explore cells, ecosystems, genetics, and the human body through interactive simulations and virtual dissections.', icon: <Users size={24} className="text-emerald-600" />, bg: 'bg-emerald-50' },
              { id: 'chemistry', title: 'Chemistry', desc: 'Mix reagents, observe reactions, and understand the periodic table through guided virtual chemistry experiments.', icon: <FlaskConical size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
              { id: 'physics', title: 'Physics', desc: 'Experiment with forces, energy, light, and motion using real-time simulations that visualise abstract concepts.', icon: <Target size={24} className="text-amber-600" />, bg: 'bg-amber-50' },
              { id: 'it', title: 'Information Technology', desc: 'Learn programming, networking, computing concepts, and cybersecurity hands-on in a digital sandbox.', icon: <Cpu size={24} className="text-indigo-600" />, bg: 'bg-indigo-50' }
            ].map((subject, index) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} key={subject.id} className="p-10 bg-slate-50 border border-slate-100 shadow-sm rounded-[24px] hover:shadow-lg hover:-translate-y-1 transition-all group">
                <div className={`w-14 h-14 ${subject.bg} rounded-xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform`}>{subject.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-ink tracking-tight">{subject.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{subject.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="pt-16 border-t border-slate-200 space-y-12">
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">PLATFORM FEATURES</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-2">Built for learning. Designed for safety.</h2>
            <p className="text-slate-600 text-lg">Every feature of the IEM Virtual Science Lab is designed to maximise learning outcomes for K-12 students.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Safe experimentation', desc: 'Students conduct experiments that would be hazardous, expensive, or impossible in a physical lab — completely risk-free.' },
              { title: 'Curriculum aligned', desc: 'All experiments are mapped to national and international K-12 science curriculum standards for seamless classroom integration.' },
              { title: 'Step-by-step guidance', desc: 'Built-in instructions and hints guide students through each experiment, supporting independent and self-paced learning.' },
              { title: 'Teacher dashboard', desc: 'Assign experiments to classes, monitor student activity, and assess performance from a centralised teacher view.' },
              { title: 'Progress tracking', desc: 'Students and teachers can view experiment completion, scores, and learning milestones in real time.' },
              { title: 'Mobile ready', desc: 'Fully accessible on tablets, smartphones, and desktops — students can learn from school, home, or anywhere in between.' },
            ].map((f, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="p-8 bg-slate-50 border border-slate-100 shadow-sm rounded-[24px] hover:border-brand/20 hover:shadow-md transition-all">
                <h4 className="font-bold mb-3 text-ink text-[17px]">{f.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sample Experiments */}
        <div className="pt-16 border-t border-slate-200 space-y-12">
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">SAMPLE EXPERIMENTS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink">What students will explore</h2>
            <p className="text-slate-600 text-lg">From foundational concepts to advanced investigations, the lab offers a growing library of hands-on experiments.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'Biology', c: 'bg-emerald-100 text-emerald-800', title: 'Cell structure & function', desc: 'Explore plant and animal cells using a virtual microscope.' },
              { type: 'Biology', c: 'bg-emerald-100 text-emerald-800', title: 'Photosynthesis simulation', desc: 'Observe how light and CO₂ affect plant energy production.' },
              { type: 'Chemistry', c: 'bg-blue-100 text-blue-800', title: 'Acid-base reactions', desc: 'Mix solutions and observe pH changes with a virtual indicator.' },
              { type: 'Chemistry', c: 'bg-blue-100 text-blue-800', title: 'Periodic table explorer', desc: 'Discover element properties and electron configurations interactively.' },
              { type: 'Physics', c: 'bg-amber-100 text-amber-800', title: "Newton's laws of motion", desc: 'Apply forces to objects and observe how acceleration changes.' },
              { type: 'Physics', c: 'bg-amber-100 text-amber-800', title: 'Light & optics', desc: 'Experiment with lenses, mirrors, and the behaviour of light waves.' },
              { type: 'IT', c: 'bg-indigo-100 text-indigo-800', title: 'Network topologies', desc: 'Design and configure a local area network in a simulation.' },
              { type: 'IT', c: 'bg-indigo-100 text-indigo-800', title: 'Intro to Python', desc: 'Write and test your first algorithms in a safe, guided sandbox environment.' },
            ].map((e, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i} className="p-8 border border-slate-100 rounded-[24px] hover:border-brand/20 hover:shadow-lg shadow-sm transition-all bg-slate-50">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase mb-6 ${e.c}`}>{e.type}</span>
                <h4 className="font-bold mb-3 text-ink text-[17px]">{e.title}</h4>
                <p className="text-slate-500 text-[15px] leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why It Works & CTA */}
        <div className="pt-16 border-t border-slate-200 space-y-12 pb-12">
          <div className="space-y-4">
            <p className="font-bold uppercase tracking-[0.2em] text-brand text-sm">WHY IT WORKS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-8">Learning outcomes that matter</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-16">
            <div className="py-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-5xl font-bold mb-3 text-brand">4</p>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Core subjects</p>
            </div>
            <div className="py-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-5xl font-bold mb-3 text-brand">K-12</p>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">All grade levels</p>
            </div>
            <div className="py-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-5xl font-bold mb-3 text-brand">100%</p>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Safe & risk-free</p>
            </div>
            <div className="py-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm flex flex-col justify-center items-center">
              <p className="text-3xl font-bold mb-4 mt-2 text-brand">Any device</p>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Mobile ready</p>
            </div>
          </div>

          <div className="p-8 sm:p-12 lg:p-20 border border-brand/20 bg-brand/5 rounded-[40px] text-center max-w-4xl mx-auto space-y-8 sm:space-y-10 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-brand/5 to-transparent pointer-events-none group-hover:scale-105 transition-transform duration-1000" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold relative z-10 text-ink tracking-tight">Bring the lab to every student</h2>
            <p className="text-slate-600 text-lg leading-relaxed relative z-10 max-w-2xl mx-auto">
              Give your students access to world-class science experiences — no equipment, no hazards, no limits. The IEM Virtual Science Lab is ready for your school.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
              <button
                onClick={openDemoEmail}
                className="px-10 py-5 bg-brand text-white border border-transparent rounded-[16px] hover:brightness-110 transition-all font-bold shadow-lg shadow-brand/20 w-full sm:w-auto"
              >
                Request a Demo
              </button>
              <button
                onClick={() => navigate('/#contact')}
                className="px-10 py-5 border border-brand text-brand bg-white rounded-[16px] hover:bg-brand/5 transition-colors font-bold shadow-sm w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const BusinessPlans = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-slate-50 relative pt-32 pb-24 overflow-hidden"
    >
      {/* Background Particles or Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4ea59d]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#4ea59d]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32 relative z-10 px-6 lg:px-12">
        {/* Header & Back */}
        <div>
          <button
            onClick={() => {
              navigate('/#services');
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
            className="relative inline-flex items-center gap-2 px-6 py-3 bg-white text-ink text-xs font-bold uppercase tracking-widest rounded-full mb-12 hover:scale-105 shadow-[0_8px_16px_rgba(31,38,135,0.05),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-white/50 transition-all duration-300 group cursor-pointer"
          >
            <span className="flex items-center gap-2 pointer-events-none">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
            </span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-[#191924] text-white p-8 sm:p-12 lg:p-24 rounded-[32px] shadow-2xl relative overflow-hidden group mb-12 lg:mb-32 flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#191924] to-[#252536] opacity-90" />
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-[800px] h-[800px] bg-[#4ea59d] blur-[150px] mix-blend-screen rounded-full" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center">
            <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-white/50 mb-4">BUSINESS MACHINE</h1>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
              Operate smarter. Deliver faster. <br className="hidden lg:block" />
              Scale with confidence.
            </h2>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl mb-12 font-light">
              Business Machine is IEM's all-in-one professional toolkit for managing projects, deploying industrial robotics, and optimising network systems — engineered for modern business professionals.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto text-left w-full">
          <p className="font-bold tracking-[0.2em] uppercase text-[#4ea59d] text-sm mb-6">ABOUT BUSINESS MACHINE</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-10">Where operational excellence begins</h2>
          <div className="space-y-6 text-slate-600 text-lg lg:text-xl leading-relaxed font-light">
            <p>
              Business Machine is a powerful module within the Plumeria platform, purpose-built for business professionals who need to manage complex operations at scale. It brings together project management, industrial robotics coordination, and network infrastructure management into a single, unified workspace.
            </p>
            <p>
              Whether you are overseeing a large-scale project pipeline, coordinating robotic systems on the production floor, or monitoring your organisation's network health, Business Machine gives you the clarity, control, and tools to perform at the highest level.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200" />

        {/* Core Modules */}
        <div className="mx-auto w-full">
          <p className="font-bold tracking-[0.2em] uppercase text-[#4ea59d] text-sm mb-4">CORE MODULES</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">Three powerful capabilities. One platform.</h2>
          <p className="text-slate-600 text-lg mb-12 font-light max-w-3xl">
            Business Machine is built around three core disciplines that drive modern industrial and professional operations.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '📋', badge: 'Project Management', badgeC: 'text-indigo-600 bg-indigo-50', title: 'Plan, track, and deliver', desc: 'Manage projects end-to-end with task allocation, milestone tracking, team collaboration tools, and real-time progress dashboards — all in one place.' },
              { icon: '🤖', badge: 'Industrial Robots', badgeC: 'text-emerald-600 bg-emerald-50', title: 'Automate with precision', desc: 'Monitor, programme, and coordinate industrial robotic systems from a centralised interface — improving accuracy, reducing downtime, and maximising output.' },
              { icon: '🌐', badge: 'Network Systems', badgeC: 'text-rose-600 bg-rose-50', title: 'Connect and protect', desc: "Design, manage, and secure your organisation's network infrastructure with real-time monitoring, diagnostics, and performance analytics built for IT professionals." },
            ].map((module, i) => (
              <div key={i} className="p-8 lg:p-10 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-xl hover:border-slate-200 transition-all duration-300">
                <div className="w-16 h-16 bg-slate-50 flex items-center justify-center text-3xl rounded-2xl mb-8">
                  {module.icon}
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider mb-6 ${module.badgeC}`}>
                  {module.badge}
                </span>
                <h3 className="text-2xl font-bold text-ink tracking-tight mb-4">{module.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200" />

        {/* Platform Features */}
        <div className="mx-auto w-full">
          <p className="font-bold tracking-[0.2em] uppercase text-[#4ea59d] text-sm mb-4">PLATFORM FEATURES</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">Built for professionals who mean business</h2>
          <p className="text-slate-600 text-lg mb-16 font-light max-w-3xl">
            Business Machine is packed with features that keep operations running smoothly and teams performing at their peak.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Unified dashboard', desc: 'Get a single view of all your projects, robotic systems, and network status — updated in real time.' },
              { title: 'Task & resource allocation', desc: 'Assign tasks, manage workloads, and balance resources across teams and departments with precision.' },
              { title: 'Robot performance monitoring', desc: 'Track uptime, error rates, and output metrics for every robotic unit in your operation.' },
              { title: 'Network health alerts', desc: 'Receive instant alerts on network anomalies, outages, and security threats before they escalate.' },
              { title: 'Reporting & analytics', desc: 'Generate detailed operational reports to support data-driven decisions across all business units.' },
              { title: 'Role-based access control', desc: 'Define access levels for each team member — the right people get the right information, always.' },
            ].map((feature, i) => (
              <div key={i} className="p-8 lg:p-10 bg-white shadow-sm border border-slate-100 rounded-[24px]">
                <h4 className="font-bold text-xl text-ink mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200" />

        {/* Use Cases */}
        <div className="mx-auto w-full">
          <p className="font-bold tracking-[0.2em] uppercase text-[#4ea59d] text-sm mb-4">USE CASES</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">Who uses Business Machine</h2>
          <p className="text-slate-600 text-lg mb-16 font-light max-w-3xl">
            Business Machine serves professionals across a range of operational roles and industries.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: '01', title: 'Operations managers', desc: 'Oversee multiple workstreams, automate routine processes, and keep projects on track — all from a single interface.' },
              { num: '02', title: 'Automation engineers', desc: 'Programme and manage industrial robots, monitor system performance, and reduce manual intervention on the production floor.' },
              { num: '03', title: 'IT & network professionals', desc: "Monitor network infrastructure, troubleshoot connectivity issues, and maintain security across your organisation's systems." },
              { num: '04', title: 'Project managers', desc: 'Plan deliverables, track milestones, coordinate cross-functional teams, and report progress to stakeholders with ease.' },
            ].map((useCase, i) => (
              <div key={i} className="p-8 lg:p-12 bg-white rounded-[32px] border border-slate-100 shadow-sm">
                <p className="text-5xl font-black text-slate-100 mb-6 font-display">{useCase.num}</p>
                <h4 className="font-bold text-xl text-ink mb-3">{useCase.title}</h4>
                <p className="text-slate-600 leading-relaxed font-light">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-200" />

        {/* Why Business Machine */}
        <div className="mx-auto w-full">
          <p className="font-bold tracking-[0.2em] uppercase text-[#4ea59d] text-sm mb-4">WHY BUSINESS MACHINE</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-12">Engineered for impact</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { stat: '3', label: 'Core modules' },
              { stat: '1', label: 'Unified platform' },
              { stat: 'Real-time', label: 'Monitoring & alerts' },
              { stat: 'PLUMERIA', label: 'Fully integrated' },
            ].map((stat, i) => (
              <div key={i} className="py-12 px-6 bg-[#181824] rounded-[24px] text-center flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-white mb-2">{stat.stat}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call To Action */}
        <div className="mt-20 w-full text-center py-16 lg:py-24 bg-white rounded-[40px] px-6 border border-slate-200 shadow-sm max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-8">Ready to put your business in motion?</h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            Business Machine gives your team the tools to manage projects, control industrial systems, and secure your network — all within the IEM platform you already know.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/#contact')} className="px-8 py-4 rounded-[12px] bg-[#4ea59d] text-white font-bold hover:brightness-110 transition-all shadow-lg w-full sm:w-auto">
              Get Started
            </button>
            <button onClick={() => navigate('/#contact')} className="px-8 py-4 rounded-[12px] bg-transparent text-ink border border-slate-200 font-bold hover:bg-slate-50 transition-all w-full sm:w-auto">
              Contact Sales
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

const AiSolutions = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-ink transition-colors mb-8">
          <ArrowLeft size={20} />
          <span className="font-bold tracking-tight">Back</span>
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-24 mt-6">
        <div className="bg-[#10172A] rounded-[40px] text-center p-8 sm:p-12 lg:p-24 relative overflow-hidden text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/20 via-[#10172A] to-[#10172A]"></div>
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand/10 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase mb-8 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-brand rounded-full"></span>
              AI Solutions Services
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
              Intelligent solutions for a <br />
              <span className="text-brand">smarter world</span>
            </h1>
            <p className="text-lg text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
              We deliver cutting-edge AI services across Education, Business, and Medical sectors — transforming the way organisations learn, operate, and care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-brand text-white font-bold hover:brightness-110 transition-all shadow-lg w-full sm:w-auto" onClick={() => navigate('/#contact')}>
                Explore AI Solutions
              </button>
              <button className="px-8 py-4 rounded-xl bg-transparent border border-white/20 text-white font-bold hover:bg-white/10 transition-all w-full sm:w-auto" onClick={() => navigate('/#contact')}>
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">AI that works where it matters most</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Our AI Solutions Services are built for real-world impact. Whether you are an educational institution looking to personalise learning, a business seeking to automate operations, or a medical provider aiming to improve patient outcomes — we have the expertise and technology to make it happen.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Every solution is tailored to the unique needs of your sector, backed by proven AI capabilities and delivered by a team of specialists.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '3', subtitle: 'Sectors served' },
              { title: '5+', subtitle: 'AI capabilities' },
              { title: 'End-to-end', subtitle: 'Implementation' },
              { title: '24/7', subtitle: 'AI-powered systems' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-[24px] bg-white border border-slate-100 shadow-sm text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-4xl font-bold text-ink mb-2">{stat.title}</p>
                <p className="text-slate-500 text-sm">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-32 border-t border-slate-100 pt-32">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-red-500">
            <Target size={20} />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Sector Solutions</span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">AI tailored to every industry</h2>
        <p className="text-slate-600 text-lg max-w-4xl mb-16">
          From classrooms to boardrooms to clinical settings, our AI solutions are purpose-built for the challenges and opportunities unique to each sector.
        </p>

        <div className="space-y-8">
          {/* Education */}
          <div className="p-6 sm:p-10 border border-slate-200 rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="text-2xl font-bold text-ink">Education</h3>
            </div>
            <p className="text-slate-500 mb-10 ml-7">Empowering institutions, educators, and students with intelligent learning tools</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Personalised learning paths', desc: 'AI analyses each student\'s pace, strengths, and gaps to deliver a tailored curriculum that maximises learning outcomes.' },
                { title: 'AI tutoring & virtual assistants', desc: '24/7 conversational AI tutors provide instant support, answer questions, and guide students through complex topics.' },
                { title: 'Predictive student analytics', desc: 'Identify at-risk students early using predictive models, enabling timely interventions that improve retention and performance.' },
                { title: 'Automated assessment & grading', desc: 'Reduce educator workload with AI-powered grading tools that deliver consistent, objective feedback at scale.' },
                { title: 'Curriculum design support', desc: 'Use AI to align course content with learning standards, student performance data, and real-world skill requirements.' },
                { title: 'Administrative automation', desc: 'Streamline enrolment, scheduling, and reporting workflows so educators can focus on teaching, not paperwork.' },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-[20px] bg-[#f0f6ff]">
                  <h4 className="font-bold text-ink mb-2 text-[15px]">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Business */}
          <div className="p-6 sm:p-10 border border-slate-200 rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <h3 className="text-2xl font-bold text-ink">Business</h3>
            </div>
            <p className="text-slate-500 mb-10 ml-7">Driving efficiency, growth, and competitive advantage through intelligent automation</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Workflow automation', desc: 'Automate repetitive processes across departments — reducing costs, eliminating errors, and accelerating delivery times.' },
                { title: 'AI-powered chatbots', desc: 'Deploy intelligent virtual assistants for customer service, internal support, and lead generation — available around the clock.' },
                { title: 'Predictive business analytics', desc: 'Leverage AI to forecast demand, identify trends, and make data-driven decisions that keep your business ahead of the curve.' },
                { title: 'Intelligent project management', desc: 'AI tools that optimise task allocation, flag risks early, and provide real-time project health insights to keep delivery on track.' },
                { title: 'Sales & marketing intelligence', desc: 'Use AI to personalise campaigns, score leads, and identify the highest-value opportunities in your pipeline.' },
                { title: 'Supply chain optimisation', desc: 'AI-driven logistics and inventory management that reduces waste, improves lead times, and strengthens operational resilience.' },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-[20px] bg-[#fff8eb]">
                  <h4 className="font-bold text-ink mb-2 text-[15px]">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Medical */}
          <div className="p-6 sm:p-10 border border-slate-200 rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <h3 className="text-2xl font-bold text-ink">Medical</h3>
            </div>
            <p className="text-slate-500 mb-10 ml-7">Transforming patient care and clinical operations with responsible, precise AI</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'AI-powered diagnostics', desc: 'Support clinicians with AI tools that analyse symptoms, imaging, and patient history to assist in faster, more accurate diagnoses.' },
                { title: 'Predictive patient analytics', desc: 'Identify high-risk patients before conditions worsen — enabling proactive care and reducing hospital readmission rates.' },
                { title: 'Virtual health assistants', desc: 'Conversational AI that supports patients with appointment scheduling, medication reminders, and health guidance at any hour.' },
                { title: 'Clinical workflow automation', desc: 'Automate documentation, billing, and administrative tasks — freeing clinical staff to focus entirely on patient care.' },
                { title: 'Drug interaction analysis', desc: 'AI systems that cross-reference prescriptions and patient profiles to flag potential interactions and improve medication safety.' },
                { title: 'Remote patient monitoring', desc: 'Continuous AI-driven monitoring of patient vitals and health data, with instant alerts for clinical teams when intervention is needed.' },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-[20px] bg-[#ecfdf5]">
                  <h4 className="font-bold text-ink mb-2 text-[15px]">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-32 border-t border-slate-100 pt-32">
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-12 rounded-[16px] bg-brand/10 flex items-center justify-center text-brand shrink-0">
            <Cpu size={24} />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-2">AI Capabilities</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">The technology powering our solutions</h2>
            <p className="text-slate-600 text-lg max-w-4xl">
              Our services are built on a suite of proven AI capabilities — deployed responsibly, and configured to fit your organisation's specific needs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            { tag: 'Chatbots & Virtual Assistants', tagColor: 'bg-blue-100 text-blue-700', title: 'Always-on conversational AI', desc: 'Natural language AI agents that communicate fluently with students, customers, and patients — handling enquiries, guidance, and support 24 hours a day.' },
            { tag: 'Predictive Analytics', tagColor: 'bg-purple-100 text-purple-700', title: 'See what\'s coming before it arrives', desc: 'Machine learning models that analyse historical data to forecast outcomes, identify risks, and surface opportunities — across education, business, and clinical settings.' },
            { tag: 'Automation & Workflow', tagColor: 'bg-orange-100 text-orange-700', title: 'Work smarter, not harder', desc: 'Intelligent process automation that eliminates repetitive tasks, reduces human error, and accelerates throughput across every department and function.' },
            { tag: 'AI-Powered Diagnostics', tagColor: 'bg-green-100 text-green-700', title: 'Precision where it counts most', desc: 'Advanced AI models trained to support clinical and technical diagnostics — delivering faster, more consistent analysis that supports better decision-making.' },
            { tag: 'Personalised Recommendations', tagColor: 'bg-pink-100 text-pink-700', title: 'The right experience for every individual', desc: 'AI that learns from user behaviour and data to deliver personalised learning paths, product recommendations, and care plans — at scale.' },
            { tag: 'Custom AI', tagColor: 'bg-slate-100 text-slate-700', title: 'Built around your needs', desc: 'Every organisation is different. We work with you to design and deploy custom AI models and integrations that solve your most specific and complex challenges.' },
          ].map((cap, i) => (
            <div key={i} className="p-8 border border-slate-200 rounded-[32px] bg-white hover:border-brand/30 transition-colors">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 ${cap.tagColor}`}>
                {cap.tag}
              </span>
              <h4 className="text-[17px] font-bold text-ink mb-3">{cap.title}</h4>
              <p className="text-slate-500 text-[14px] leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-32 border-t border-slate-100 pt-32">
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-12 rounded-[16px] bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21v-5h5" /></svg>
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500 block mb-2">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-ink mb-6">From discovery to deployment</h2>
            <p className="text-slate-600 text-lg max-w-3xl">
              Our proven four-step process ensures every AI solution is implemented with precision, aligned to your goals, and built to deliver lasting results.
            </p>
          </div>
        </div>

        <div className="relative mt-20">
          <div className="absolute top-8 left-0 w-full h-[3px] bg-gradient-to-r from-blue-400 via-brand to-cyan-400 hidden md:block opacity-50"></div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Discover', desc: 'We assess your sector, challenges, and goals to identify the highest-impact AI opportunities.', color: 'bg-blue-400' },
              { step: '2', title: 'Design', desc: 'Our team designs a tailored AI solution architecture mapped to your workflows and objectives.', color: 'bg-blue-500' },
              { step: '3', title: 'Deploy', desc: 'We implement and integrate your AI solution with full support, testing, and staff onboarding.', color: 'bg-brand' },
              { step: '4', title: 'Optimise', desc: 'Ongoing monitoring, refinement, and updates ensure your AI keeps improving over time.', color: 'bg-cyan-500' },
            ].map((s, i) => (
              <div key={i} className="relative text-center pt-8 md:pt-0 group">
                <div className={`w-16 h-16 rounded-full text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg ${s.color} group-hover:scale-110 transition-transform`}>
                  {s.step}
                </div>
                <h4 className="font-bold text-ink mb-3">{s.title}</h4>
                <p className="text-slate-500 text-[14px] leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="max-w-5xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-[#10172A] rounded-[40px] text-center p-8 sm:p-12 lg:p-24 text-white hover:shadow-xl transition-shadow relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand/10 pointer-events-none"></div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Ready to harness the power of AI?</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you are in education, business, or healthcare — we have the expertise and technology to transform your operations. Let's build something intelligent together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 rounded-[12px] bg-brand text-white font-bold hover:brightness-110 transition-all shadow-lg w-full sm:w-auto sm:min-w-[200px]" onClick={() => navigate('/#contact')}>
              Get Started Today
            </button>
            <button className="px-8 py-4 rounded-[12px] bg-transparent border border-white/20 text-white font-bold hover:bg-white/10 transition-all w-full sm:w-auto sm:min-w-[200px]" onClick={() => navigate('/#contact')}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="min-h-screen selection:bg-brand selection:text-white relative overflow-x-hidden">
        <BackgroundParticles />
        <MouseFollower />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Services />
                <Resources />
                <Contact />
              </>
            } />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/who-we-service" element={<WhoWeService />} />
            <Route path="/events" element={<Events />} />
            <Route path="/services/sms-lms" element={<SmsLms />} />
            <Route path="/services/iem-lab" element={<IemLab />} />
            <Route path="/services/business-plans" element={<BusinessPlans />} />
            <Route path="/services/ai-solutions" element={<AiSolutions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
