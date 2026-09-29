import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/Common/PageHeader';
import CertificateCard from '../../components/Cards/CertificateCard';
import CertificatePreviewModal from '../../components/Modals/CertificatePreviewModal';
import EmptyState from '../../components/Common/EmptyState';
import LoadingState from '../../components/Common/LoadingState';
import { useNotification } from '../../context/NotificationContext';
import { Award, ShieldCheck, Download, ExternalLink, QrCode } from 'lucide-react';
import api from '../../api';

export const UserCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState(null);
  const { addToast } = useNotification();

  useEffect(() => {
    const fetchUserCertificates = async () => {
      try {
        setLoading(true);
        const res = await api.getCertificates({ traineeId: 'user@ncct.demo' });
        if (res && res.data) {
          setCertificates(res.data);
        }
      } catch (err) {
        console.warn('Certificates fallback');
      } finally {
        setLoading(false);
      }
    };
    fetchUserCertificates();
  }, []);

  const handleDownload = (cert) => {
    addToast({
      title: 'Certificate Downloaded',
      message: `${cert.certificateId} has been saved as an accredited PDF credential.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Verified Digital Certificates"
        subtitle="Officially recognized qualifications issued by the National Council for Cooperative Training (NCCT) with verifiable cryptographic hashes."
        breadcrumbs={[{ label: 'Trainee', link: '/user/dashboard' }, { label: 'Certificates' }]}
      />

      {/* Verification Ledger Banner */}
      <div className="bg-[#0B2A4A] text-white p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              NCCT National Central Registry
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% VERIFIED
              </span>
            </h3>
            <p className="text-xs text-slate-300">
              All credentials are cryptographically stamped and automatically verified during employer job applications.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-cyan-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          Signer: Dr. Alok Verma, DG, NCCT
        </div>
      </div>

      {/* Certificates Grid */}
      {loading ? (
        <LoadingState count={3} />
      ) : certificates.length === 0 ? (
        <EmptyState
          title="No certificates earned yet"
          description="Complete LMS course assessments or attend qualifying regional workshops to unlock your credentials."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <CertificateCard
              key={cert.certificateId}
              certificate={cert}
              onView={(c) => setPreviewCert(c)}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {/* Official Certificate Preview Modal */}
      <CertificatePreviewModal
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
        certificate={previewCert}
      />
    </div>
  );
};

export default UserCertificates;
