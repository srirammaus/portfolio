import { useEffect, useState } from "react";
import WorldCanvas from "@/components/world/WorldCanvas";
import SceneFallback from "@/components/world/SceneFallback";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";

import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ScrollToTop from './components/ScrollToTop';
// Add page imports here
import Home from '@/pages/Home';
import Journal from '@/pages/Journal';
import JournalPost from '@/pages/JournalPost';

const PortfolioRoutes = () => {
  const [reduced, setReduced] = useState(false);
  const [sceneOn, setSceneOn] = useState(true);


  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = (event) => setReduced(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {sceneOn ? <WorldCanvas reducedMotion={reduced} /> : <SceneFallback />}
      </div>
      <div className="relative"><Routes>
      {/* Add your page Route elements here */}
      <Route path="/" element={<Home {...{reduced, setReduced, sceneOn, setSceneOn}} />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/:slug" element={<JournalPost />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes></div></>
  );
};

function App() {

  return (
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <PortfolioRoutes />
        </Router>
        <Toaster />
        <WhatsAppFloat />
      </QueryClientProvider>
  )
}

export default App
