import { loadGoogleAnalytics } from "@/utils/loadGoogleAnalytics";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookiesAccepted", "true");
    loadGoogleAnalytics();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="
      fixed top-0 left-0 w-full z-50
      bg-gray-900 text-white
      p-3 sm:p-4 md:p-5 lg:p-6 shadow-2xl
      flex flex-col sm:flex-row
      items-center justify-between
      gap-3 sm:gap-4 md:gap-6
    ">
      <p className="
        text-xs sm:text-sm md:text-base lg:text-lg
        text-center sm:text-left
        leading-relaxed
        max-w-full sm:max-w-2xl lg:max-w-4xl
      ">
        Este site utiliza cookies para melhorar sua experiência e coletar
        métricas de uso (Google Analytics).
      </p>

      <button
        onClick={handleAccept}
        className="
          bg-white text-black
          px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3
          text-xs sm:text-sm md:text-base
          rounded-lg
          font-semibold
          hover:bg-gray-200
          transition-all duration-200
          whitespace-nowrap
          min-w-[100px] sm:min-w-[120px]
        "
      >
        Aceitar
      </button>
    </div>
  );
}