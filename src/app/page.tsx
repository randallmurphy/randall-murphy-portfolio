import { Toaster } from 'sonner';
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Projects,
  ScrollToTop,
} from '@/components';

export default function Home() {
  return (
    <div className="relative z-0">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(41, 41, 41, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#d4d4d8',
            borderRadius: '12px',
            fontSize: '15px',
          },
        }}
        richColors
      />

      <div>
        <Navbar />
        <Hero />
      </div>

      <div className="bg-about bg-cover bg-center bg-no-repeat">
        <About />
      </div>

      <div className="bg-tech bg-cover bg-center bg-no-repeat pb-10">
        <Tech />
      </div>

      <Projects />

      <div
        className="bg-experience bg-cover bg-center bg-no-repeat
          rounded-tl-[150px] rounded-br-[150px]">
        <div
          className="bg-experienceLight bg-cover bg-center
          bg-no-repeat rounded-tl-[150px] rounded-br-[130px]">
          <Experience />
        </div>
      </div>

      <div className="relative z-0">
        <Contact />
      </div>

      <ScrollToTop />
    </div>
  );
}