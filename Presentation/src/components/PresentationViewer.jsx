import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import { IoArrowBack } from 'react-icons/io5';

// Ensure worker is configured (if not already by PresentationCard)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PresentationViewer({ presentation, onClose }) {
    const [numPages, setNumPages] = useState(null);
    const [scale, setScale] = useState(1.0);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex flex-col bg-zinc-950"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-zinc-900/50 backdrop-blur-md border-b border-gray-800/10 sticky top-0 z-10 transition-all duration-300">
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors px-2 py-1.5 md:px-3 rounded-lg hover:bg-white/5"
                    aria-label="Back to Gallery"
                >
                    <IoArrowBack size={20} />
                    <span className="font-medium hidden md:inline">Back to Gallery</span>
                </button>
                <h2 className="text-base md:text-lg font-semibold text-white truncate max-w-[200px] md:max-w-md mx-2 md:mx-4 flex-1 text-center">
                    {presentation.title}
                </h2>
                <div className="w-8 md:w-24 hidden md:block" /> {/* Spacer for centering on desktop, hidden/small on mobile to allow title center */}
                <div className="w-8 md:hidden" /> {/* Small spacer to balance the back button on mobile */}
            </div>

            {/* Viewer */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 flex justify-center bg-zinc-950">
                <div className="max-w-4xl w-full">
                    <Document
                        file={`/presentations/${presentation.fileName}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center gap-8 pb-20"
                        loading={
                            <div className="text-white/50 animate-pulse flex flex-col items-center mt-20">
                                Loading Presentation...
                            </div>
                        }
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <div
                                key={`page_${index + 1}`}
                                className="shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10"
                            >
                                <Page
                                    pageNumber={index + 1}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    width={Math.min(window.innerWidth * 0.9, 1000)} // Responsive width
                                    className="bg-white"
                                />
                            </div>
                        ))}
                    </Document>
                </div>
            </div>
        </motion.div>
    );
}
