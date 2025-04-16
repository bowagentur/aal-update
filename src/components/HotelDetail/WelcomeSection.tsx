interface WelcomeSectionProps {
  welcomeContent: Array<{
    title: string;
    text: string;
  }>;
  welcomeTitle?: string;
  welcomeIntro?: string;
  highlights?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export function WelcomeSection({ welcomeContent, welcomeTitle, welcomeIntro, highlights }: WelcomeSectionProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              {welcomeTitle}
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              {welcomeIntro}
            </p>
          </div>

          {/* Location & Gastronomy Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            {welcomeContent.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-serif mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 