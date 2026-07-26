import Experience from './components/experience';
import Footer from './components/footer';
import Hero from './components/hero';
import Projects from './components/projects';
import TechStack from './components/techStack';
import './index.css';

import CommandMenu from './components/command-menu';

function App() {
  return (
    <>
      <CommandMenu />

      <main className="container space-y-8 pt-12 pb-20 md:max-w-3xl md:space-y-12 md:pt-24">
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
      </main>

      <Footer />
    </>
  );
}

export default App;
