const AccessoryCard = ({ item }) => {
  const [isAdded, setIsAdded] = React.useState(false);

  return (
    <div className="tournament-card p-4 bg-gray-800 rounded-lg">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-2 text-white">{item.name}</h3>
      <p className="text-gray-400 mb-2">{item.description}</p>
      <p className="text-xl text-indigo-400 mb-4">{item.price}</p>
      <button
        onClick={() => setIsAdded(true)}
        className={`w-full ${
          isAdded ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
        } py-2 rounded text-white`}
        disabled={isAdded}
      >
        {isAdded ? "Añadido" : "Añadir al carrito"}
      </button>
    </div>
  );
};

const AccessoriesList = () => {
  const [accessories, setAccessories] = React.useState([]);
  const [filteredAccessories, setFilteredAccessories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");
  const [priceRange, setPriceRange] = React.useState("Todos");

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
    Teclados: (item) => item.category === "keyboard",
    Ratones: (item) => item.category === "mouse",
    Auriculares: (item) => item.category === "headset",
    Monitores: (item) => item.category === "monitor",
  };

  const priceRanges = {
    Todos: () => true,
    "Menos de $50": (item) =>
      parseFloat(item.price.replace(/[^0-9.]/g, "")) < 50,
    "$50 - $100": (item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return price >= 50 && price <= 100;
    },
    "Más de $100": (item) =>
      parseFloat(item.price.replace(/[^0-9.]/g, "")) > 100,
  };

  React.useEffect(() => {
    const filtered = accessories.filter(
      (item) =>
        categories[selectedCategory](item) && priceRanges[priceRange](item)
    );
    setFilteredAccessories(filtered);
  }, [selectedCategory, priceRange, accessories]);

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
          <AccessoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
