const Datasheet = () => {
  const datasheets = [
    {
      title: 'Arduino Uno R3',
      description: 'Microcontroller board based on ATmega328P',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'ESP32-CAM Module',
      description: 'WiFi + Bluetooth camera module for image processing',
      type: 'PDF',
      size: '1.8 MB'
    },
    {
      title: 'Servo Motor SG90',
      description: 'Micro servo motor specifications and pinout',
      type: 'PDF',
      size: '0.9 MB'
    },
    {
      title: 'Motor Driver L298N',
      description: 'Dual H-bridge motor driver module datasheet',
      type: 'PDF',
      size: '1.2 MB'
    },
    {
      title: 'System Schematic',
      description: 'Complete electrical schematic diagram',
      type: 'PDF',
      size: '3.5 MB'
    },
    {
      title: 'Assembly Guide',
      description: 'Step-by-step mechanical assembly instructions',
      type: 'PDF',
      size: '5.1 MB'
    }
  ];

  return (
    <section id="datasheet" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Datasheet Preview</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technical documentation and component specifications for the ELIO robot
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasheets.map((doc, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 slide-up group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-medium">
                  {doc.type}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {doc.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{doc.size}</span>
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  View
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download All Button */}
        <div className="mt-12 text-center slide-up">
          <button className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download All Documentation
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-md slide-up">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Technical Specifications Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Electrical</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Operating Voltage: 5V / 7.4V
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Current Draw: 2A (max)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Battery Capacity: 2600mAh
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Charging Time: ~3 hours
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Mechanical</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Arm Reach: 25cm
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Payload Capacity: 200g
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Degrees of Freedom: 4
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Base Diameter: 35cm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Datasheet;
