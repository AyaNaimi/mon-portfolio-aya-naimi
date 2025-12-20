"use client"

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

/* =======================
   TYPES
======================= */
interface TimelineItem {
  year: string
  title: string
  company: string
  description: string
}

interface TimelineCardProps {
  item: TimelineItem
  isLeft: boolean
  mobile?: boolean
}

/* =======================
   TIMELINE CARD
======================= */
const TimelineCard = ({ item, isLeft, mobile = false }: TimelineCardProps) => {
  const reduce = useReducedMotion()

  return (
    <Card
      className={[
        "w-full bg-card/90 backdrop-blur-md border border-[#BF1A1A]/30",
        "hover:shadow-xl hover:shadow-[#BF1A1A]/20 transition-all duration-300",
        "hover:border-[#BF1A1A]/50 relative overflow-hidden",
        mobile ? "max-w-sm sm:max-w-md mx-auto" : "",
      ].join(" ")}
    >
      <div className="p-4 sm:p-6 space-y-2">
        <motion.div
          initial={reduce ? {} : { scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <Badge className="bg-[#BF1A1A] text-white hover:bg-[#CC561E] text-xs sm:text-sm">
            {item.year}
          </Badge>
        </motion.div>

        <motion.h4
          className="text-lg sm:text-xl font-bold"
          initial={
            reduce
              ? {}
              : { x: mobile ? 0 : isLeft ? -20 : 20, opacity: 0 }
          }
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          {item.title}
        </motion.h4>

        <motion.p
          className="text-[#BF1A1A] font-medium text-sm sm:text-base"
          initial={
            reduce
              ? {}
              : { x: mobile ? 0 : isLeft ? -20 : 20, opacity: 0 }
          }
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          {item.company}
        </motion.p>

        <motion.p
          className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
          initial={reduce ? {} : { y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.35 }}
        >
          {item.description}
        </motion.p>
      </div>
    </Card>
  )
}

/* =======================
   ADVANCED TIMELINE
======================= */
export function AdvancedTimeline({ timeline }: { timeline: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  /* 📱 DETECTION MOBILE */
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)")
    setIsMobile(media.matches)

    const listener = () => setIsMobile(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [])

  /* 🔥 SCROLL SYNC RESPONSIVE */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile
      ? ["start 85%", "end 15%"] // 📱 MOBILE (clé)
      : ["start center", "end center"], // 🖥 DESKTOP
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative w-full">

      {/* LIGNE CENTRALE */}
      <div
        className={[
          "absolute left-1/2 top-0 bottom-0 w-0.5 sm:w-1",
          "-translate-x-1/2 bg-muted/40 overflow-hidden rounded-full z-0",
        ].join(" ")}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-[#BF1A1A] via-[#CC561E] to-[#BF1A1A]"
          style={{
            height: lineHeight,
            transformOrigin: "top",
            willChange: "height",
          }}
        />
      </div>

      <div className="space-y-20 sm:space-y-28 relative z-10">
        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={reduce ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {/* POINT CENTRAL */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 z-20">
                <span className="block w-5 h-5 rounded-full bg-[#BF1A1A] shadow-[0_0_25px_#CC561E] timeline-dot-pulse" />
              </div>

              {/* LAYOUT */}
              <div className="flex flex-col lg:flex-row items-center">

                {/* GAUCHE */}
                <div className="hidden lg:flex lg:w-1/2 justify-end pr-10">
                  {isLeft && (
                    <div className="max-w-md">
                      <TimelineCard item={item} isLeft />
                    </div>
                  )}
                </div>

                {/* DROITE */}
                <div className="hidden lg:flex lg:w-1/2 justify-start pl-10">
                  {!isLeft && (
                    <div className="max-w-md">
                      <TimelineCard item={item} isLeft={false} />
                    </div>
                  )}
                </div>

                {/* MOBILE */}
                <div className="lg:hidden px-4">
                  <TimelineCard item={item} isLeft={isLeft} mobile />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ANIMATION POINT */}
      {/* 
        Moved timeline-dot-pulse @keyframes to global CSS. 
        If needed, ensure that keyframes and .timeline-dot-pulse are present in a global stylesheet.
      */}
    </div>
  )
}
