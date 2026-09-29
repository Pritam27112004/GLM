import React from 'react';
import { Award, ShieldCheck, Download, Printer, QrCode, CheckCircle2, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

export const CertificatePreviewModal = ({ isOpen, onClose, certificate }) => {
  const { addToast } = useNotification();

  if (!isOpen || !certificate) return null;

  const {
    certificateId = 'NCCT-CERT-2026-00124',
    traineeName = 'Rahul Sharma',
    courseTitle = 'Digital Literacy for Cooperative Personnel',
    institution = 'National Council for Cooperative Training (NCCT)',
    regionalInstitute = 'RICM Patna (Regional Institute of Cooperative Management)',
    issueDate = '29 Aug 2026',
    completionScore = 88,
    signerName = 'Dr. Alok Verma, Director General, NCCT',
    skillsAccredited = ['PACS Cloud ERP', 'Cyber Hygiene', 'Spreadsheet Auditing', 'Digital Member KYC']
  } = certificate;

  const handleDownload = () => {
    addToast({
      title: 'Certificate Downloaded',
      message: `Digital Certificate ${certificateId} saved with embedded cryptographic signature.`,
      type: 'success'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-[#071A2E]/75 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="inline-block w-full max-w-4xl bg-white text-left align-middle shadow-2xl rounded-2xl border border-slate-200 overflow-hidden relative z-10 animate-fade-in">
          {/* Top Actions Bar */}
          <div className="px-6 py-3.5 bg-[#0B2A4A] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold tracking-wide uppercase text-slate-200">
                NCCT Central Verification Ledger • Verified Authentic
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={handleDownload}
                className="btn-accent text-xs px-3 py-1 flex items-center gap-1.5 font-semibold"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Certificate Paper Frame */}
          <div className="p-8 bg-[#FBFDFE] border-8 border-double border-[#0B2A4A]/20 m-4 rounded-xl relative overflow-hidden text-center shadow-inner">
            {/* Watermark Emblem Accent */}
            <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
              <Award className="w-96 h-96 text-[#0B2A4A]" />
            </div>

            {/* Header / Insignia */}
            <div className="space-y-1 mb-6 relative">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0B2A4A] text-white flex items-center justify-center shadow-md border-2 border-amber-400 mb-2">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-[11px] uppercase tracking-widest font-extrabold text-[#0B2A4A]">
                Ministry of Cooperation • Government of India
              </p>
              <h2 className="text-2xl font-black text-[#0B2A4A] tracking-wider uppercase">
                National Council for Cooperative Training
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                {regionalInstitute}
              </p>
            </div>

            {/* Certificate Title Banner */}
            <div className="my-6 relative">
              <div className="inline-block px-8 py-1.5 rounded-md bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#0B2A4A] font-extrabold text-sm uppercase tracking-widest shadow-sm">
                Certificate of Competency & Skill Qualification
              </div>
            </div>

            {/* Main Conferred Text */}
            <div className="space-y-4 max-w-2xl mx-auto my-6 text-slate-700 relative">
              <p className="text-xs italic">This is to certify that</p>

              <h1 className="text-3xl font-black text-[#0B2A4A] font-serif border-b-2 border-slate-300 pb-2 inline-block px-12">
                {traineeName}
              </h1>

              <p className="text-xs leading-relaxed">
                has successfully fulfilled all institutional requirements, practical modules, laboratory assessments, and examination for the specialized programme:
              </p>

              <h3 className="text-xl font-bold text-[#1976D2] font-serif">
                {courseTitle}
              </h3>

              <p className="text-xs text-slate-600">
                Conducted with Distinction with an overall evaluation score of <strong className="text-[#2E9D59] font-bold">{completionScore}%</strong>.
              </p>
            </div>

            {/* Accredited Skills Badges */}
            {skillsAccredited.length > 0 && (
              <div className="max-w-xl mx-auto my-4 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">Endorsed Competencies</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {skillsAccredited.map((skill, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF5FB] text-[#0B2A4A] border border-[#1976D2]/30">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Signature & Verification Footer */}
            <div className="grid grid-cols-3 items-end gap-4 mt-10 pt-6 border-t border-slate-200 text-left text-xs">
              {/* QR Verification */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-300 shadow-sm flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-[#0B2A4A]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono block text-slate-400">CERTIFICATE ID</span>
                  <span className="font-mono font-bold text-[#0B2A4A] text-xs block">{certificateId}</span>
                  <span className="text-[10px] text-[#2E9D59] font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Digitally Verified
                  </span>
                </div>
              </div>

              {/* Center Seal */}
              <div className="text-center">
                <div className="inline-block p-2 rounded-full border-2 border-dashed border-amber-500/60 bg-amber-50/50">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-700 font-extrabold text-[10px] uppercase tracking-tighter">
                    Official Seal
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Issued: {issueDate}</div>
              </div>

              {/* Signer Block */}
              <div className="text-right">
                <div className="font-serif italic text-base text-[#0B2A4A] border-b border-slate-300 pb-1 inline-block">
                  Alok Verma
                </div>
                <div className="font-bold text-[#0B2A4A] text-xs mt-1">{signerName}</div>
                <div className="text-[10px] text-slate-400">New Delhi, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreviewModal;
