import React, { useState } from 'react';
import PresentationCard from './components/PresentationCard';
import SwipeDeck from './components/SwipeDeck';
import './index.css'

// Lazy load the viewer to avoid loading PDF.js on initial load
const PresentationViewer = React.lazy(() => import('./components/PresentationViewer'));

export default function App() {
  const [selectedPresentation, setSelectedPresentation] = useState(null)

  const presentations = [
    { title: "Dashboard Design", company: "Xeno", fileName: "Dashboard Design_Xeno.pdf", thumbnail: "/thumbnails/Dashboard Design_Xeno.png" },
    { title: "AI Loan Writing Research", company: "Hyperverge AI", fileName: "AI Loan Writing Research_Hyperverge AI.pdf", thumbnail: "/thumbnails/AI Loan Writing Research_Hyperverge AI.png" },
    { title: "Market Research", company: "ABinBev", fileName: "Market Research_ABinBev.pdf", thumbnail: "/thumbnails/Market Research_ABinBev.png" },
    { title: "Feature Implementation", company: "Nubra", fileName: "Feature Implementation_Nubra.pdf", thumbnail: "/thumbnails/Feature Implementation_Nubra.png" },
    { title: "Smart Accessibility Certification System", company: "Aptiv", fileName: "Smart Accessibility Certification System_Aptiv.pdf", thumbnail: "/thumbnails/Smart Accessibility Certification System_Aptiv.png" },
    { title: "App Catalog Case Study", company: "Zluri", fileName: "App Catalog Case Study_Zluri.pdf", thumbnail: "/thumbnails/App Catalog Case Study_Zluri.png" },
  ]

  return (
    <div
      className="min-h-screen md:min-h-screen h-screen md:h-auto overflow-hidden md:overflow-visible relative flex flex-col justify-center md:block"
    >

      <div
        className="flex-grow px-4 sm:px-0 flex flex-col justify-center md:block"
        style={{
          paddingLeft: 'max(env(safe-area-inset-left), 16px)',
          paddingRight: 'max(env(safe-area-inset-right), 16px)',
        }}
      >
        <div className="w-full max-w-[15cm] px-6 sm:px-6 mx-auto h-full flex flex-col justify-center gap-6 md:block md:gap-0 md:py-12 md:space-y-12">
          <div className="space-y-4 text-center flex-shrink-0">
            <h1 className="text-3xl font-bold">Akhil's Deckroom</h1>
            <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-sm md:text-base text-justify md:text-center">
              A central place for my presentations—designed to explain why decisions were made, not just what was presented. Built around clarity, logic, and real-world context
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-1 gap-12">
            {presentations.map((pres, index) => (
              <PresentationCard
                key={index}
                title={pres.title}
                company={pres.company}
                fileName={pres.fileName}
                thumbnail={pres.thumbnail}
                onClick={() => setSelectedPresentation(pres)}
              />
            ))}
          </div>

          {/* Mobile Swipe Deck - Fills remaining space */}
          <div className="block md:hidden relative -mx-6 sm:mx-0 mt-8">
            <SwipeDeck
              presentations={presentations}
              onSelect={setSelectedPresentation}
            />
          </div>
        </div>
      </div>

      {/* Viewer Modal - loaded lazily */}
      {selectedPresentation && (
        <React.Suspense fallback={
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 text-white">
            <div className="animate-pulse">Loading Viewer...</div>
          </div>
        }>
          <PresentationViewer
            presentation={selectedPresentation}
            onClose={() => setSelectedPresentation(null)}
          />
        </React.Suspense>
      )}
    </div>
  )
}


