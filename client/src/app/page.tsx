import CTA from "./_components/cta";
import Banner from "./_components/banner";
import Features from "./_components/features";
import Testimonials from "./_components/testimonials";
import Working from "./_components/working";

const Home = () => {
  return (
    <main>
      <article>
        <Banner />
        <Features />
        <Working />
        <Testimonials />
        <CTA />
      </article>
    </main>
  );
};
export default Home;
