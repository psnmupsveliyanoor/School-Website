import { useState, useEffect, useCallback } from 'react';
import CmsTable from '../../components/CmsTable';
import {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../../services/api';

const COLUMNS = [
  { key: 'title',    label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'fileType', label: 'Type' },
  {
    key: 'imageUrl',
    label: 'Preview',
    render: (v, item) => item?.fileType === 'video' ? (
      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">🎥 Video Stream</span>
    ) : v ? (
      <img 
        src={v} 
        alt="Preview Thumbnail" 
        className="w-12 h-12 object-cover rounded-lg border border-slate-200"
        onError={(e) => {
          // Graceful fallback display if the browser ever drops the stream connection
          e.target.src = "https://placehold.co/100x100?text=No+Image";
        }}
      />
    ) : '—',
  },
];

const FORM_FIELDS = [
  { name: 'title',    label: 'Title',    type: 'text', required: true },
  { name: 'titleMl',  label: 'Title (Malayalam)', type: 'text', required: false },
  { name: 'category', label: 'Category', type: 'text', required: true, placeholder: 'e.g. Sports, Cultural, Academics' },
  { name: 'categoryMl', label: 'Category (Malayalam)', type: 'text', required: false },
  { 
    name: 'fileType', 
    label: 'Media Format', 
    type: 'select', 
    options: [{ value: 'image', label: 'Image File' }, { value: 'video', label: 'Video File' }],
    required: true,
    defaultValue: 'image'
  },
  { name: 'mediaFile', label: 'Select Media File', type: 'file', required: true },
];

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    getGallery()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCreate = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('titleMl', data.titleMl || '');
    formData.append('category', data.category);
    formData.append('categoryMl', data.categoryMl || '');
    formData.append('fileType', data.fileType || 'image');

    // Grab the real binary File object directly from the DOM input element field
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      formData.append('mediaFile', fileInput.files[0]);
    } else {
      // Fallback if querySelector misses it
      formData.append('mediaFile', data.mediaFile);
    }

    try {
      await createGalleryItem(formData);
      fetch();
    } catch (error) {
      console.error("Upload error details:", error);
      alert(error.response?.data?.message || "Something went wrong during file upload");
    }
  };

 const handleUpdate = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title || '');
  formData.append('titleMl', data.titleMl || '');
  formData.append('category', data.category || '');
  formData.append('categoryMl', data.categoryMl || '');
  formData.append('fileType', data.fileType || 'image');

  // Grab selected binary file if the user picked a new file during edit
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput && fileInput.files.length > 0) {
    formData.append('mediaFile', fileInput.files[0]);
  } else if (data.mediaFile instanceof File) {
    formData.append('mediaFile', data.mediaFile);
  }

  try {
    await updateGalleryItem(id, formData);
    fetch();
  } catch (error) {
    console.error("Update error details:", error);
    alert(error.response?.data?.message || "Failed to update item");
  }
};
  
  const handleDelete = async (id) => { 
    await deleteGalleryItem(id); 
    fetch(); 
  };

  return (
    <CmsTable
      title="Gallery"
      columns={COLUMNS}
      items={items}
      formFields={FORM_FIELDS}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}