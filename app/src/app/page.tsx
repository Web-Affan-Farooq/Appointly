import {
  Banner,
  Working,
  Features,
  Testimonials,
  CTA,
} from "@/components/pages";

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
