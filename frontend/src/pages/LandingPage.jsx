import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Star,
  Users,
  Compass
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-blue-400/10 blur-[100px] animate-blob pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[550px] h-[550px] rounded-full bg-accent-light/10 blur-[130px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[110px] animate-blob pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-left space-y-6 z-10">
            <Badge variant="accent" icon={Sparkles} className="animate-pulse">
              Powered by Vector Embeddings & LLMs
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
              AI that matches you with mentors who
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent block">
                truly understand your journey.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
              Move beyond basic filters. MirrorPathAI maps your motivations, struggles, and aspirations to surface connections that resonate on a personal, human level.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto" icon={ArrowRight}>
                  Get Started
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </a>
            </div>
          </div>

          {/* Floating Glassmorphic Match Card */}
          <div className="lg:col-span-5 flex justify-center z-10">
            <div className="relative w-full max-w-sm">
              {/* Decorative backdrop glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur-xl opacity-20" />
              
              <div className="relative bg-white/80 backdrop-blur-md border border-slate-100/50 rounded-3xl p-6 shadow-2xl space-y-5">
                {/* Match Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="text-primary w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Semantic AI Match</span>
                  </div>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary/20 bg-primary/5 text-primary text-sm font-bold">
                    96%
                  </div>
                </div>

                {/* Match Profiles */}
                <div className="space-y-4">
                  {/* Student */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      SK
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">Siddharth Kumar</h4>
                      <p className="text-[10px] text-slate-400">CS Junior • Pivot into Product Management</p>
                    </div>
                  </div>

                  {/* Connect Line */}
                  <div className="pl-4 border-l border-dashed border-slate-200 h-6 my-1" />

                  {/* Alumni */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      AG
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">Anjali Gupta</h4>
                      <p className="text-[10px] text-slate-400">Product Lead @ Stripe • Ex-Software Engineer</p>
                    </div>
                  </div>
                </div>

                {/* Compatibility Snippet */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-500 leading-relaxed">
                  "Both share a common turning point: transitioning from heavy technical programming to human-centric design. Overcame early imposter syndrome in design reviews."
                </div>

                <div className="flex space-x-2 pt-1">
                  <Badge variant="accent" size="sm">Technical Pivot</Badge>
                  <Badge variant="success" size="sm">Stripe</Badge>
                  <Badge variant="neutral" size="sm">Design Philosophy</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Key Capabilities</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800">Deep features built for genuine connection</h3>
            <p className="text-sm text-slate-400">
              Unlike legacy directories, MirrorPathAI parses the core elements of your career journey to construct relationships that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card hoverEffect className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h4 className="text-sm font-bold text-slate-800">AI Identity Profiles</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates a detailed summary of your career personality, struggles, and objectives based on reflective onboarding questions.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card hoverEffect className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Compass size={20} />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Semantic Matching</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Performs multi-dimensional vector search across student identities and alumni histories to calculate deeper similarities.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card hoverEffect className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Target size={20} />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Deep Match Explanations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Highlights overlapping themes and describes exactly why you pair together (e.g., shared career pivot struggles).
              </p>
            </Card>

            {/* Feature 4 */}
            <Card hoverEffect className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                <Shield size={20} />
              </div>
              <h4 className="text-sm font-bold text-slate-800">Privacy-First</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You control when your identity is shared, how you connect, and which details are exposed to prospective matches.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 bg-slate-50/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Process</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800">How MirrorPathAI Works</h3>
            <p className="text-sm text-slate-400">
              An onboarding flow built to understand your career identity.
            </p>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 z-10">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="text-sm font-bold text-slate-800">Build Your Profile</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Input basic details like department and graduation target to establish credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 z-10">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="text-sm font-bold text-slate-800">Complete AI Interview</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Answer conversational questions about your motivations, obstacles, and career objectives.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 z-10">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="text-sm font-bold text-slate-800">AI Profile Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our LLMs construct your semantic vector profile, extracting core themes and traits.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 z-10">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h4 className="text-sm font-bold text-slate-800">Find Compatible Matches</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare scores, review similarity notes, and send custom connection invites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- AI ILLUSTRATION SECTION --- */}
      <section className="py-20 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="neutral">The Math Behind The Magic</Badge>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800">Vector Embeddings & Semantic Matching</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Traditional platforms rely on keyword tags like "Java" or "Product Manager". If tags don't overlap, matches fail.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              MirrorPathAI uses LLMs to convert your narrative reflections into 1536-dimensional vector points. We project student struggles and alumni experiences into a unified space, checking proximity scores. A student pivoting from design to coding is matched with an alumni who did the exact same, regardless of graduation years.
            </p>
          </div>

          {/* Visual Embedding Illustration */}
          <div className="relative h-64 border border-slate-100 rounded-3xl bg-slate-50/50 flex items-center justify-center p-6 shadow-inner">
            {/* Simulated Node clusters */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Connecting lines */}
                <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="1.5" />
                <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="1.5" />
                <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="1.5" />
                <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="#2563EB" strokeWidth="1.5" />
                <circle cx="20%" cy="30%" r="5" fill="#94A3B8" />
                <circle cx="80%" cy="20%" r="5" fill="#94A3B8" />
                <circle cx="30%" cy="80%" r="5" fill="#94A3B8" />
                <circle cx="70%" cy="70%" r="5" fill="#94A3B8" />
              </svg>
            </div>

            {/* Glowing nodes in center */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 h-24 rounded-full bg-primary/10 animate-ping" />
              <div className="relative bg-white border border-slate-100 p-4 rounded-2xl shadow-xl flex items-center space-x-3 z-10">
                <Sparkles className="text-primary w-5 h-5" />
                <span className="text-xs font-semibold text-slate-700">Semantic Matching Space</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonials" className="py-20 bg-slate-50/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary">Success Stories</h2>
            <h3 className="text-3xl font-bold tracking-tight text-slate-800">What our community says</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <Card className="space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "MirrorPathAI matched me with a Lead Engineer at Stripe. We had almost identical career pivots, transitioning from business backgrounds. Her advice on framing interviews was game-changing."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                  AR
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Arjun Rao</h4>
                  <p className="text-[10px] text-slate-400">Student • BITS Pilani</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 2 */}
            <Card className="space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "As an alumnus, I've used several mentoring networks. This is the first where every matched student I meet feels like a younger version of myself. The conversations start on page 10 instead of page 1."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                  KD
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Kavita Deshmukh</h4>
                  <p className="text-[10px] text-slate-400">Product Manager • ex-Microsoft</p>
                </div>
              </div>
            </Card>

            {/* Testimonial 3 */}
            <Card className="space-y-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400 w-4 h-4" />
                ))}
              </div>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "I was struggling with imposter syndrome while preparing to pivot into tech. My mentor matched with me based on our mutual experiences of dealing with setbacks during final year placement drives."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Sania Mirza</h4>
                  <p className="text-[10px] text-slate-400">Student • VIT Pune</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 md:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
            {/* Backglow overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
            
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to find mentorship that fits your path?
            </h3>
            <p className="text-sm text-blue-100 max-w-lg mx-auto leading-relaxed">
              Create your account, answer a few profile reflections, and let our semantic models trace matching partners.
            </p>
            <div className="flex justify-center pt-2">
              <Link to="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-50 border-0 shadow-lg shadow-blue-800/20">
                  Get Started For Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 relative z-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary flex items-center justify-center w-6 h-6 rounded-lg text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                MirrorPath<span className="text-primary font-black">AI</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              Deep semantic similarity matching for students and alumni. Built with LLM vector embeddings.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact</h4>
            <p className="text-xs">support@mirrorpath.ai</p>
            <p className="text-[10px] mt-2 text-slate-500">© 2026 MirrorPathAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
