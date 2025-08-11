import React, { useState, useEffect, useRef } from 'react';
import { Star, Zap, MapPin, Users, Search, Award } from 'lucide-react';
import Footer from '../components/Footer';

export default function LandingPage() {
  const fullWord = "Resume";
  const fullWordRef = useRef(null);
  const [fixedWidth, setFixedWidth] = useState(0);

  useEffect(() => {
    if (fullWordRef.current) {
      setFixedWidth(fullWordRef.current.offsetWidth);
    }
  }, []);

  const testimonials = [
    {
      name: "Anita Perera",
      role: "Marketing Specialist",
      image: "📝",
      quote: "The Resume Builder made creating a standout CV so easy and fast!"
    },
    {
      name: "Lahiru Fernando",
      role: "Software Developer",
      image: "👨‍💻",
      quote: "Thanks to JobHub’s resume templates, I landed my dream job in less than a month."
    },
    {
      name: "Nisha Kumar",
      role: "Project Manager",
      image: "👩‍💼",
      quote: "I customized my resume effortlessly and felt confident applying for jobs."
    }
  ];

  const templates = [
    { name: "Modern Minimalist", icon: "📄" },
    { name: "Professional Classic", icon: "📃" },
    { name: "Creative Designer", icon: "🎨" },
    { name: "Tech Guru", icon: "💻" }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-indigo-600" />,
      title: "Easy to Use",
      desc: "Intuitive editor with drag-and-drop, no design skills needed."
    },
    {
      icon: <Search className="w-6 h-6 text-indigo-600" />,
      title: "Customizable Templates",
      desc: "Choose from professionally designed templates tailored for your field."
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: "Download & Share",
      desc: "Export your resume as PDF or share it directly with employers."
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      title: "Get Noticed",
      desc: "Optimized layouts to highlight your skills and achievements."
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Select Template",
      description: "Pick a resume design that fits your style and profession."
    },
    {
      step: "2",
      title: "Add Your Details",
      description: "Fill in your education, work experience, and skills."
    },
    {
      step: "3",
      title: "Customize & Preview",
      description: "Easily adjust sections, fonts, and colors to your liking."
    },
    {
      step: "4",
      title: "Download & Apply",
      description: "Get your resume in PDF format and start applying instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 relative">
      {/* Remove overflow-hidden here if present */}

      <main className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 max-w-7xl pb-40">
        {/* Hero Headline */}
        <section className="text-center w-full mx-auto relative">
          <h1
            className="text-7xl md:text-8xl font-black leading-tight text-gray-900 whitespace-nowrap overflow-x-auto mb-3 tracking-tight w-full"
            style={{
              letterSpacing: "-0.04em",
              paddingRight: "0.15em",
              display: "block",
            }}
          >
            Build Your{' '}
            <span
              className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 whitespace-nowrap"
              style={{
                fontSize: "4rem",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
              ref={fullWordRef}
            >
              {fullWord}
            </span>{' '}
            For Success
          </h1>

          <p className="text-lg md:text-xl font-semibold text-gray-700 leading-relaxed max-w-3xl mt-2 mx-auto">
            Create a professional resume quickly and easily with JobHub’s Resume Builder. Stand out from the crowd and land your dream job.
          </p>
        </section>

        {/* Testimonials */}
        <section className="w-full px-6 lg:px-16 xl:px-32 mx-auto font-bold">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl py-6 px-8 text-center">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-indigo-600" />
              Success Stories
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="w-80 min-w-[320px] bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition flex-shrink-0"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl mr-3">
                      {t.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{t.name}</h4>
                      <p className="text-sm text-gray-600">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 italic text-sm">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="max-w-7xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl py-10 px-8 text-center">
            <h3 className="text-3xl font-bold text-indigo-600 mb-8 flex items-center justify-center gap-3">
              <Zap className="w-7 h-7 text-indigo-600" />
              Why Choose JobHub Resume Builder?
            </h3>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-[60px]">
              {features.map(({ icon, title, desc }, i) => (
                <div key={i} className="shadow flex flex-col items-center p-5">
                  <div className="mb-4">{icon}</div>
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">{title}</h4>
                  <p className="text-gray-700 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-10">
          <h3 className="text-3xl font-bold text-indigo-600 mb-8 text-center flex items-center justify-center gap-3">
            <Users className="w-7 h-7 text-indigo-600" />
            How It Works
          </h3>
          <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {steps.map(({ step, title, description }, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-3xl font-extrabold text-indigo-600 mb-3">{step}</div>
                <h4 className="font-semibold text-lg mb-2 text-gray-900">{title}</h4>
                <p className="text-gray-700 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Ready to Build a Resume That Stands Out?
          </h2>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Join thousands who created professional resumes and secured their dream jobs with JobHub.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl px-8 py-3 font-semibold text-lg hover:brightness-110 transition mt-4">
            Start Building Your Resume Now
          </button>
        </section>
      </main>

      {/* Footer fixed at bottom */}
      <Footer />
    </div>
  );
}
