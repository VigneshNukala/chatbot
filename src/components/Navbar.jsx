import { Mail, Lock, User, Building2, Globe, MessageSquare, ArrowRight, Github, Chrome, AlertCircle } from 'lucide-react';

const Navbar = ({currentStep}) => {
    return (
        <div className="w-full bg-white shadow-sm py-4 top-0 z-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">ChatBot AI</span>
            </div>
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === currentStep ? 'bg-blue-600 text-white' :
                    step < currentStep ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> 
    )
}

export default Navbar;