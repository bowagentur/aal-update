import { useState } from 'react';
import { useAbout, type Award } from '../../hooks/useAbout';
import { Pencil, Trash, Plus, Loader2, AlertCircle } from 'lucide-react';

export function AwardsManager() {
  const { content, loading, error } = useAbout();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Award>>({});

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
        <h2 className="text-2xl font-serif">Auszeichnungen verwalten</h2>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-5 h-5" />
          Neue Auszeichnung
        </button>
      </div>

      <div className="grid gap-6">
        {content?.awards.map(award => (
          <div key={award.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                {award.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif mb-1">{award.title}</h3>
                <p className="text-gray-600">{award.description}</p>
              </div>
              <div className="text-lg font-medium text-primary">
                {award.year}
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