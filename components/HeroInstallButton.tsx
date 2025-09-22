import { useEffect, useState } from "react";
import { Download, Smartphone, Monitor } from "lucide-react";

export default function HeroInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    
    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", () => {});
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleIOSInstall = () => {
    // For iOS, show instructions
    alert('To install this app on your iOS device:\n\n1. Tap the Share button in Safari\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm');
  };

  // Don't show if already installed
  if (isInstalled) return null;

  // Show iOS instructions if on iOS and no deferred prompt
  if (isIOS && !deferredPrompt) {
    return (
      <button 
        onClick={handleIOSInstall}
        className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl transition-all duration-300 hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center gap-2 border border-purple-400/20"
      >
        <Smartphone className="w-5 h-5" />
        Install App
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      </button>
    );
  }

  // Show install button for Android/Chrome
  if (deferredPrompt) {
    return (
      <button 
        onClick={handleInstall}
        className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl transition-all duration-300 hover:shadow-green-500/25 hover:scale-105 flex items-center justify-center gap-2 border border-green-400/20 animate-pulse"
      >
        <Monitor className="w-5 h-5" />
        Install App
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      </button>
    );
  }

  return null;
}

// Type for TypeScript
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}
