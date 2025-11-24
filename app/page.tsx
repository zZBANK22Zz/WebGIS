import CampusMap from './components/CampusMap';

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                Prince of Songkla University, Phuket Campus
              </p>
            </div>
            <div className="hidden md:block text-right ml-4 flex-shrink-0">
              <p className="text-sm text-gray-600">Virtual Campus Tour</p>
              <p className="text-xs text-gray-500">แผนที่ออนไลน์สำรวจมหาวิทยาลัย</p>
            </div>
          </div>
        </div>
      </header>

      {/* Map Component */}
      <CampusMap />
    </div>
  );
}
