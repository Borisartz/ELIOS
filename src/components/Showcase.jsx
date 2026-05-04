const Showcase = () => {
  const specifications = [
    { label: 'Dimensions', value: '45cm x 35cm x 50cm' },
    { label: 'Weight', value: '3.5 kg' },
    { label: 'Power Supply', value: '7.4V Li-ion Battery' },
    { label: 'Processing Unit', value: 'Arduino Uno + ESP32-CAM' },
    { label: 'Actuators', value: '4x Servo Motors, 2x Stepper Motors' },
    { label: 'Sensors', value: 'Camera, Ultrasonic, IR Sensors' },
    { label: 'Sorting Categories', value: 'Organic, Inorganic, Hazardous' },
    { label: 'Classification Accuracy', value: '~92%' },
  ];

  const workflow = [
    { step: '01', title: 'Detection', description: 'Camera captures image of waste item' },
    { step: '02', title: 'Classification', description: 'AI model identifies waste type' },
    { step: '03', title: 'Pickup', description: 'Robotic arm gripper picks up item' },
    { step: '04', title: 'Sorting', description: 'Arm moves item to appropriate bin' },
  ];

  return (
    <section id="showcase" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Showcase</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technical specifications and system workflow of the ELIO robot
          </p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-md slide-up">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Specifications</h3>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-600 font-medium">{spec.label}</span>
                  <span className="text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Diagram Placeholder */}
          <div className="bg-gradient-to-br from-primary/5 to-green-100/30 p-8 rounded-2xl shadow-md slide-up flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <p className="text-gray-600 font-medium">System Architecture Diagram</p>
              <p className="text-gray-500 text-sm mt-2">See datasheet for detailed schematic</p>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="slide-up">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">How It Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <div 
                key={index}
                className="relative bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
