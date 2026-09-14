import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLaunchCeremony } from "@/hooks/useLaunchCeremony";
import { AUTO_ENTER_MS } from "@/lib/site";
import { LaunchScreen } from "@/components/sections/LaunchScreen";
import { CountdownScreen } from "@/components/sections/CountdownScreen";
import { CelebrationScreen } from "@/components/sections/CelebrationScreen";
import { ComingSoonScreen } from "@/components/sections/ComingSoonScreen";

// autoEnter + onEnter: used by the public "/" demo entry so the reveal
// transitions to the homepage. Without them (e.g. "/launch" rehearsal) the
// ceremony ends on the Coming Soon screen.
export const Ceremony = ({ autoEnter = false, onEnter }) => {
  const ceremony = useLaunchCeremony();

  useEffect(() => {
    if (!autoEnter || ceremony.phase !== "celebration") return undefined;
    const id = setTimeout(() => onEnter?.(), AUTO_ENTER_MS);
    return () => clearTimeout(id);
  }, [autoEnter, ceremony.phase, onEnter]);

  const screens = {
    idle: (c) => <LaunchScreen onLaunch={c.start} />,
    countdown: (c) => <CountdownScreen remaining={c.remaining} progress={c.progress} />,
    celebration: () => <CelebrationScreen showEnter={autoEnter} onEnter={onEnter} />,
    complete: () => <ComingSoonScreen />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={ceremony.phase}
        data-testid={`ceremony-phase-${ceremony.phase}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {screens[ceremony.phase](ceremony)}
      </motion.div>
    </AnimatePresence>
  );
};
