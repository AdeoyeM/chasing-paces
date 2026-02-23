
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
    <header className="border-b border-white/10 bg-gradient-to-r from-red-600/10 to-pink-500/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-red-600 to-pink-500 rounded-xl">
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl">Chasing Paces</h1>
              <p className="text-neutral-400 text-sm mt-1">Train smarter, run faster</p>
            </div>
          </div>
        </div>
      </header>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold">Welcome to the Chasing Paces App!</h1>
    </main>
  </div>
  );
}
