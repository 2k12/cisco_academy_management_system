function HomePage() {
  return (
    <div className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/hero-background.jpg")' }}>
        <div className="bg-black bg-opacity-60 p-8 rounded-lg text-center max-w-xl">
          <h2 className="text-4xl font-extrabold text-white mb-4">Bienvenidos a la Plataforma de Gestión de Cursos Cisco</h2>
          <p className="text-gray-300 mb-6">
            Accede a cursos certificados y herramientas de aprendizaje de la Academia Cisco, diseñada especialmente para estudiantes de la Facultad de Ingeniería en Ciencias Aplicadas de la UTN.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition mr-4">Iniciar Sesión</button>
          <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition">Más Información</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Certificaciones Internacionales</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accede a certificaciones reconocidas a nivel mundial para mejorar tus habilidades en redes y tecnología de la información.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Gestión de Cursos</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Visualiza y administra tus cursos, completa módulos y mantén un seguimiento de tu progreso académico.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Soporte Académico</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recibe soporte personalizado y acceso a materiales de estudio adicionales, garantizando una experiencia de aprendizaje completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Galería</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((img, idx) => (
              <div key={idx} className="overflow-hidden rounded-lg shadow-md">
                <img src={`/gallery-${img}.jpg`} alt={`Gallery ${img}`} className="w-full h-full object-cover hover:scale-105 transition transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para mejorar tus habilidades?</h2>
          <p className="mb-6">
            Únete a nuestra comunidad académica y accede a cursos exclusivos diseñados para maximizar tu conocimiento en redes y TI.
          </p>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-200 transition">Inscribirse Ahora</button>
        </div>
      </section>

      
    </div>
  );
}

export default HomePage;
