const AccessoryCard = ({ item, openModal }) => {
  const [isPurchased, setIsPurchased] = React.useState(false);

  const handleBuyClick = () => {
    setIsPurchased(true);
  };

  return (
    <div
      className="tournament-card p-4 bg-gray-800 rounded-lg cursor-pointer"
      onClick={() => openModal(item)}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-2 text-white">{item.name}</h3>
      <p className="text-gray-400 mb-2">{item.description}</p>
      <p className="text-xl text-indigo-400 mb-4">{item.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleBuyClick();
        }}
        className={`w-full py-2 rounded text-white ${
          isPurchased ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        disabled={isPurchased}
      >
        {isPurchased ? "Comprado" : "Comprar"}
      </button>
    </div>
  );
};

const AccessoriesList = () => {
  const [accessories, setAccessories] = React.useState([]);
  const [filteredAccessories, setFilteredAccessories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [priceRange, setPriceRange] = React.useState("Todos");
  const [modalContent, setModalContent] = React.useState(null);

  React.useEffect(() => {
    fetch("data.accesories.json")
      .then((response) => response.json())
      .then((data) => {
        setAccessories(data);
        setFilteredAccessories(data);
      })
      .catch((error) => console.error("Error loading accessories:", error));
  }, []);

  const categories = {
    Todos: () => true,
    Teclados: (item) => item.name.toLowerCase().includes("teclado"),
    Ratones: (item) => item.name.toLowerCase().includes("mouse"),
    Auriculares: (item) => item.name.toLowerCase().includes("auricular"),
    Monitores: (item) => item.name.toLowerCase().includes("monitor"),
    "PC Gamer": (item) => item.name.toLowerCase().includes("pc"),
  };

  const priceRanges = {
    Todos: () => true,
    "Menos de $50": (item) =>
      parseFloat(item.price.replace(/[^0-9.]/g, "")) < 50,
    "$50 - $100": (item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return price >= 50 && price < 100;
    },
    "Más de $100": (item) =>
      parseFloat(item.price.replace(/[^0-9.]/g, "")) >= 100,
  };

  React.useEffect(() => {
    const filtered = accessories.filter(
      (item) =>
        categories[selectedCategory](item) && priceRanges[priceRange](item)
    );
    setFilteredAccessories(filtered);
  }, [selectedCategory, priceRange, accessories]);

  const openModal = (item) => {
    setModalContent(item);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        ACCESORIOS GAMING
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAccessories.map((item) => (
          <AccessoryCard key={item.id} item={item} openModal={openModal} />
        ))}
      </div>

      {modalContent && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2 text-white">
              {modalContent.name}
            </h2>
            <p className="mb-2 text-gray-400">{modalContent.description}</p>
            <p className="text-xl font-semibold text-indigo-400">
              {modalContent.price}
            </p>
            <img
              src={modalContent.imageUrl}
              alt={modalContent.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
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
