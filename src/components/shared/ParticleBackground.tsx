import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const ShootingStar = ({ delay }: { delay: number }) => {
    return (
        <motion.div
            initial={{ x: "-10%", y: "-10%", opacity: 0, scale: 0 }}
            animate={{
                x: ["0%", "120%"],
                y: ["0%", "120%"],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1.2, 0.5],
            }}
            transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatDelay: Math.random() * 20 + 15, // Rare event
                delay: delay,
                ease: "linear",
            }}
            className="absolute w-[3px] h-[3px] bg-white rounded-full z-10"
            style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 50}%`,
                boxShadow: "0 0 15px 4px rgba(255, 255, 255, 0.9)",
                willChange: "transform, opacity",
            }}
        >
            {/* Dynamic Trail */}
            <div
                className="absolute top-1/2 right-0 -translate-y-1/2 w-32 h-[1.5px] bg-gradient-to-l from-white via-primary/40 to-transparent rotate-[45deg] origin-right"
                style={{
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                }}
            />
        </motion.div>
    );
};

const Starfield = () => {
    const starLayers = useMemo(() => {
        return [
            // Far Layer (Smaller, Slower)
            Array.from({ length: 80 }).map((_, i) => ({
                id: `far-${i}`,
                size: Math.random() * 1.5 + 0.5,
                x: Math.random() * 100,
                y: Math.random() * 100,
                tx: Math.random() * 100 - 50,
                ty: Math.random() * 100 - 50,
                duration: Math.random() * 100 + 150,
            })),
            // Near Layer (Larger, Faster)
            Array.from({ length: 40 }).map((_, i) => ({
                id: `near-${i}`,
                size: Math.random() * 2.5 + 1.2,
                x: Math.random() * 100,
                y: Math.random() * 100,
                tx: Math.random() * 200 - 100,
                ty: Math.random() * 200 - 100,
                duration: Math.random() * 80 + 80,
            })),
        ];
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Background Star Layers */}
            {starLayers.flat().map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute bg-foreground/60 rounded-full"
                    style={{
                        width: star.size,
                        height: star.size,
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        willChange: "transform, opacity",
                        boxShadow: star.size > 2.2 ? `0 0 ${star.size * 3}px hsl(var(--primary) / 0.6)` : "none",
                    }}
                    animate={{
                        x: [0, star.tx],
                        y: [0, star.ty],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        x: { duration: star.duration, repeat: Infinity, ease: "linear" },
                        y: { duration: star.duration, repeat: Infinity, ease: "linear" },
                        opacity: { duration: Math.random() * 4 + 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                />
            ))}

            {/* Randomized Shooting Stars */}
            <ShootingStar delay={2} />
            <ShootingStar delay={8} />
            <ShootingStar delay={15} />

            {/* Cinematic Ambient Depth */}
            <div className="absolute top-0 -left-1/4 w-[85%] h-[85%] bg-primary/[0.05] blur-[200px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 w-[85%] h-[85%] bg-primary/[0.05] blur-[200px] rounded-full mix-blend-screen pointer-events-none" />
        </div>
    );
};

export const ParticleBackground = Starfield;
