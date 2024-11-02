const AboutContent = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Acerca de Nosotros
        </h1>

        <div className="mb-12">
          <iframe
            className="w-full h-48 md:h-96 rounded-lg mb-8"
            src="https://www.youtube.com/embed/kq2uO3floog"
            title="Video presentación"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="space-y-6 text-base md:text-lg mb-12">
          <p>
            La Guarida de Antibush es una plataforma líder en la organización de
            torneos de esports y venta de productos gaming en Latinoamérica.
          </p>
          <p>
            Fundada en 2024, nos dedicamos a crear experiencias competitivas
            únicas para jugadores de todos los niveles, proporcionando un
            ambiente seguro y profesional para el desarrollo del gaming
            competitivo.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Nuestras Sedes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Sede Principal - Lima</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.666337431595!2d-77.03196088561798!3d-12.089690791445826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8199ea33af1%3A0xb79a86e89e5bf589!2sSan%20Isidro%2C%20Lima%2C%20Per%C3%BA!5e0!3m2!1ses!2s!4v1635789245684!5m2!1ses!2s"
                className="w-full h-64 rounded-lg"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">
                Sede Gaming - Miraflores
              </h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.9201939778834!2d-77.03808708561753!3d-12.119690791466899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5c6e2431f%3A0x7e3294e34794f8e7!2sMiraflores%2C%20Lima%2C%20Per%C3%BA!5e0!3m2!1ses!2s!4v1635789312684!5m2!1ses!2s"
                className="w-full h-64 rounded-lg"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Misión</h3>
            <p className="text-gray-300">
              Fomentar el crecimiento del gaming competitivo en la región.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Visión</h3>
            <p className="text-gray-300">
              Ser la principal plataforma de esports en Latinoamérica.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Valores</h3>
            <p className="text-gray-300">
              Integridad, Pasión, Innovación y Comunidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
