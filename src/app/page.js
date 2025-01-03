import { RiTwitterXLine } from "react-icons/ri";
import InteractiveForm from '../components/interactiveForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      <div className="relative">
        <div className="absolute top-0 w-full border-b border-gray-800/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <RiTwitterXLine className="w-6 h-6 text-gray-300" />
              <span className="text-gray-300 text-xl font-medium">ify</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-10" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/60 rounded-full p-4">
                <RiTwitterXLine className="w-8 h-8 text-gray-300" />
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              Idea to tweet in seconds
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl">
              Transform your thoughts into engaging tweets with our AI-powered writing assistant
            </p>

            {/* Subtle separator */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>

          {/* Form section */}
          <InteractiveForm />
          
          {/* Footer */}
          <footer className="mt-24 text-center text-sm text-gray-500">
           Powered by Sachin Parihar
          </footer>
        </div>
      </div>
    </main>
  );
}