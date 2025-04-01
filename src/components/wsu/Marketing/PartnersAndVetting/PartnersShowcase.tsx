"use client"

import { motion } from "framer-motion"
import { PartnerCard } from "./PartnerCard"
import { PARTNERS } from "./data"

// Partners showcase component using Green Apple styling
export function PartnersShowcase({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PARTNERS.map((partner, index) => (
        <motion.div
          key={partner.name || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <PartnerCard partner={partner} index={index} />
        </motion.div>
      ))}
    </div>
  );
} 