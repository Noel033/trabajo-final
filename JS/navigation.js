const Navigation = () => {
  return (
    <div>
     <header className="p-4">
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-4">
      <a href="index.html"> 
        <img
          src="https://cdn.oddspedia.bg/media/es/1x1/sport-dota-2.jpg"
          alt="Logo"
          className="navbar-logo h-12 md:h-16 w-auto"
        />
      </a>
      <h1 className="text-xl md:text-2xl font-bold">
        La Guarida de Antibush
      </h1>
    </div>
    <div className="relative w-full md:w-auto">
      <input
        type="search"
        placeholder="¿Qué estás buscando?"
        className="w-full md:w-64 px-4 py-2 rounded-lg bg-gray-700 text-white"
      />
    </div>
  </div>
</header>
      <nav className="bg-gray-800">
        <ul className="flex flex-wrap justify-center md:justify-around space-x-2 md:space-x-4 p-4">
          <li className="my-1">
            <a
              href="index.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              INICIO
            </a>
          </li>
          <li className="my-1">
            <a
              href="torneos.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              TORNEOS
            </a>
          </li>
          <li className="my-1">
            <a
              href="recargas.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              RECARGAS
            </a>
          </li>
          <li className="my-1">
            <a
              href="accesorios.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              ACCESORIOS
            </a>
          </li>
          <li className="my-1">
            <a
              href="acerca.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              ACERCA DE
            </a>
          </li>
          <li className="my-1">
            <a
              href="contac.html"
              className="text-sm md:text-base text-white hover:underline"
            >
              CONTACTO
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
