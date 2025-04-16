import { useState } from 'react';
import { useContacts, type Contact } from '../../hooks/useContacts';
import { Loader2, AlertCircle, Mail, Calendar } from 'lucide-react';

export function ContactsManager() {
  const { contacts, loading, error } = useContacts();

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
        <h2 className="text-2xl font-serif">Kontaktanfragen</h2>
      </div>

      <div className="grid gap-6">
        {contacts.map(contact => (
          <div key={contact.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-xl font-serif">{contact.name}</h3>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </a>
                </div>
                <p className="font-medium text-gray-700 mb-2">{contact.subject}</p>
                <p className="text-gray-600">{contact.message}</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(contact.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}