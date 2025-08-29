
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col">
      <Header />
      
      {/* Team Image Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-6xl">
          <img
            src="/website-images/team.png"
            alt="E-Cell Team"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}