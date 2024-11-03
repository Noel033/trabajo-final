const TournamentCard = ({ tournament }) => {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getPrizeClass = (prize) => {
    const amount = parseFloat(prize.replace(/[^0-9.]/g, ""));
    if (amount >= 5000) return "text-yellow-400";
    if (amount >= 1000) return "text-indigo-400";
    return "text-gray-400";
  };

  return (
    <>
      <div
        className="tournament-card p-6 bg-gray-800 rounded-lg shadow-lg transform transition duration-200 hover:scale-105 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative">
          <img
            src={tournament.imageUrl}
            alt={tournament.game}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <span
            className={`absolute top-2 right-2 px-3 py-1 rounded-full ${getPrizeClass(
              tournament.prize
            )} bg-gray-900/80`}
          >
            {tournament.prize}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{tournament.game}</h3>
        <div className="space-y-2">
          <p className="text-gray-300">Fecha: {tournament.date}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              Jugadores: {tournament.players}
            </span>
            <span className="text-green-400">{tournament.status}</span>
          </div>
          {tournament.description && (
            <p className="text-gray-400 text-sm">{tournament.description}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsRegistered(!isRegistered);
          }}
          className={`mt-4 w-full ${
            isRegistered
              ? "bg-green-600 hover:bg-green-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          } py-2 rounded text-white transition-colors`}
        >
          {isRegistered ? "Cancelar inscripción" : "Inscribirse"}
        </button>
      </div>

      <TournamentModal
        tournament={tournament}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const TournamentList = () => {
  const [tournaments, setTournaments] = React.useState([]);
  const [filters, setFilters] = React.useState({
    category: "all",
    prizeRange: "all",
  });

  React.useEffect(() => {
    fetch("tournaments.json")
      .then((response) => response.json())
      .then((data) => setTournaments(data))
      .catch((error) => console.error("Error loading tournaments:", error));
  }, []);

  const gameCategories = {
    all: "Todas las categorías",
    MOBA: ["League of Legends", "Dota 2", "Mlbb"],
    FPS: ["CSGO", "Valorant"],
    Casual: ["ROBLOX"],
  };

  const getPrizeAmount = (prizeStr) => {
    return parseFloat(prizeStr.replace(/[^0-9.]/g, ""));
  };

  const filterTournaments = () => {
    return tournaments.filter((tournament) => {
      const prizeAmount = getPrizeAmount(tournament.prize);

      const matchesCategory =
        filters.category === "all" ||
        (gameCategories[filters.category] &&
          gameCategories[filters.category].includes(tournament.game));

      let matchesPrize = true;
      if (filters.prizeRange === "under1k") matchesPrize = prizeAmount < 1000;
      if (filters.prizeRange === "1k-5k")
        matchesPrize = prizeAmount >= 1000 && prizeAmount <= 5000;
      if (filters.prizeRange === "over5k") matchesPrize = prizeAmount > 5000;

      return matchesCategory && matchesPrize;
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        TORNEOS ACTIVOS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col">
          <label className="mb-2 text-white">Categoría:</label>
          <select
            className="bg-gray-700 text-white rounded px-4 py-2"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            {Object.keys(gameCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Todas las categorías" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-white">Premio:</label>
          <select
            className="bg-gray-700 text-white rounded px-4 py-2"
            value={filters.prizeRange}
            onChange={(e) => handleFilterChange("prizeRange", e.target.value)}
          >
            <option value="all">Todos los premios</option>
            <option value="under1k">Menos de $1,000</option>
            <option value="1k-5k">$1,000 - $5,000</option>
            <option value="over5k">Más de $5,000</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterTournaments().map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};
