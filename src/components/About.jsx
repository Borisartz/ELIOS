const About = () => {
  const features = [
    {
      title: 'Automated Classification',
      description: 'Uses machine learning algorithms to identify and categorize different types of waste in real-time.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      )
    },
    {
      title: 'Robotic Arm System',
      description: 'Multi-degree-of-freedom robotic arm with precision gripper for accurate waste placement.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      )
    },
    {
      title: 'Three-Bin Sorting',
      description: 'Separates waste into organic, inorganic, and hazardous categories for proper disposal.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      )
    },
    {
      title: 'Environmental Education',
      description: 'Designed as a learning tool to promote awareness about waste management and sustainability.',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      )
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About ELIO</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ELIO is an innovative robotics project designed to address environmental challenges 
            through intelligent waste sorting and classification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Problem</h3>
            <p className="text-gray-600 leading-relaxed">
              Improper waste sorting is a major environmental challenge. Many people struggle to 
              correctly categorize waste, leading to contamination of recyclables and improper 
              disposal of hazardous materials. This reduces recycling efficiency and harms the environment.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-white p-8 rounded-2xl shadow-md slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
            <p className="text-gray-600 leading-relaxed">
              ELIO automates the waste sorting process using computer vision and robotics. 
              By accurately identifying and separating waste types, it ensures proper disposal 
              and serves as an educational tool for environmental awareness.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
