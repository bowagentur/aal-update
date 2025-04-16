export function Testimonials() {
  const testimonials = [
    {
      content: "Der Aufenthalt in Ihrem Hotel war einfach fantastisch! Das Personal war sehr freundlich und hilfsbereit, das Zimmer war sauber und komfortabel, und das Frühstück war ausgezeichnet.",
      author: {
        name: "Jane Doe",
        location: "Berlin, Germany",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      }
    },
    {
      content: "Ich war sehr zufrieden mit meinem Aufenthalt. Das Hotel ist sehr gut gelegen, die Zimmer sind modern und komfortabel, und das Personal ist sehr freundlich und hilfsbereit.",
      author: {
        name: "John Smith",
        location: "München, Germany",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    },
    {
      content: "Ich kann dieses Hotel nur wärmstens empfehlen! Der Service war ausgezeichnet, das Zimmer war wunderschön und sauber, und die Lage des Hotels ist perfekt.",
      author: {
        name: "Sarah Jones",
        location: "Hamburg, Germany",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
      }
    }
  ];

  return (
    <section className="py-24 bg-gray-100">
      <div className="custom-container">
        <h2 className="text-3xl font-serif mb-12 text-center">Was unsere Gäste sagen</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <img src={testimonial.author.avatar} alt={testimonial.author.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="text-lg font-medium">{testimonial.author.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.author.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}