"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
}

// Composant de carte Timeline séparé pour la réutilisation
interface TimelineCardProps {
  item: TimelineItem
  isLeft: boolean
  mobile?: boolean
}

const TimelineCard = ({ item, isLeft, mobile = false }: TimelineCardProps) => (
  <Card className="w-full bg-card/90 backdrop-blur-md border border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:border-purple-400/50 timeline-card-shimmer relative overflow-hidden">
    <div className="p-4 sm:p-6 space-y-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Badge className="bg-purple-600 text-white hover:bg-purple-500 transition-colors duration-300 text-xs sm:text-sm">
          {item.year}
        </Badge>
      </motion.div>

      <motion.h4
        className="text-lg sm:text-xl font-bold"
        initial={{ x: mobile ? 0 : (isLeft ? -20 : 20), opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {item.title}
      </motion.h4>
      
      <motion.p
        className="text-violet-400 font-medium text-sm sm:text-base"
        initial={{ x: mobile ? 0 : (isLeft ? -20 : 20), opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        {item.company}
      </motion.p>

      <motion.p
        className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {item.description}
      </motion.p>
    </div>
  </Card>
)

export function AdvancedTimeline({ timeline }: { timeline: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null)

  // Progression du scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  })

  // Ligne qui se remplit
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="relative">
      {/* Ligne centrale - Responsive */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 sm:w-1 -translate-x-1/2 bg-muted/40 overflow-hidden rounded-full">
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ height: lineHeight, transformOrigin: "top" }}
          className="w-full bg-gradient-to-b from-purple-600 via-violet-500 to-purple-400"
        />
      </div>

      <div className="space-y-16 sm:space-y-24">
        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative"
            >
              {/* Point central - Responsive */}
              <span className="absolute left-1/2 -translate-x-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-purple-600 shadow-[0_0_25px_rgba(147,51,234,0.6)] z-10 transition-all duration-300 hover:scale-125 hover:shadow-[0_0_35px_rgba(147,51,234,0.8)] hover:w-5 hover:h-5 sm:hover:w-6 sm:hover:h-6 md:hover:w-7 md:hover:h-7 timeline-dot-pulse" />

              {/* Layout responsive pour mobile et desktop */}
              <div className="flex flex-col lg:flex-row lg:items-center">
                {/* Espace pour la ligne centrale sur desktop */}
                <div className="hidden lg:block lg:w-1/2 lg:flex lg:justify-end lg:pr-8">
                  {isLeft && (
                    <div className="w-full max-w-sm xl:max-w-md">
                      <TimelineCard item={item} isLeft={true} />
                    </div>
                  )}
                </div>
                
                {/* Espace pour la ligne centrale sur desktop */}
                <div className="hidden lg:block lg:w-1/2 lg:flex lg:justify-start lg:pl-8">
                  {!isLeft && (
                    <div className="w-full max-w-sm xl:max-w-md">
                      <TimelineCard item={item} isLeft={false} />
                    </div>
                  )}
                </div>

                {/* Layout mobile - toutes les cartes centrées */}
                <div className="lg:hidden flex justify-center px-4 sm:px-8">
                  <div className="w-full max-w-sm sm:max-w-md">
                    <TimelineCard item={item} isLeft={true} mobile={true} />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
