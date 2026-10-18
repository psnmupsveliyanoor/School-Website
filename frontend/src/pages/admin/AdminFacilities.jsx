import { useState, useEffect, useCallback } from 'react';
import CmsTable from '../../components/CmsTable';
import {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} from '../../services/api';

const COLUMNS = [
  { key: 'icon', label: 'Icon', render: (v) => <span style={{ fontSize: '1.4rem' }}>{v || '🏫'}</span> },
  { key: 'name', label: 'Name' },
  { key: 'tag', label: 'Tag' },
  { key: 'shortDescription', label: 'Short Description' },
  {
    key: 'imageUrl',
    label: 'Image',
    render: (v) =>
      v ? (
        <img src={v} alt="thumb" className="w-16 h-12 object-cover rounded-lg" />
      ) : (
        <span className="text-gray-400 text-xs">No image</span>
      ),
  },
];

const FORM_FIELDS = [
  { name: 'order',            label: 'Display Order (1 = first)', type: 'number',   required: false, placeholder: '1' },
  { name: 'name',             label: 'Facility Name',             type: 'text',     required: true },
  { name: 'nameMl',           label: 'Facility Name (Malayalam)', type: 'text', required: false },
  { name: 'icon',             label: 'Icon (Emoji)',              type: 'text',     required: false, placeholder: '🏫' },
  { name: 'tag',              label: 'Category Tag',              type: 'text',     required: false, placeholder: 'Infrastructure' },
  { name: 'tagMl',            label: 'Category Tag (Malayalam)',  type: 'text', required: false },
  { name: 'shortDescription', label: 'Short Description',         type: 'textarea', required: false },
  { name: 'shortDescriptionMl', label: 'Short Description (Malayalam)', type: 'textarea', required: false },
  { name: 'longDescription',  label: 'Long Description',          type: 'textarea', required: false },
  { name: 'longDescriptionMl', label: 'Long Description (Malayalam)', type: 'textarea', required: false },
  {
    name: 'bullets',
    label: 'Feature Bullets (one per line)',
    type: 'textarea',
    required: false,
    placeholder: 'Interactive smart boards\nGrade-separated spaces\nNatural lighting',
  },
  {
    name: 'bulletsMl',
    label: 'Feature Bullets (Malayalam, one per line)',
    type: 'textarea',
    required: false,
  },
  { name: 'imageUrl',  label: 'Image',          type: 'file', required: false },
  { name: 'accent',   label: 'Accent Gradient', type: 'text', required: false, placeholder: 'linear-gradient(90deg,#2563EB,#3B82F6)' },
  { name: 'tagColor', label: 'Tag Color (hex)', type: 'text', required: false, placeholder: '#2563EB' },
  { name: 'glow',     label: 'Glow Color',      type: 'text', required: false, placeholder: 'rgba(37,99,235,0.12)' },
  { name: 'iconBg',   label: 'Icon Bg Color',   type: 'text', required: false, placeholder: 'rgba(37,99,235,0.10)' },
];

export default function AdminFacilities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    getFacilities()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCreate = async (data) => {
    // Convert bullets textarea to array
    if (typeof data.bullets === 'string') {
      data.bullets = data.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    }
    if (typeof data.bulletsMl === 'string') {
      data.bulletsMl = data.bulletsMl.split('\n').map((b) => b.trim()).filter(Boolean);
    }
    await createFacility(data);
    fetch();
  };

  const handleUpdate = async (id, data) => {
    if (typeof data.bullets === 'string') {
      data.bullets = data.bullets.split('\n').map((b) => b.trim()).filter(Boolean);
    }
    if (typeof data.bulletsMl === 'string') {
      data.bulletsMl = data.bulletsMl.split('\n').map((b) => b.trim()).filter(Boolean);
    }
    await updateFacility(id, data);
    fetch();
  };

  const handleDelete = async (id) => { await deleteFacility(id); fetch(); };

  // Pre-process items so bullets array → newline-separated string for the textarea
  const processedItems = items.map((item) => ({
    ...item,
    bullets: Array.isArray(item.bullets) ? item.bullets.join('\n') : (item.bullets || ''),
    bulletsMl: Array.isArray(item.bulletsMl) ? item.bulletsMl.join('\n') : (item.bulletsMl || ''),
  }));

  return (
    <CmsTable
      title="Facilities"
      columns={COLUMNS}
      items={processedItems}
      formFields={FORM_FIELDS}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
