import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import PresentationCard from './PresentationCard';
import { IoRefresh } from 'react-icons/io5';

export default function SwipeDeck({ presentations, onSelect }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const controls = useAnimation();

    // Rotate the card based on x position: -200px -> -30deg, 200px -> 30deg
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    // Fade opacity as it flies out
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = async (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        // Threshold for swipe (adjust if needed)
        if (Math.abs(offset) > 100 || Math.abs(velocity) > 500) {
            // Swipe direction
            const direction = offset > 0 ? 1 : -1;

            // Animate off screen
            await controls.start({
                x: direction * window.innerWidth * 1.5,
                opacity: 0,
                transition: { duration: 0.2 }
            });

            // Advance to next card
            setCurrentIndex(prev => prev + 1);

            // Reset position for next card (instantly, since currentIndex changed so it's a new render)
            x.set(0);
        } else {
            // Spring back to center
            controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        }
    };

    const resetDeck = () => {
        setCurrentIndex(0);
        x.set(0);
    };

    // No more cards
    if (currentIndex >= presentations.length) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center p-8">
                <h3 className="text-xl font-medium text-white/50">You've seen all presentations</h3>
                <button
                    onClick={resetDeck}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
                >
                    <IoRefresh size={20} />
                    <span>Start Over</span>
                </button>
            </div>
        );
    }

    const currentCard = presentations[currentIndex];
    const nextCard = presentations[currentIndex + 1];

    return (
        <div className="relative w-full max-w-md mx-auto h-[60vh] flex items-center justify-center perspective-1000">
            {/* Background Card (Next) */}
            {nextCard && (
                <div
                    className="absolute top-0 w-full h-full transform scale-95 translate-y-4 opacity-50 pointer-events-none"
                    style={{ zIndex: 0 }}
                >
                    <PresentationCard
                        {...nextCard}
                        onClick={() => { }} // Non-interactive
                    />
                </div>
            )}

            {/* Foreground Card (Current) */}
            <motion.div
                key={currentIndex} // Re-mounts on index change for clean state
                style={{ x, rotate, opacity, zIndex: 10 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Constraints handled manually via controls
                onDragEnd={handleDragEnd}
                animate={controls}
                className="absolute top-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
                whileTap={{ scale: 1.02 }}
            >
                <PresentationCard
                    {...currentCard}
                    onClick={() => onSelect(currentCard)}
                // Pass a prop to disable the default card hover effects if they clash with drag, 
                // but for now keeping them is fine as drag overrides hover often.
                // We might want to disable the "tilt" effect of the card itself if it interferes.
                />

                {/* Swipe hints */}
                <div className="absolute top-1/2 -left-4 -translate-y-1/2 bg-black/50 backdrop-blur rounded-full p-2 opacity-0 md:opacity-0 active:opacity-0 transition-opacity">
                    {/* Could add arrows here if needed */}
                </div>
            </motion.div>
        </div>
    );
}
