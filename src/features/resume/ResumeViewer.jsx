import React from 'react';
import { useStore } from '../../core/store/useStore';
import { Download, ExternalLink } from 'lucide-react';
import { experience } from '../../data/experience';
import { skills } from '../../data/skills';

export default function ResumeViewer() {
  const { isResumeMode } = useStore();

  if (!isResumeMode) return null;

  return (
    <div className="absolute inset-0 z-50 bg-[#f8fafc] text-[#0f172a] overflow-y-auto" data-lenis-prevent="true">
      <div className="max-w-4xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="flex justify-between items-end border-b border-gray-300 pb-8 mb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">Musharraf Ali</h1>
            <p className="text-xl text-gray-600">Full-Stack Developer | Blockchain Engineer | UI/UX Designer</p>
          </div>
          <div className="flex flex-col items-end gap-2 text-sm text-gray-600">
            <a href="mailto:musharafali.dev@gmail.com" className="hover:text-blue-600">musharafali.dev@gmail.com</a>
            <a href="https://github.com/musharafali-dev" className="hover:text-blue-600">github.com/musharafali-dev</a>
            <span className="text-gray-600">Gilgit, Pakistan</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-end mb-12">
          <a
            href="/CV.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download size={18} /> Download PDF Version
          </a>
        </div>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Professional Experience</h2>
          <div className="space-y-8">
            {experience.map((job, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{job.role}</h3>
                  <span className="text-sm font-medium text-gray-500">{job.year}</span>
                </div>
                <div className="text-lg text-blue-600 font-medium mb-3">{job.company} — {job.location}</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.bullets ? job.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  )) : null}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Technical Skills</h2>
          <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Blockchain</h4>
              <p className="text-gray-700">Solidity, Smart Contract Auditing, ERC-721/1155, Web3.js, Solana Ecosystem</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Frontend</h4>
              <p className="text-gray-700">React, Next.js, TypeScript, Tailwind CSS, UI/UX Design (Figma)</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Backend & Database</h4>
              <p className="text-gray-700">Node.js, Express, MongoDB, PostgreSQL</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900">Tools</h4>
              <p className="text-gray-700">Git/GitHub, Docker, Adobe Premiere Pro, Visual Paradigm</p>
            </div>
          </div>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Education</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">BS in Software Engineering</h3>
                  <span className="text-sm font-medium text-gray-500">2023 — 2027 (Expected)</span>
                </div>
                <div className="text-lg text-blue-600 font-medium mb-2">Karakoram International University (KIU)</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Relevant Coursework:</strong> Software Requirements Engineering (Project: Vintasteps Mobile App), Data Structures, Architectural Modeling.</li>
                  <li><strong>Technical Modeling:</strong> Proficient in creating complex architectural diagrams and use-case models using Visual Paradigm.</li>
                </ul>
              </div>
            </div>
          </section>
        </section>

      </div>
    </div>
  );
}
