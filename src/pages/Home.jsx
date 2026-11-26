import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import FeaturedProperties from "../components/home/FeaturedProperties";
import BrowseByArea from "../components/home/BrowseByArea";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties />
      <BrowseByArea />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </>
  );
}