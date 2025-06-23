export default function ServicesSection() {
  const services = [
    {
      title: "Artificial Intelligence",
      description: "Smart AI solutions to automate and optimize your business processes",
      image: "/api/placeholder/300/200",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      title: "Oracle Solutions Expertise",
      description: "Comprehensive Oracle database and application solutions",
      image: "/api/placeholder/300/200",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Data Analytics & Insights",
      description: "Transform your data into actionable business insights",
      image: "/api/placeholder/300/200",
      gradient: "from-gray-600 to-gray-800"
    },
    {
      title: "Cloud Integration Services",
      description: "Seamless cloud migration and integration solutions",
      image: "/api/placeholder/300/200",
      gradient: "from-purple-500 to-purple-700"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transform your business with{' '}
            <span className="text-red-600">advanced technologies</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At APPIT Software, our aim is to connect businesses by integrating emerging IT solutions and cloud services in a dynamic environment. APPIT Software offers an extensive experience in the administration of complex IT solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105">
                {/* Image */}
                <div className="h-48 relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-80`} />
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm opacity-90">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
