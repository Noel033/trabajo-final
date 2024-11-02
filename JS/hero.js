const Hero = () => {
  const [isJoined, setIsJoined] = React.useState(false);

  return (
    <div className="hero-section flex items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">TORNEOS DE ÉLITE</h1>
        <p className="text-xl mb-8">
          Compite contra los mejores jugadores y gana premios increíbles
        </p>
        <button
          onClick={() => setIsJoined(true)}
          className={`${
            isJoined ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-8 py-3 rounded-lg font-medium`}
          disabled={isJoined}
        >
          {isJoined ? "Unido" : "Únete ahora"}
        </button>
      </div>
    </div>
  );
};
