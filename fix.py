with open('/Users/hlanhtetnaing/Downloads/plumeria-tech/src/App.tsx', 'r') as f:
    lines = f.readlines()

new_content = """                ].map((adv) => (
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
        <div className="bg-ink p-12 lg:p-24 rounded-[40px] text-white relative overflow-hidden flex flex-col lg:flex-row gap-16 justify-between items-center shadow-xl">
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-brand/50 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <p className="micro-label text-brand mb-4">Get Started with IEM</p>
            <h2 className="text-5xl lg:text-6xl font-display uppercase tracking-tighter mb-6">Ready to <span className="text-brand">Transform</span> Your Institution?</h2>
            <p className="text-white/60 text-xl leading-relaxed">
              Discover how IEM can modernise your learning environment, improve student outcomes, and simplify administration — from day one.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-6 shrink-0 w-full lg:w-auto">
            <button className="px-10 py-5 bg-brand text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-ink transition-all hover:-translate-y-1 shadow-lg border border-white/10 flex items-center justify-center gap-3 group">
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
      <div className="max-w-6xl mx-auto space-y-32 relative z-10">

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
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-ink pb-2">Explore Science Without Limits</h1>
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
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-2">Science, reimagined for the classroom</h2>
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
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-ink">Three sciences. One virtual lab.</h2>
            <p className="text-slate-600 text-lg">The lab covers all three core science disciplines, with experiments tailored to K-12 learning levels.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 'biology', title: 'Biology', desc: 'Explore cells, ecosystems, genetics, and the human body through interactive simulations and virtual dissections.', icon: <Users size={24} className="text-emerald-600" />, bg: 'bg-emerald-50' },
              { id: 'chemistry', title: 'Chemistry', desc: 'Mix reagents, observe reactions, and understand the periodic table through guided virtual chemistry experiments.', icon: <FlaskConical size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
              { id: 'physics', title: 'Physics', desc: 'Experiment with forces, energy, light, and motion using real-time simulations that visualise abstract concepts.', icon: <Target size={24} className="text-amber-600" />, bg: 'bg-amber-50' }
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
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-2">Built for learning. Designed for safety.</h2>
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
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-ink">What students will explore</h2>
            <p className="text-slate-600 text-lg">From foundational concepts to advanced investigations, the lab offers a growing library of hands-on experiments.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: 'Biology', c: 'bg-emerald-100 text-emerald-800', title: 'Cell structure & function', desc: 'Explore plant and animal cells using a virtual microscope.' },
              { type: 'Biology', c: 'bg-emerald-100 text-emerald-800', title: 'Photosynthesis simulation', desc: 'Observe how light and CO₂ affect plant energy production.' },
              { type: 'Chemistry', c: 'bg-blue-100 text-blue-800', title: 'Acid-base reactions', desc: 'Mix solutions and observe pH changes with a virtual indicator.' },
              { type: 'Chemistry', c: 'bg-blue-100 text-blue-800', title: 'Periodic table explorer', desc: 'Discover element properties and electron configurations interactively.' },
              { type: 'Physics', c: 'bg-amber-100 text-amber-800', title: 'Newton\'s laws of motion', desc: 'Apply forces to objects and observe how acceleration changes.' },
              { type: 'Physics', c: 'bg-amber-100 text-amber-800', title: 'Light & optics', desc: 'Experiment with lenses, mirrors, and the behaviour of light waves.' },
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
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-ink mb-8">Learning outcomes that matter</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-16">
            <div className="py-12 bg-slate-50 rounded-[24px] border border-slate-100 shadow-sm">
              <p className="text-5xl font-bold mb-3 text-brand">3</p>
              <p className="text-slate-500 text-sm uppercase tracking-widest font-bold">Science subjects</p>
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

          <div className="p-12 lg:p-20 border border-brand/20 bg-brand/5 rounded-[40px] text-center max-w-4xl mx-auto space-y-10 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-brand/5 to-transparent pointer-events-none group-hover:scale-105 transition-transform duration-1000" />
            <h2 className="text-3xl lg:text-5xl font-bold relative z-10 text-ink tracking-tight">Bring the lab to every student</h2>
            <p className="text-slate-600 text-lg leading-relaxed relative z-10 max-w-2xl mx-auto">
              Give your students access to world-class science experiences — no equipment, no hazards, no limits. The IEM Virtual Science Lab is ready for your school.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
              <button
                onClick={() => navigate('/#contact')}
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
"""

lines = lines[:1325] + [line + '\n' for line in new_content.split('\n')] + lines[1534:]

with open('/Users/hlanhtetnaing/Downloads/plumeria-tech/src/App.tsx', 'w') as f:
    f.writelines(lines)

