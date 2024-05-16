import Image from "next/image";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar";
import About from "@/components/About";
import Home from "@/components/Home";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const inter = Inter({ subsets: ["latin"] });

export default function index() {
  return (
    <div>
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}
