import React, { useState } from 'react';
export default function PresentationCard({ title, company, fileName, thumbnail, onClick }) {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div
            className="group relative cursor-pointer rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-md border border-black/5 hover:border-black/20 transition-all duration-500 hover:shadow-[0_0_50px_-12px] hover:shadow-purple-500/20"
            onClick={onClick}


        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <div className="relative p-4 md:p-5 flex flex-col md:items-start md:grid md:grid-cols-[2fr,3fr] gap-6 md:gap-10">
                <div className="w-full relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-zinc-800 border border-black/5 hover:border-black/20 group-hover:scale-[1.03] group-hover:-rotate-1 transition-all duration-500 ease-out perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                    <img
                        src={thumbnail || `/thumbnails/${fileName.replace('.pdf', '.png')}`}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
                <div className="flex flex-col justify-center space-y-5 h-full py-2">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide text-white group-hover:text-purple-100 transition-colors duration-300">
                        {title}
                    </h3>

                    <div className="flex items-center flex-wrap gap-3 text-sm font-medium text-white/40">
                        <span className="px-4 py-1.5 rounded-full bg-white/5 transition-colors">
                            {company}
                        </span>
                        {numPages && (
                            <span className="px-4 py-1.5 rounded-full bg-white/5 transition-colors">
                                {numPages} Slides
                            </span>
                        )}
                    </div>

                    <div className="pt-2 flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <span className="h-px w-12 bg-purple-500/50" />
                        <span className="text-purple-400 font-medium tracking-widest text-xs uppercase">
                            View Case Study
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
