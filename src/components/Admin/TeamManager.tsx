import { useState } from 'react';
import { useAbout, type TeamMember } from '../../hooks/useAbout';
import { Pencil, Trash, Plus, Loader2, AlertCircle } from 'lucide-react';

export function TeamManager() {
  const { content, loading, error } = useAbout();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<TeamMember>>({});

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle className="w-6 h-6" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Team verwalten</h2>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-5 h-5" />
          Neues Mitglied
        </button>
      </div>

      <div className="grid gap-6">
        {content?.team.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-6">
              <img 
                src={member.image_url} 
                alt={member.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-serif mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.position}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Pencil className="w-5 h-5 text-primary" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}