import { Building2, Users, Award, Briefcase, Mail, Settings } from 'lucide-react';

type AdminSection = 'hotels' | 'team' | 'awards' | 'jobs' | 'contacts';

interface AdminNavProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
}

const navItems = [
  { id: 'hotels' as const, label: 'Hotels', icon: Building2 },
  { id: 'team' as const, label: 'Team', icon: Users },
  { id: 'awards' as const, label: 'Auszeichnungen', icon: Award },
  { id: 'jobs' as const, label: 'Jobs', icon: Briefcase },
  { id: 'contacts' as const, label: 'Kontakte', icon: Mail }
];

export function AdminNav({ activeSection, onSectionChange }: AdminNavProps) {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg mx-2
                  ${activeSection === item.id 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'}
                `}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}