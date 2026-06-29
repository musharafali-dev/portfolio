import React from 'react';
import { useStore } from '../../core/store/useStore';
import { Download, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { experience } from '../../data/experience';

export default function ResumeViewer() {
  const { isResumeMode } = useStore();

  if (!isResumeMode) return null;

  return (
    <div className="absolute inset-0 z-50 bg-[#f8fafc] text-[#0f172a] overflow-y-auto" data-lenis-prevent="true">
      <div className="max-w-4xl mx-auto px-8 py-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end border-b border-gray-300 pb-8 mb-12 gap-6">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-4">Musharraf Ali</h1>
            <p className="text-xl text-gray-600 font-medium">Software Engineer | Smart Contract Developer | Full-Stack AI Developer</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> Gilgit-Baltistan, Pakistan</span>
            <a href="tel:+923418848066" className="flex items-center gap-1.5 hover:text-blue-600"><Phone size={14} /> +92 341 8848066</a>
            <a href="mailto:itsmalipk@gmail.com" className="flex items-center gap-1.5 hover:text-blue-600"><Mail size={14} /> itsmalipk@gmail.com</a>
            <a href="https://github.com/musharafali-dev" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Globe size={14} /> github.com/musharafali-dev</a>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-between items-center mb-12 bg-gray-100 p-4 rounded-xl">
          <span className="text-sm font-medium text-gray-600">Need a paper copy of this resume?</span>
          <a
            href="/CV.docx"
            download
            className="flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download size={18} /> Download CV (Word)
          </a>
        </div>

        {/* Professional Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Professional Summary</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Software Engineering student and Blockchain Developer with hands-on experience in Ethereum smart contract development, decentralized applications (DApps), full-stack web development, and database management. Skilled in Solidity, JavaScript, Python, C++, MongoDB, MySQL, and Web3 technologies. Experienced in building secure blockchain solutions, responsive web applications, and SEO-driven digital platforms.
          </p>
        </section>

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
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 border-b pb-1">Programming</h4>
              <p className="text-gray-700">Solidity, JavaScript, Python, C++</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 border-b pb-1">Web Technologies</h4>
              <p className="text-gray-700">HTML5, CSS3, React.js, Node.js, Express.js</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 border-b pb-1">Blockchain</h4>
              <p className="text-gray-700">Ethereum, Smart Contracts, Web3.js, Ethers.js, MetaMask, DApps</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 border-b pb-1">Databases & Tools</h4>
              <p className="text-gray-700">MongoDB, MySQL, Git, GitHub, VS Code, Figma, Adobe XD</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 border-b pb-1">SEO</h4>
              <p className="text-gray-700">Technical SEO, On-Page SEO, Keyword Research</p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-blue-600 pl-4">Education</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-xl font-semibold text-gray-900">BS in Software Engineering</h3>
                <span className="text-sm font-medium text-gray-500">2023 — 2027 (Expected)</span>
              </div>
              <div className="text-lg text-blue-600 font-medium mb-2">Karakoram International University (KIU) — Gilgit, Pakistan</div>
            </div>
          </div>
        </section>

        {/* Certifications & Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
          {/* Certifications */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Certifications</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li><strong>Decentralized Applications (DApps)</strong> — Coursera</li>
              <li><strong>SEO Fundamentals</strong> — Coursera</li>
              <li><strong>Adobe Premiere Pro</strong> — Coursera</li>
              <li><strong>UI/UX Design</strong> — Great Learning Academy</li>
              <li><strong>Computer Networking & Digital Security</strong> — Alison</li>
            </ul>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-xl font-bold mb-4 text-gray-900">Languages</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm">
              <li><strong>Urdu</strong> (Native)</li>
              <li><strong>Shina & Balti</strong> (Native)</li>
              <li><strong>English</strong> (Professional)</li>
              <li><strong>Persian</strong> (Professional)</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}
