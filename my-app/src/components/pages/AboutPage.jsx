import designerImg from "../../assets/images/designer.jpg";
import engineerImg from "../../assets/images/engineer.jpg";
import specialistImg from "../../assets/images/specialist.jpg";

const AboutPage = () => {
  return (
    <div className="bg-gray-100">

      {/* Hero */}
      <section className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold animate-pulse">About Google Pixel</h1>
        <p className="mt-4 max-w-xl mx-auto">
          Smartphones powered by AI, innovation, and performance.
        </p>
      </section>

      {/* Mission + Innovation */}
      <section className="p-12 grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded shadow transform hover:scale-105 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 text-gray-600">
            Deliver powerful smartphones with Google's AI to improve daily life.
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow transform hover:scale-105 hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-bold">Our Innovation</h2>
          <p className="mt-4 text-gray-600">
            Features like Magic Eraser, Night Sight, and AI tools.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="p-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Our Journey</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="p-4 border-l-4 border-black">
            <h3 className="font-bold">2016</h3>
            <p>First Pixel phone launched</p>
          </div>
          <div className="p-4 border-l-4 border-black">
            <h3 className="font-bold">2019</h3>
            <p>AI camera revolution</p>
          </div>
          <div className="p-4 border-l-4 border-black">
            <h3 className="font-bold">2023</h3>
            <p>Pixel Fold introduced</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 py-16 text-white text-center">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-4xl font-bold">10M+</h2>
            <p>Users</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">20+</h2>
            <p>Countries</p>
          </div>
          <div>
            <h2 className="text-4xl font-bold">8+</h2>
            <p>Models</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="p-12 text-center">
        <h2 className="text-3xl font-bold">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white shadow p-6 rounded transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <img src={designerImg} className="mx-auto w-40 h-40 rounded-full object-cover" alt="Designer" />
            <h3 className="mt-4 font-bold">Designer</h3>
          </div>
          <div className="bg-white shadow p-6 rounded transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <img src={engineerImg} className="mx-auto w-40 h-40 rounded-full object-cover" alt="Engineer" />
            <h3 className="mt-4 font-bold">Engineer</h3>
          </div>
          <div className="bg-white shadow p-6 rounded transform hover:scale-105 hover:shadow-2xl transition duration-300">
            <img src={specialistImg} className="mx-auto w-40 h-40 rounded-full object-cover" alt="AI Specialist" />
            <h3 className="mt-4 font-bold">AI Specialist</h3>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 p-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <p>"Best Android phone ever!"</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>"Camera is insane 🔥"</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p>"Super smooth experience"</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="p-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          <details className="p-4 shadow rounded">
            <summary className="font-medium cursor-pointer">What is Pixel?</summary>
            <p className="mt-2 text-gray-600">Google's premium smartphone.</p>
          </details>
          <details className="p-4 shadow rounded">
            <summary className="font-medium cursor-pointer">Is Pixel good?</summary>
            <p className="mt-2 text-gray-600">Yes, especially for camera & AI.</p>
          </details>
          <details className="p-4 shadow rounded">
            <summary className="font-medium cursor-pointer">Battery timing?</summary>
            <p className="mt-2 text-gray-600">All-day battery performance.</p>
          </details>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
