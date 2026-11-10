import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { disableAnalytics, enableAnalytics, trackPageView } from "@/lib/analytics";

const CONSENT_KEY = "portfolio-analytics-consent";

function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export default function AnalyticsConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState(readConsent);
  const [showChoices, setShowChoices] = useState(consent === null);

  useEffect(() => {
    const openChoices = () => setShowChoices(true);
    window.addEventListener("portfolio:analytics-settings", openChoices);
    return () => window.removeEventListener("portfolio:analytics-settings", openChoices);
  }, []);

  useEffect(() => {
    if (consent === "accepted") enableAnalytics();
    else if (consent === "rejected") disableAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent === "accepted") trackPageView(`${location.pathname}${location.search}`);
  }, [consent, location.pathname, location.search]);

  const saveChoice = (choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Use this choice for the current page view if browser storage is unavailable.
    }
    if (choice === "accepted") enableAnalytics();
    else disableAnalytics();
    setConsent(choice);
    setShowChoices(false);
  };

  return showChoices ? (
    <aside
      aria-label="Analytics privacy choices"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-xl border border-line bg-[#080a12]/95 p-4 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:p-5"
    >
      <p className="type-control text-silver">Your privacy choices</p>
      <p className="mt-2 text-sm leading-relaxed text-steel">
        Allow Google Analytics to collect site-usage measurements? Analytics stays off unless you opt in.
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={() => saveChoice("rejected")} className="border border-line px-3 py-2 type-control text-silver transition-colors hover:border-silver/40">
          No thanks
        </button>
        <button type="button" onClick={() => saveChoice("accepted")} className="bg-cobalt px-3 py-2 type-control text-white transition-colors hover:bg-[#1F49E0]">
          Allow analytics
        </button>
      </div>
    </aside>
  ) : null;
}
