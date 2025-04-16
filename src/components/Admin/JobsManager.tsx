import { useState } from 'react';
import { useJobs, type Job } from '../../hooks/useJobs';
import { Pencil, Trash, Plus, Loader2, AlertCircle } from 'lucide-react';

export function JobsManager() {
  const { jobs, loading, error } = useJobs();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Job>>({});

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
        <h2 className="text-2xl font-serif">Stellenanzeigen verwalten</h2>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Plus className="w-5 h-5" />
          Neue Stelle
        </button>
      </div>

      <div className="grid gap-6">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-serif">{job.title}</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <p className="text-gray-600">{job.description}</p>
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