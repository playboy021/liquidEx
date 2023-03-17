export default function Footer() {

  return (
    <footer className="lightBlueGlassLessBlur pt-1">
      <div className="mx-auto ml-8 mr-8 mt-8 rounded-t-lg bg-white bg-opacity-60">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <p className="mb-6 px-2 text-white text-sm text-primary-2 font-bold hover:underline lightBlueGlassMinimumBlur rounded-md">
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
