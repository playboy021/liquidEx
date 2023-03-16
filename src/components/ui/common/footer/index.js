export default function Footer() {

  return (
    <footer className="bg-gray-900 pt-1">
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <p className="mb-6 text-white text-sm text-primary-2 font-bold hover:underline">
              <a href="https://github.com/tenzija" target="_blank">
                © {new Date().getFullYear()} Tenzija
              </a>  
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
