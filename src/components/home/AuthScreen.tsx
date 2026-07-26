import Features from "@/components/home/AuthScreen/Features";
import HeroSection from "@/components/home/AuthScreen/HeroSection";
import Pricing from "@/components/home/AuthScreen/Pricing";
import Team from "@/components/home/AuthScreen/Team";
import Testimonials from "@/components/home/AuthScreen/Testimonials";
import MasonryGrid from "@/components/media/MasonryGrid";
import TodayHighlight from "@/components/media/TodayHighlight";

export default function AuthScreen() {
  return (
    <>
      <HeroSection />
      <TodayHighlight />
      <MasonryGrid />
      <Features />
      <Testimonials />
      <Pricing />
      <Team />
    </>
  );
}
