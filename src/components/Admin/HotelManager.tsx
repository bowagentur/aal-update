import { useState } from 'react';
import { useHotels, type Hotel } from '../../hooks/useHotels';
import { Pencil, Trash, Plus, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function HotelManager() {
  const { hotels, loading, error, createHotel, updateHotel, deleteHotel } = useHotels();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Hotel>>({});
  const [activeTab, setActiveTab] = useState<'basic' | 'sections' | 'rooms' | 'amenities' | 'packages' | 'contacts' | 'policies'>('basic');

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

  const handleEdit = (hotel: Hotel) => {
    setIsEditing(hotel.id);
    setEditForm(hotel);
  };

  const handleSave = async () => {
    if (!isEditing) return;

    try {
      // Update main hotel data
      const { name, description, rating, branding } = editForm;
      await updateHotel(isEditing, { name, description, rating, branding });

      // Update location if changed
      if (editForm.location) {
        const { data, error } = await supabase
          .from('hotel_locations')
          .upsert({
            hotel_id: isEditing,
            ...editForm.location
          })
          .select();
        if (error) throw error;
      }

      // Update sections if changed
      if (editForm.sections) {
        for (const [type, section] of Object.entries(editForm.sections)) {
          if (!section) continue;
          const { data, error } = await supabase
            .from('hotel_sections')
            .upsert({
              hotel_id: isEditing,
              type,
              title: section.title,
              content: section.content,
              metadata: section
            })
            .select();
          if (error) throw error;
        }
      }

      // Update policies if changed
      if (editForm.policies) {
        for (const [type, content] of Object.entries(editForm.policies)) {
          const { data, error } = await supabase
            .from('hotel_policies')
            .upsert({
              hotel_id: isEditing,
              type: type as any,
              content
            })
            .select();
          if (error) throw error;
        }
      }

      setIsEditing(null);
      setEditForm({});
      setActiveTab('basic');
    } catch (err) {
      console.error('Error updating hotel:', err);
    }
  };

  const handleCreate = async () => {
    try {
      const newHotel = {
        name: 'Neues Hotel',
        description: 'Hotelbeschreibung hier eingeben',
        rating: 4.0,
        branding: {
          logo: '/logos/default_logo.png',
          primaryColor: '#0069b3',
          secondaryColor: '#c4984d'
        }
      };

      await createHotel(newHotel);
    } catch (err) {
      console.error('Error creating hotel:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie dieses Hotel löschen möchten?')) return;

    try {
      await deleteHotel(id);
    } catch (err) {
      console.error('Error deleting hotel:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif">Hotels verwalten</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          Neues Hotel
        </button>
      </div>

      <div className="grid gap-6">
        {hotels.map(hotel => (
          <div key={hotel.id} className="bg-white rounded-xl shadow-lg p-6">
            {isEditing === hotel.id ? (
              // Edit Form
              <div className="space-y-4">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  {['basic', 'sections', 'rooms', 'amenities', 'packages', 'contacts', 'policies'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name || ''}
                        onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Beschreibung
                      </label>
                      <textarea
                        value={editForm.description || ''}
                        onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bewertung
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={editForm.rating || 0}
                        onChange={e => setEditForm(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Branding
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Logo URL"
                          value={editForm.branding?.logo || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            branding: { ...prev.branding, logo: e.target.value }
                          }))}
                          className="px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        <input
                          type="text"
                          placeholder="Primary Color"
                          value={editForm.branding?.primaryColor || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            branding: { ...prev.branding, primaryColor: e.target.value }
                          }))}
                          className="px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sections Tab */}
                {activeTab === 'sections' && (
                  <div className="space-y-6">
                    {['welcome', 'rooms', 'wellness', 'dining', 'meetings', 'location'].map((sectionType) => (
                      <div key={sectionType} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-4 capitalize">{sectionType}</h4>
                        <div className="space-y-4">
                          <input
                            type="text"
                            placeholder="Title"
                            value={editForm.sections?.[sectionType]?.title || ''}
                            onChange={e => setEditForm(prev => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                [sectionType]: {
                                  ...prev.sections?.[sectionType],
                                  title: e.target.value
                                }
                              }
                            }))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                          <textarea
                            placeholder="Content"
                            value={editForm.sections?.[sectionType]?.content || ''}
                            onChange={e => setEditForm(prev => ({
                              ...prev,
                              sections: {
                                ...prev.sections,
                                [sectionType]: {
                                  ...prev.sections?.[sectionType],
                                  content: e.target.value
                                }
                              }
                            }))}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Rooms Tab */}
                {activeTab === 'rooms' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Zimmer & Suiten</h3>
                      <button
                        onClick={() => {
                          setEditForm(prev => ({
                            ...prev,
                            rooms: [
                              ...(prev.rooms || []),
                              {
                                id: crypto.randomUUID(),
                                name: 'Neues Zimmer',
                                description: '',
                                category: 'standard',
                                size: 0,
                                maxOccupancy: 2,
                                priceDouble: 0,
                                amenities: []
                              }
                            ]
                          }));
                        }}
                        className="text-primary hover:text-primary-dark flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Zimmer hinzufügen
                      </button>
                    </div>
                    {editForm.rooms?.map((room, index) => (
                      <div key={room.id} className="border rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={room.name}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, name: e.target.value };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
                            <select
                              value={room.category}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, category: e.target.value };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            >
                              <option value="standard">Standard</option>
                              <option value="comfort">Comfort</option>
                              <option value="deluxe">Deluxe</option>
                              <option value="suite">Suite</option>
                              <option value="apartment">Apartment</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                            <textarea
                              value={room.description}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, description: e.target.value };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              rows={3}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Größe (m²)</label>
                            <input
                              type="number"
                              value={room.size}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, size: parseFloat(e.target.value) };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max. Belegung</label>
                            <input
                              type="number"
                              value={room.maxOccupancy}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, maxOccupancy: parseInt(e.target.value) };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preis EZ</label>
                            <input
                              type="number"
                              value={room.priceSingle || ''}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, priceSingle: parseFloat(e.target.value) };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preis DZ</label>
                            <input
                              type="number"
                              value={room.priceDouble}
                              onChange={e => {
                                const updatedRooms = [...(editForm.rooms || [])];
                                updatedRooms[index] = { ...room, priceDouble: parseFloat(e.target.value) };
                                setEditForm(prev => ({ ...prev, rooms: updatedRooms }));
                              }}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Amenities Tab */}
                {activeTab === 'amenities' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Wellness & Spa</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={editForm.amenities?.wellness?.title || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            amenities: {
                              ...prev.amenities,
                              wellness: {
                                ...prev.amenities?.wellness,
                                title: e.target.value
                              }
                            }
                          }))}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        <textarea
                          placeholder="Features (one per line)"
                          value={editForm.amenities?.wellness?.features?.join('\n') || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            amenities: {
                              ...prev.amenities,
                              wellness: {
                                ...prev.amenities?.wellness,
                                features: e.target.value.split('\n').filter(Boolean)
                              }
                            }
                          }))}
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Packages Tab */}
                {activeTab === 'packages' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Arrangements</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Title"
                          value={editForm.packages?.title || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            packages: {
                              ...prev.packages,
                              title: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        <textarea
                          placeholder="Description"
                          value={editForm.packages?.description || ''}
                          onChange={e => setEditForm(prev => ({
                            ...prev,
                            packages: {
                              ...prev.packages,
                              description: e.target.value
                            }
                          }))}
                          rows={3}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Contacts Tab */}
                {activeTab === 'contacts' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Kontaktdaten</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                          <input
                            type="text"
                            value={editForm.contact?.phone || ''}
                            onChange={e => setEditForm(prev => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                phone: e.target.value
                              }
                            }))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                          <input
                            type="email"
                            value={editForm.contact?.email || ''}
                            onChange={e => setEditForm(prev => ({
                              ...prev,
                              contact: {
                                ...prev.contact,
                                email: e.target.value
                              }
                            }))}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Policies Tab */}
                {activeTab === 'policies' && (
                  <div className="space-y-6">
                    {['checkin', 'checkout', 'cancellation', 'pets', 'children', 'payment'].map((policyType) => (
                      <div key={policyType} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-4 capitalize">{policyType}</h4>
                        <textarea
                          placeholder={`${policyType} policy`}
                          value={JSON.stringify(editForm.policies?.[policyType], null, 2) || ''}
                          onChange={e => {
                            try {
                              const content = JSON.parse(e.target.value);
                              setEditForm(prev => ({
                                ...prev,
                                policies: {
                                  ...prev.policies,
                                  [policyType]: content
                                }
                              }));
                            } catch (err) {
                              // Handle invalid JSON
                            }
                          }}
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary font-mono text-sm"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setIsEditing(null);
                      setEditForm({});
                      setActiveTab('basic');
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Speichern
                  </button>
                </div>
              </div>
            ) : (
              // Display View
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-serif mb-2">{hotel.name}</h3>
                  <p className="text-gray-600 mb-4">{hotel.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-primary font-medium">{hotel.rating} / 5</span>
                    {hotel.location && (
                      <span className="text-gray-600">
                        {hotel.location.city}, {hotel.location.country}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(hotel.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}