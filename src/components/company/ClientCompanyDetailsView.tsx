"use client"

import { CompanyDetailsView } from './CompanyDetailsView'

export default function ClientCompanyDetailsView({ companyId }: { companyId: string }) {
  const handleClose = () => {
    // Navigate back to companies view
    const event = new CustomEvent('navigate', {
      detail: {
        view: 'companies'
      }
    });
    window.dispatchEvent(event);
  }

  return <CompanyDetailsView companyId={companyId} onClose={handleClose} />
} 