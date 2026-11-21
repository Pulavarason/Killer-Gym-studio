"use client";
import { useCallback, useEffect, useState } from "react";
import Loader from "./Loader";
import Nav from "./Nav";
import CinematicHero from "./CinematicHero";
import About from "./sections/About";
import Programs from "./sections/Programs";
import Gallery from "./sections/Gallery";
import WhyUs from "./sections/WhyUs";
import Environment from "./sections/Environment";
import Membership from "./sections/Membership";
import Testimonials from "./sections/Testimonials";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";
import { getGsap } from "@/lib/gsap";

export default function Experience() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Loader done={ready} onDone={onDone} />
      <Nav ready={ready} />
      <main>
        <CinematicHero ready={ready} />
        <About />
        <Programs />
        <Gallery />
        <WhyUs />
        <Environment />
        <Membership />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
