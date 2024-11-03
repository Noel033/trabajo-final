const RechargeOptions = () => {
  const [games, setGames] = React.useState([]);
  const [modalContent, setModalContent] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [priceRange, setPriceRange] = React.useState("Todos");
  const [filteredGames, setFilteredGames] = React.useState([]);

  React.useEffect(() => {
    fetch("recharge_options.json")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      })
      .catch((error) =>
        console.error("Error loading recharge options:", error)
      );
  }, []);

  const categories = {
    Todos: () => true,
    Móvil: (game) =>
      game.name === "MLBB" ||
      game.name === "Free Fire" ||
      game.name === "PUBG Mobile",
    PC: (game) =>
      game.name === "League of Legends" ||
      game.name === "Dota 2" ||
      game.name === "CSGO",
  };

  const priceRanges = {
    Todos: () => true,
    "Menos de $10": (game) =>
      game.options.some(
        (option) => parseFloat(option.price.replace(/[^0-9.]/g, "")) < 10
      ),
    "$10 - $50": (game) =>
      game.options.some((option) => {
        const price = parseFloat(option.price.replace(/[^0-9.]/g, ""));
        return price >= 10 && price <= 50;
      }),
    "Más de $50": (game) =>
      game.options.some(
        (option) => parseFloat(option.price.replace(/[^0-9.]/g, "")) > 50
      ),
  };

  React.useEffect(() => {
    const filtered = games.filter(
      (game) =>
        categories[selectedCategory](game) && priceRanges[priceRange](game)
    );
    setFilteredGames(filtered);
  }, [selectedCategory, priceRange, games]);

  const openModal = (option, game) => {
    setModalContent({
      ...option,
      gameTitle: game.title,
      gameDescription: game.description,
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        RECARGAS DE JUEGOS
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
          <label className="mr-2 text-white">Precio:</label>
          <select
            className="bg-gray-700 text-white rounded px-4 py-2"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            {Object.keys(priceRanges).map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="tournament-card p-6 bg-gray-800 rounded-lg"
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-white">{game.title}</h3>
            <p className="text-gray-400 mb-4">{game.description}</p>
            <div className="space-y-4">
              {game.options.map((option, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white">{option.amount}</span>
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
                    onClick={() => openModal(option, game)}
                  >
                    {option.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {modalContent && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-blue-500 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">
              {modalContent.gameTitle}
            </h2>
            <p className="mb-2 text-white">{modalContent.gameDescription}</p>
            <p className="text-xl font-semibold text-white">{`El precio es: ${modalContent.price}`}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
