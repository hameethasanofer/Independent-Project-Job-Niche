'use client'

import { useState } from 'react'
import { Search, MapPin, Briefcase, Users, Building, TrendingUp, Star, ChevronRight, Clock, Award, Zap } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const featuredJobs = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $160k',
      type: 'Full-time',
      logo: '🚀'
    },
    {
      title: 'Data Scientist',
      company: 'DataFlow Inc',
      location: 'New York, NY',
      salary: '$130k - $170k',
      type: 'Full-time',
      logo: '📊'
    },
    {
      title: 'Product Manager',
      company: 'InnovateLab',
      location: 'Austin, TX',
      salary: '$110k - $150k',
      type: 'Full-time',
      logo: '💡'
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "👩‍💻",
      quote: "JobHub helped me land my dream job in just 2 weeks!"
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager at Meta",
      image: "👨‍💼",
      quote: "The best platform for finding tech opportunities."
    },
    {
      name: "Emily Johnson",
      role: "Data Scientist at Netflix",
      image: "👩‍🔬",
      quote: "Amazing experience, highly recommend to everyone!"
    }
  ]

  const trendingJobs = [
    { title: "AI Engineer", growth: "+45%", salary: "$150k+" },
    { title: "Cloud Architect", growth: "+38%", salary: "$140k+" },
    { title: "DevOps Engineer", growth: "+32%", salary: "$130k+" },
    { title: "Full Stack Developer", growth: "+28%", salary: "$120k+" }
  ]

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-sky-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>


      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Hero Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight overflow-hidden">
            Find Your{' '}
            <span className="bg-gradient-to-r text-5xl md:text-7xl font-bold from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Dream Job
            </span>{' '}
            Today
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed overflow-hidden">
            Connect with top companies and discover opportunities that match your skills and aspirations. 
            Your next career milestone is just a click away.
          </p>

          {/* Success Stories Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 overflow-hidden">Success Stories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl mr-4">
                      {testimonial.image}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Jobs */}
          <div className="mb-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-2xl font-bold text-gray-800">Trending Jobs This Week</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {trendingJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.salary}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 font-semibold text-sm">{job.growth}</span>
                      <p className="text-xs text-gray-500">growth</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold">
                View All Trending Jobs
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 overflow-hidden">Get Started in Minutes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-white/50 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Build Profile</h4>
                <p className="text-gray-600 mb-4">Create your professional profile in under 5 minutes</p>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium">
                  Start Now
                </button>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-white/50 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Smart Search</h4>
                <p className="text-gray-600 mb-4">AI-powered job matching based on your skills</p>
                <button className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors font-medium">
                  Try Search
                </button>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-white/50 group cursor-pointer">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Get Hired</h4>
                <p className="text-gray-600 mb-4">Apply to jobs and get responses within 24 hours</p>
                <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center ">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2 overflow-hidden">50K+</div>
              <div className="text-gray-600 font-medium">Active Jobs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2 overflow-hidden">25K+</div>
              <div className="text-gray-600 font-medium">Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2 overflow-hidden">100K+</div>
              <div className="text-gray-600 font-medium">Job Seekers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-500 mb-2 overflow-hidden">95%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 overflow-hidden">Featured Jobs</h2>
            <p className="text-xl text-gray-600">Discover hand-picked opportunities from top companies</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredJobs.map((job, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-white/50">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${
                    index === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                    index === 1 ? 'bg-gradient-to-r from-sky-500 to-blue-600' :
                    'bg-gradient-to-r from-indigo-500 to-blue-600'
                  } rounded-xl flex items-center justify-center text-2xl mr-4`}>
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {job.type}
                  </div>
                </div>
                <button className={`w-full py-3 ${
                  index === 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' :
                  index === 1 ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700' :
                  'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700'
                } text-white rounded-xl transition-all font-semibold`}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-blue-500/10 to-indigo-600/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 overflow-hidden">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through JobHub. 
            Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold text-lg flex items-center justify-center">
              Create Your Profile
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-semibold text-lg flex items-center justify-center">
              Browse All Jobs
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
