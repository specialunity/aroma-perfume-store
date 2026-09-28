import { motion } from "framer-motion";
import { Sparkles, Heart, ShieldCheck, Gem } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function About() {
  const values = [
    { icon: Sparkles, title: "Character", text: "Every fragrance is selected to have its own personality and story." },
    { icon: Heart, title: "Personal", text: "We believe the best scent is the one that feels like you." },
    { icon: ShieldCheck, title: "Quality", text: "Our collection is presented with a focus on consistency and detail." },
    { icon: Gem, title: "Luxury", text: "A refined experience without making fragrance feel complicated." },
  ];

  return (
    <div>
      <section className="border-b border-white/10">
        <div className="container-aroma grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-[#d4af37]">About AROMA</p>
            <h1 className="mt-5 text-5xl font-light leading-tight sm:text-6xl">
              Fragrance is
              <span className="block gold-gradient-text">personal.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-8 text-gray-500">
              AROMA is a college-level concept perfume store built around the
              idea of making fragrance discovery simple, elegant and personal.
              Our collection brings together fresh, floral, woody, spicy and
              oriental-inspired scents.
            </p>
            <Link to="/shop" className="mt-8 inline-block">
              <Button showArrow>Explore Collection</Button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1200&q=85"
              alt="AROMA perfume"
              className="aspect-square w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#0d0d0d]">
        <div className="container-aroma py-20">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4af37]">Our philosophy</p>
            <h2 className="mt-4 text-3xl font-light sm:text-4xl">A scent should become a memory.</h2>
            <p className="mt-6 text-sm leading-8 text-gray-500">
              Whether it is the first spray before a special evening, a fresh
              morning routine or a familiar scent that reminds you of someone,
              fragrance has the ability to become part of a moment.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-white/10 bg-[#111] p-7">
                <Icon size={22} strokeWidth={1.4} className="text-[#d4af37]" />
                <h3 className="mt-6 text-lg font-light">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;