const Contac = () => {
  return (
    <div class="contact-container">
      <div class="image-section">
        <img
          src="https://i.pinimg.com/736x/0c/ef/a7/0cefa748286ea0d3e39dc3accee572f4.jpg"
          alt="mandos"
        />
      </div>
      <div class="form-section">
        <h2>Contáctanos</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Nombres y apellidos"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
          />
          <input type="tel" placeholder="Número telefónico" required />
          <textarea name="message" placeholder="Mensaje" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};
