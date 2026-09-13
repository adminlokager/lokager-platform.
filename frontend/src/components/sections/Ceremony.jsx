import { AnimatePresence, motion } from "framer-motion";
import { useLaunchCeremony } from "@/hooks/useLaunchCeremony";
import { LaunchScreen } from "@/components/sections/LaunchScreen";
import { CountdownScreen } from "@/components/sections/CountdownScreen";
import { CelebrationScreen } from "@/components/sections/CelebrationScreen";
import { ComingSoonScreen } from "@/components/sections/ComingSoonScreen";

const screens = {
  idle: (c) => <LaunchScreen onLaunch={c.start} />,
  countdown: (c) => <CountdownScreen remaining={c.remaining} progress={c.progress} />,
  celebration: () => <CelebrationScreen />,
  complete: () => <ComingSoonScreen />,
};

export const Ceremony = () => {
  const ceremony = useLaunchCeremony();
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
