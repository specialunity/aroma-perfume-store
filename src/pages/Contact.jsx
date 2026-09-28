import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle, ShoppingBag } from "lucide-react";
import Button from "../components/Button";

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container-aroma py-14 sm:py-20">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-widest text-[#d4af37]">Get in touch</p>
        <h1 className="mt-4 text-4xl font-light sm:text-6xl">Contact AROMA</h1>
        <p className="mt-6 text-sm leading-7 text-gray-500">
          Have a question about a fragrance, your order or anything else?
          Send us a message and we'll get back to you.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="border border-white/10 bg-[#111] p-6 sm:p-8">
          {sent ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <CheckCircle size={45} className="text-[#d4af37]" />
              <h2 className="mt-5 text-2xl font-light">Message received</h2>
              <p className="mt-3 text-sm text-gray-600">Thank you for contacting AROMA.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-6 text-xs uppercase tracking-widest text-[#d4af37]">Send another message</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-light">Send a Message</h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <input required placeholder="Your name" className="h-12 border border-white/10 bg-[#0b0b0b] px-4 text-sm outline-none focus:border-[#d4af37]" />
                <input required type="email" placeholder="Email address" className="h-12 border border-white/10 bg-[#0b0b0b] px-4 text-sm outline-none focus:border-[#d4af37]" />
                <input placeholder="Phone number" className="h-12 border border-white/10 bg-[#0b0b0b] px-4 text-sm outline-none focus:border-[#d4af37] sm:col-span-2" />
                <textarea required rows="7" placeholder="How can we help?" className="resize-none border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm outline-none focus:border-[#d4af37] sm:col-span-2" />
              </div>

              <Button type="submit" className="mt-7" showArrow>Send Message</Button>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <div className="border border-white/10 bg-[#111] p-7">
            <MapPin size={20} className="text-[#d4af37]" />
            <h3 className="mt-5 text-lg font-light">Visit</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">Delhi NCR<br />India</p>
          </div>

          <div className="border border-white/10 bg-[#111] p-7">
            <Phone size={20} className="text-[#d4af37]" />
            <h3 className="mt-5 text-lg font-light">Call</h3>
            <a href="tel:+910000000000" className="mt-2 block text-sm text-gray-600 hover:text-white">+91 00000 00000</a>
          </div>

          <div className="border border-white/10 bg-[#111] p-7">
            <Mail size={20} className="text-[#d4af37]" />
            <h3 className="mt-5 text-lg font-light">Email</h3>
            <a href="mailto:hello@aromaperfume.com" className="mt-2 block text-sm text-gray-600 hover:text-white">hello@aromaperfume.com</a>
          </div>

          <div className="border border-[#d4af37]/20 bg-[#15120a] p-7">
            <ShoppingBag size={20} className="text-[#d4af37]" />
            <h3 className="mt-5 text-lg font-light">Order Support</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Need help choosing a fragrance or placing an order? Our store
              support section is here to help.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Contact;