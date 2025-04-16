import { useState } from 'react';
import { Save, Plus, Trash, MessageSquare, Bot, Settings, RefreshCw, Users, Phone, Mail, Clock } from 'lucide-react';

interface Prompt {
  id: string;
  title: string;
  content: string;
  category: 'greeting' | 'faq' | 'booking' | 'custom';
}

interface ChatSettings {
  name: string;
  avatar: string;
  defaultLanguage: string;
  maxHistoryLength: number;
  responseDelay: number;
  greetingMessage: string;
  fallbackMessage: string;
}

// Neue Interface für Support-Anfragen
interface SupportRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  lastUpdated: Date;
}

export function AIChatSettings() {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: '1',
      title: 'Begrüßung',
      content: 'Hallo! Ich bin Aalbert, Ihr KI-Assistent. Wie kann ich Ihnen helfen?',
      category: 'greeting'
    },
    {
      id: '2',
      title: 'Zimmer Verfügbarkeit',
      content: 'Ich verstehe, dass Sie nach Zimmerverfügbarkeiten suchen. Lassen Sie mich das für Sie prüfen...',
      category: 'booking'
    }
  ]);

  const [settings, setSettings] = useState<ChatSettings>({
    name: 'Aalbert',
    avatar: '/images/aalbert-avatar.png',
    defaultLanguage: 'de',
    maxHistoryLength: 10,
    responseDelay: 500,
    greetingMessage: 'Willkommen! Wie kann ich Ihnen helfen?',
    fallbackMessage: 'Entschuldigung, ich verstehe Ihre Anfrage nicht ganz. Können Sie das anders formulieren?'
  });

  // Neuer State für den aktiven Tab
  const [activeTab, setActiveTab] = useState<'prompts' | 'settings' | 'support'>('prompts');

  // Mock-Daten für Support-Anfragen
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([
    {
      id: '1',
      name: 'Max Mustermann',
      email: 'max@example.com',
      phone: '+49 123 456789',
      subject: 'Buchungsanfrage Suite',
      message: 'Ich möchte gerne eine Suite für das kommende Wochenende buchen...',
      status: 'new',
      priority: 'high',
      createdAt: new Date('2024-03-20T10:30:00'),
      lastUpdated: new Date('2024-03-20T10:30:00')
    },
    {
      id: '2',
      name: 'Anna Schmidt',
      email: 'anna@example.com',
      subject: 'Frage zum Wellness-Bereich',
      message: 'Können Sie mir sagen, ob der Spa-Bereich auch...',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-03-19T15:20:00'),
      lastUpdated: new Date('2024-03-20T09:15:00')
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif flex items-center gap-2">
          <Bot className="w-8 h-8 text-primary" />
          Aalbert KI-Chat Verwaltung
        </h2>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          <Save className="w-5 h-5" />
          Änderungen speichern
        </button>
      </div>

      {/* Erweiterte Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'prompts' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          Prompts & Antworten
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'settings' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Settings className="w-5 h-5" />
          Grundeinstellungen
        </button>
        <button
          onClick={() => setActiveTab('support')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'support' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <Users className="w-5 h-5" />
          Support-Anfragen
        </button>
      </div>

      {/* Prompts Tab */}
      {activeTab === 'prompts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Gespeicherte Prompts</h3>
            <button 
              onClick={() => {
                setPrompts([...prompts, {
                  id: Date.now().toString(),
                  title: 'Neuer Prompt',
                  content: '',
                  category: 'custom'
                }]);
              }}
              className="flex items-center gap-2 text-primary hover:text-primary-dark"
            >
              <Plus className="w-5 h-5" />
              Prompt hinzufügen
            </button>
          </div>

          <div className="grid gap-4">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={prompt.title}
                      onChange={(e) => {
                        const updated = prompts.map(p => 
                          p.id === prompt.id ? { ...p, title: e.target.value } : p
                        );
                        setPrompts(updated);
                      }}
                      className="text-lg font-medium bg-transparent border-b border-transparent hover:border-gray-300 focus:border-primary outline-none w-full"
                    />
                    <select
                      value={prompt.category}
                      onChange={(e) => {
                        const updated = prompts.map(p =>
                          p.id === prompt.id ? { ...p, category: e.target.value as any } : p
                        );
                        setPrompts(updated);
                      }}
                      className="mt-1 text-sm text-gray-500 bg-transparent border rounded-lg"
                    >
                      <option value="greeting">Begrüßung</option>
                      <option value="faq">FAQ</option>
                      <option value="booking">Buchung</option>
                      <option value="custom">Benutzerdefiniert</option>
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      setPrompts(prompts.filter(p => p.id !== prompt.id));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
                <textarea
                  value={prompt.content}
                  onChange={(e) => {
                    const updated = prompts.map(p =>
                      p.id === prompt.id ? { ...p, content: e.target.value } : p
                    );
                    setPrompts(updated);
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Geben Sie hier den Prompt-Text ein..."
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bot Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="text"
                value={settings.avatar}
                onChange={(e) => setSettings({ ...settings, avatar: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standardsprache
              </label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => setSettings({ ...settings, defaultLanguage: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              >
                <option value="de">Deutsch</option>
                <option value="en">Englisch</option>
                <option value="nl">Niederländisch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max. Chatverlauf
              </label>
              <input
                type="number"
                value={settings.maxHistoryLength}
                onChange={(e) => setSettings({ ...settings, maxHistoryLength: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antwortverzögerung (ms)
              </label>
              <input
                type="number"
                value={settings.responseDelay}
                onChange={(e) => setSettings({ ...settings, responseDelay: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Begrüßungsnachricht
            </label>
            <textarea
              value={settings.greetingMessage}
              onChange={(e) => setSettings({ ...settings, greetingMessage: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fallback-Nachricht
            </label>
            <textarea
              value={settings.fallbackMessage}
              onChange={(e) => setSettings({ ...settings, fallbackMessage: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <RefreshCw className="w-5 h-5" />
              Auf Standard zurücksetzen
            </button>
          </div>
        </div>
      )}

      {/* Neuer Support Tab */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          {/* Support Dashboard */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-blue-700 font-medium mb-1">Neue Anfragen</h4>
              <p className="text-2xl font-bold text-blue-800">
                {supportRequests.filter(req => req.status === 'new').length}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="text-yellow-700 font-medium mb-1">In Bearbeitung</h4>
              <p className="text-2xl font-bold text-yellow-800">
                {supportRequests.filter(req => req.status === 'in-progress').length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-green-700 font-medium mb-1">Erledigt</h4>
              <p className="text-2xl font-bold text-green-800">
                {supportRequests.filter(req => req.status === 'resolved').length}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-purple-700 font-medium mb-1">Hohe Priorität</h4>
              <p className="text-2xl font-bold text-purple-800">
                {supportRequests.filter(req => req.priority === 'high').length}
              </p>
            </div>
          </div>

          {/* Support-Anfragen Liste */}
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium">Aktuelle Support-Anfragen</h3>
            </div>
            <div className="divide-y">
              {supportRequests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{request.subject}</h4>
                      <p className="text-sm text-gray-600">{request.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.status === 'new' ? 'Neu' :
                         request.status === 'in-progress' ? 'In Bearbeitung' :
                         'Erledigt'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.priority === 'high' ? 'bg-red-100 text-red-800' :
                        request.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.priority === 'high' ? 'Hoch' :
                         request.priority === 'medium' ? 'Mittel' :
                         'Niedrig'}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.message}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {request.email}
                    </span>
                    {request.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {request.phone}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(request.createdAt).toLocaleString('de-DE')}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
                      onClick={() => {
                        const updated = supportRequests.map(req =>
                          req.id === request.id 
                            ? { ...req, status: 'in-progress' as const } 
                            : req
                        );
                        setSupportRequests(updated);
                      }}
                    >
                      Annehmen
                    </button>
                    <button 
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      onClick={() => {
                        const updated = supportRequests.map(req =>
                          req.id === request.id 
                            ? { ...req, status: 'resolved' as const } 
                            : req
                        );
                        setSupportRequests(updated);
                      }}
                    >
                      Als erledigt markieren
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 