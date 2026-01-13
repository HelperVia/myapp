export default function LoopErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            Something Went Wrong
          </h1>

          <p className="text-slate-600 text-center mb-8 text-lg">
            We're sorry, an unexpected error occurred while loading the page.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-sm font-semibold text-blue-900 mb-3">
              What Can You Do?
            </h2>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Return to the homepage and try again</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Refresh the page to resolve the issue</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Contact us if the problem persists</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
              Go to Homepage
            </button>
            <button className="px-6 py-3 bg-white text-slate-700 border-2 border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200">
              Refresh Page
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Need help? Don't hesitate to contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
