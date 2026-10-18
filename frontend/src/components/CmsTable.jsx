import { useState } from 'react';
import { uploadImage } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';

export default function CmsTable({
  title,
  columns,
  items,
  formFields,
  onCreate,
  onUpdate,
  onDelete,
  loading,
}) {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null); // null = add mode
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const openAdd = () => {
    const empty = {};
    formFields.forEach((f) => (empty[f.name] = ''));
    setFormData(empty);
    setEditItem(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (item) => {
    const prefilled = {};
    formFields.forEach((f) => {
      // Format date fields to yyyy-MM-dd for <input type="date">
      if (f.type === 'date' && item[f.name]) {
        prefilled[f.name] = new Date(item[f.name]).toISOString().split('T')[0];
      } else {
        prefilled[f.name] = item[f.name] || '';
      }
    });
    setFormData(prefilled);
    setEditItem(item);
    setError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditItem(null);
    setFormData({});
    setError('');
  };

  const handleChange = (e) => {
    setError('');
    const value = e.target.type === 'file' ? e.target.files[0] || '' : e.target.value;
    setFormData((fd) => ({ ...fd, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const submittedData = { ...formData };
      for (const field of formFields) {
        if (field.type === 'file' && submittedData[field.name] instanceof File) {
          const response = await uploadImage(submittedData[field.name]);
          submittedData[field.name] = response.data.url;
        }
      }

      if (editItem) {
        await onUpdate(editItem._id, submittedData);
      } else {
        await onCreate(submittedData);
      }
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setSaving(true);
    try {
      await onDelete(id);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setSaving(false);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your {title.toLowerCase()} records</p>
        </div>
        <button 
          onClick={openAdd} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-xl border border-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-10"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50 rounded-t-2xl">
                <h2 className="font-bold text-xl text-gray-900">
                  {editItem ? `Edit ${title}` : `Add New ${title}`}
                </h2>
                <button onClick={closeForm} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                <form id="cms-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm font-medium flex items-center gap-2">
                      <span className="text-red-500">⚠</span> {error}
                    </div>
                  )}
                  
                  {formFields.map((field) => (
                    <div key={field.name} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700" htmlFor={`form-${field.name}`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`form-${field.name}`}
                          name={field.name}
                          rows={4}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all resize-y text-gray-800"
                          placeholder={field.placeholder || ''}
                        />
                      ) : field.type === 'file' ? (
                        <div className="relative group">
                          <input
                            id={`form-${field.name}`}
                            name={field.name}
                            type="file"
                            accept={field.accept || 'image/*'}
                            required={field.required && !editItem}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                          />
                          {editItem && typeof formData[field.name] === 'string' && formData[field.name] && (
                            <div className="mt-3 flex items-center gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                              <ImageIcon size={20} className="text-blue-500" />
                              <span className="text-sm text-gray-600 truncate flex-1">{formData[field.name]}</span>
                              <span className="text-xs font-medium text-blue-600 bg-white px-2 py-1 rounded-md shadow-sm border border-blue-100">Current</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <input
                          id={`form-${field.name}`}
                          name={field.name}
                          type={field.type || 'text'}
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-gray-800"
                          placeholder={field.placeholder || ''}
                        />
                      )}
                    </div>
                  ))}
                </form>
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl flex gap-3">
                <button type="button" onClick={closeForm} className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="submit"
                  form="cms-form"
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md shadow-blue-500/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {saving && <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />}
                  {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmDelete(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm p-8 text-center relative z-10"
            >
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Record?</h3>
              <p className="text-gray-500 mb-8">This action cannot be undone. Are you sure you want to permanently delete this item?</p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(confirmDelete)}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 shadow-md shadow-red-500/20 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {saving && <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />}
                  {saving ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm flex-1 overflow-hidden flex flex-col relative">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-gray-400 min-h-[300px]">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-600 mb-4" />
            <p className="font-medium text-gray-500">Loading data...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-16 text-center min-h-[300px]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 border border-gray-100">
              <Plus size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No items found</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6">Get started by creating a new record for your website.</p>
            <button onClick={openAdd} className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
              Create your first item
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/80 sticky top-0 z-10">
                  {columns.map((col) => (
                    <th key={col.key} className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {col.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-transparent">
                {items.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-blue-50/50 transition-colors group">
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 text-sm text-gray-700 max-w-xs align-middle">
                        <div className="truncate">
                          {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '—')}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right whitespace-nowrap align-middle">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(item._id)}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex justify-end lg:hidden opacity-100">
                        {/* Mobile always visible actions */}
                        <div className="flex items-center gap-3">
                           <button onClick={() => openEdit(item)} className="text-blue-600 text-xs font-medium bg-blue-50 px-2 py-1 rounded">Edit</button>
                           <button onClick={() => setConfirmDelete(item._id)} className="text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded">Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.5);
        }
      `}</style>
    </div>
  );
}
