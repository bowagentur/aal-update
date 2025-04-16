import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Login } from '../components/Admin/Login';
import { AdminNav } from '../components/Admin/AdminNav';
import { HotelManager } from '../components/Admin/HotelManager';
import { TeamManager } from '../components/Admin/TeamManager';
import { AwardsManager } from '../components/Admin/AwardsManager';
import { JobsManager } from '../components/Admin/JobsManager';
import { ContactsManager } from '../components/Admin/ContactsManager';

type AdminSection = 'hotels' | 'team' | 'awards' | 'jobs' | 'contacts';

export function Admin() {
  const [activeSection, setActiveSection] = useState<AdminSection>('hotels');
  const { profile, loading } = useAuth();

  // Redirect non-admin users
  if (!loading && (!profile || profile.role !== 'admin')) {
    return <Login />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'hotels' && <HotelManager />}
        {activeSection === 'team' && <TeamManager />}
        {activeSection === 'awards' && <AwardsManager />}
        {activeSection === 'jobs' && <JobsManager />}
        {activeSection === 'contacts' && <ContactsManager />}
      </div>
    </div>
  );
}