const TournamentModal = ({ tournament, isOpen, onClose }) => {
  const [isRegistered, setIsRegistered] = React.useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRegisterClick = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="p-4">
          <div className="relative mb-4">
            <img
              src={tournament.imageUrl}
              alt={tournament.game}
              className="w-full h-40 object-cover rounded-lg"
            />
            <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gray-900/80 text-yellow-400 text-sm">
              {tournament.prize}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-3 text-white">
            Torneo de {tournament.game}
          </h2>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-gray-400 text-xs">Fecha del Torneo</h3>
                <p className="text-white text-sm">{tournament.date}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-xs">Cupos Disponibles</h3>
                <p className="text-white text-sm">
                  {tournament.players} jugadores
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-400 text-xs mb-1">
                Información del Torneo
              </h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Formato: Eliminación directa</li>
                <li>• Check-in: 30 minutos antes</li>
                <li>• Plataforma: PC</li>
                <li>• Estado: {tournament.status}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-400 text-xs mb-1">Premios</h3>
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-white font-semibold text-sm">
                  {tournament.prize}
                </p>
                <p className="text-gray-400 text-xs">Para el equipo ganador</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRegisterClick}
            className={`w-full mt-4 ${
              isRegistered
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white py-2 rounded-lg transition-colors text-sm`}
          >
            {isRegistered ? "Inscrito" : "Inscribirse al Torneo"}
          </button>
        </div>
      </div>
    </div>
  );
};
