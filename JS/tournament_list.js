const TournamentCard = ({ tournament }) => {
  const [isRegistered, setIsRegistered] = React.useState(false);

  return (
    <div className="tournament-card p-6 bg-gray-800 rounded-lg shadow-lg">
      <img
        src={tournament.imageUrl}
        alt={tournament.game}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2 text-white">{tournament.game}</h3>
      <div className="space-y-2">
        <p className="text-indigo-400">Premio: {tournament.prize}</p>
        <p className="text-gray-300">Fecha: {tournament.date}</p>
        <p className="text-gray-300">Jugadores: {tournament.players}</p>
        <p className="text-green-400">{tournament.status}</p>
      </div>
      <button
        onClick={() => setIsRegistered(true)}
        className={`mt-4 w-full ${
          isRegistered ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
        } py-2 rounded text-white transition-colors`}
        disabled={isRegistered}
      >
        {isRegistered ? "Inscrito" : "Inscribirse"}
      </button>
    </div>
  );
};

const TournamentList = () => {
  const [tournaments, setTournaments] = React.useState([]);
  const [filteredTournaments, setFilteredTournaments] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [prizeRange, setPrizeRange] = React.useState("Todos");

  React.useEffect(() => {
    fetch("tournaments.json")
      .then((response) => response.json())
      .then((data) => {
        setTournaments(data);
        setFilteredTournaments(data);
      })
      .catch((error) => console.error("Error loading tournaments:", error));
  }, []);

  const categories = {
    Todos: () => true,
    Acción: (tournament) => ["CSGO", "Valorant"].includes(tournament.game),
    MOBA: (tournament) =>
      ["League of Legends", "Dota 2", "Mlbb"].includes(tournament.game),
    Casual: (tournament) => ["ROBLOX"].includes(tournament.game),
  };

  const prizeRanges = {
    Todos: () => true,
    "Menos de $1000": (tournament) =>
      parseFloat(tournament.prize.replace(/[^0-9.]/g, "")) < 1000,
    "$1000 - $5000": (tournament) => {
      const prize = parseFloat(tournament.prize.replace(/[^0-9.]/g, ""));
      return prize >= 1000 && prize <= 5000;
    },
    "Más de $5000": (tournament) =>
      parseFloat(tournament.prize.replace(/[^0-9.]/g, "")) > 5000,
  };

  React.useEffect(() => {
    const filtered = tournaments.filter(
      (tournament) =>
        categories[selectedCategory](tournament) &&
        prizeRanges[prizeRange](tournament)
    );
    setFilteredTournaments(filtered);
  }, [selectedCategory, prizeRange, tournaments]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        TORNEOS ACTIVOS
      </h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center">
          <label className="mr-2 text-white">Categoría:</label>
          <select
            className="bg-gray-700 text-white rounded px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2 text-white">Premio:</label>
          <select
            className="bg-gray-700 text-white rounded px-4 py-2"
            value={prizeRange}
            onChange={(e) => setPrizeRange(e.target.value)}
          >
            {Object.keys(prizeRanges).map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTournaments.map((tournament) => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
};
