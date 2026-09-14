import { AnimatePresence, motion } from "framer-motion";
import { useLaunchCeremony } from "@/hooks/useLaunchCeremony";
import { LaunchScreen } from "@/components/sections/LaunchScreen";
import { CountdownScreen } from "@/components/sections/CountdownScreen";
import { CelebrationScreen } from "@/components/sections/CelebrationScreen";
import { ComingSoonScreen } from "@/components/sections/ComingSoonScreen";

// When `onEnter` is provided (public "/" entry) the ceremony ends PERMANENTLY on
// the congratulations reveal with a single ENTER LOKAGER CTA — no auto-navigation,
// no timers. Without it (e.g. "/launch" rehearsal) the ceremony proceeds to the
// Coming Soon screen, whose ENTER LOKAGER also navigates to /home.
export const Ceremony = ({ onEnter }) => {
  const terminal = typeof onEnter === "function";
  const ceremony = useLaunchCeremony({ autoAdvanceCelebration: !terminal });

  const screens = {
    idle: (c) => <LaunchScreen onLaunch={c.start} />,
    countdown: (c) => <CountdownScreen remaining={c.remaining} progress={c.progress} />,
    celebration: () => <CelebrationScreen showEnter={terminal} onEnter={onEnter} />,
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
