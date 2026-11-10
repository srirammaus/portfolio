const FALLBACK_MEASUREMENT_ID = "G-SXREJV4EX4";
export const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID?.trim() || FALLBACK_MEASUREMENT_ID;
const disableFlag = `ga-disable-${measurementId}`;

let initialized = false;
let lastPage = null;

export function enableAnalytics() {
  if (typeof window === "undefined" || !measurementId) return;
  window[disableFlag] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

  if (!initialized) {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false, anonymize_ip: true });
    if (!document.getElementById("google-analytics-tag")) {
      const script = document.createElement("script");
      script.id = "google-analytics-tag";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
    initialized = true;
  }
  window.gtag("consent", "update", { analytics_storage: "granted" });
}

export function disableAnalytics() {
  if (typeof window === "undefined") return;
  window[disableFlag] = true;
  lastPage = null;
  window.gtag?.("consent", "update", { analytics_storage: "denied" });
}

export function trackPageView(path) {
  if (typeof window === "undefined" || !window.gtag || window[disableFlag] || path === lastPage) return;
  lastPage = path;
  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  });
}
