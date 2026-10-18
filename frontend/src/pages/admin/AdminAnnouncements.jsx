import { useState, useEffect, useCallback } from 'react';
import CmsTable from '../../components/CmsTable';
import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from '../../services/api';

const COLUMNS = [
  { key: 'title', label: 'Title' },
  {
    key: 'date',
    label: 'Date',
    render: (v) => (v ? new Date(v).toLocaleDateString('en-IN') : '—'),
  },
  { key: 'content', label: 'Content' },
];

const FORM_FIELDS = [
  { name: 'title',   label: 'Title',   type: 'text',     required: true },
  { name: 'titleMl', label: 'Title (Malayalam)', type: 'text', required: false },
  { name: 'date',    label: 'Date',    type: 'date',     required: false },
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'contentMl', label: 'Content (Malayalam)', type: 'textarea', required: false },
];

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    getAnnouncements()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCreate = async (data) => {
    await createAnnouncement(data);
    fetch();
  };
  const handleUpdate = async (id, data) => {
    await updateAnnouncement(id, data);
    fetch();
  };
  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    fetch();
  };

  return (
    <CmsTable
      title="Announcements"
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
