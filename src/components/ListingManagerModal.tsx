import React, { useState } from 'react';
import { Property, formatNaira } from '../data/properties';
import { X, Edit3, Check, RefreshCw, Plus, Trash2, Shield } from 'lucide-react';

interface ListingManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onUpdateProperty: (updated: Property) => void;
  onResetProperties: () => void;
}

export const ListingManagerModal: React.FC<ListingManagerModalProps> = ({
  isOpen,
  onClose,
  properties,
  onUpdateProperty,
  onResetProperties
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<Property['status']>('Available');
  const [editSource, setEditSource] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');

  if (!isOpen) return null;

  const startEdit = (prop: Property) => {
    setEditingId(prop.id);
    setEditPrice(prop.priceNaira);
    setEditStatus(prop.status);
    setEditSource(prop.sourceAttribution);
    setEditDate(prop.lastVerifiedDate);
  };

  const saveEdit = (prop: Property) => {
    const updated: Property = {
      ...prop,
      priceNaira: editPrice,
      status: editStatus,
      sourceAttribution: editSource,
      lastVerifiedDate: editDate
    };
    onUpdateProperty(updated);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#181A1F] border border-[#2A2D35] rounded-3xl shadow-2xl z-10 text-[#F4F0E8] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#121316] border-b border-[#252830] px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold">
                Brokerage Management Console
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white mt-0.5">
              Property Price & Availability Manager
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetProperties}
              className="px-3 py-1.5 rounded-lg border border-[#2A2D35] text-xs text-[#A0A4B0] hover:text-white hover:border-[#C5A880] transition-colors flex items-center gap-1.5"
              title="Reset all prices and listings to initial verified state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#A0A4B0] hover:text-white rounded-full hover:bg-[#252830] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Table / List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <p className="text-[#A0A4B0] text-xs">
            Directly update asking prices, listing verification dates, and commercial availability statuses for advertised Abuja properties. Changes reflect instantaneously across all catalog cards and interactive maps.
          </p>

          <div className="space-y-3">
            {properties.map((prop) => {
              const isEditing = editingId === prop.id;

              return (
                <div
                  key={prop.id}
                  className={`p-4 rounded-2xl border transition-colors ${
                    isEditing ? 'bg-[#121316] border-[#C5A880]' : 'bg-[#14161A] border-[#252830]'
                  }`}
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{prop.title}</span>
                        <span className="font-mono text-[#A0A4B0]">{prop.code}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#A0A4B0] mb-1">Asking Price (₦ Naira)</label>
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                            step={10000000}
                            className="w-full px-3 py-2 bg-[#181A1F] border border-[#2A2D35] rounded-lg text-white font-mono focus:border-[#C5A880]"
                          />
                          <span className="text-[10px] text-[#C5A880] mt-1 block">
                            Formatted: {formatNaira(editPrice)}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[#A0A4B0] mb-1">Availability Status</label>
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as Property['status'])}
                            className="w-full px-3 py-2 bg-[#181A1F] border border-[#2A2D35] rounded-lg text-white focus:border-[#C5A880]"
                          >
                            <option value="Available">Available</option>
                            <option value="Under Offer">Under Offer</option>
                            <option value="Private Review">Private Review</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#A0A4B0] mb-1">Source Attribution</label>
                          <input
                            type="text"
                            value={editSource}
                            onChange={(e) => setEditSource(e.target.value)}
                            className="w-full px-3 py-2 bg-[#181A1F] border border-[#2A2D35] rounded-lg text-white focus:border-[#C5A880]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#A0A4B0] mb-1">Last Verified Date</label>
                          <input
                            type="text"
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            placeholder="e.g. November 2026"
                            className="w-full px-3 py-2 bg-[#181A1F] border border-[#2A2D35] rounded-lg text-white focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 rounded-lg bg-[#242832] text-white hover:bg-[#2F3442]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveEdit(prop)}
                          className="px-4 py-2 rounded-lg bg-[#C5A880] text-[#121316] font-semibold flex items-center gap-1.5 hover:bg-[#D4AF37]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-[#A0A4B0]">{prop.code}</span>
                          <span className="text-[#C5A880]">·</span>
                          <span className="font-medium text-white">{prop.district}</span>
                          <span className="text-[#C5A880]">·</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            prop.status === 'Available' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {prop.status}
                          </span>
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-[#F4F0E8] mt-0.5">{prop.title}</h4>
                        <div className="text-[11px] text-[#A0A4B0] mt-1 flex items-center gap-3">
                          <span>Source: <strong className="text-[#E8E3D9]">{prop.sourceAttribution}</strong></span>
                          <span>Verified: {prop.lastVerifiedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-[10px] uppercase text-[#A0A4B0] block">Asking Price</span>
                          <span className="font-serif text-base font-bold text-[#C5A880]">
                            {formatNaira(prop.priceNaira)}
                          </span>
                        </div>

                        <button
                          onClick={() => startEdit(prop)}
                          className="p-2.5 rounded-xl bg-[#242832] hover:bg-[#C5A880] hover:text-[#121316] transition-colors text-white"
                          title="Edit Price & Availability"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#121316] border-t border-[#252830] px-6 py-4 flex items-center justify-between text-xs">
          <span className="text-[#A0A4B0]">Total active inventory: {properties.length} listings</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#C5A880] text-[#121316] font-semibold hover:bg-[#D4AF37]"
          >
            Close Manager
          </button>
        </div>
      </div>
    </div>
  );
};
