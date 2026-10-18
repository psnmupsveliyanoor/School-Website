import { useState, useEffect, useCallback } from 'react';
import CmsTable from '../../components/CmsTable';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../services/api';

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'date',  label: 'Date', render: (v) => (v ? new Date(v).toLocaleDateString('en-IN') : '—') },
  { key: 'imageUrl', label: 'Image', render: (v) => (v ? '🖼️' : '—') },
];

const FORM_FIELDS = [
  { name: 'title',    label: 'Title',                  type: 'text', required: true },
  { name: 'titleMl',  label: 'Title (Malayalam)',      type: 'text', required: false },
  { name: 'date',     label: 'Date (leave blank if unknown)', type: 'date', required: false },
  { name: 'location', label: 'Location', type: 'text', required: false },
  { name: 'locationMl', label: 'Location (Malayalam)', type: 'text', required: false },
  { name: 'description', label: 'Description', type: 'textarea', required: false },
  { name: 'descriptionMl', label: 'Description (Malayalam)', type: 'textarea', required: false },
  { name: 'imageUrl', label: 'Image',                  type: 'file', required: false },
];

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    getEvents()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCreate = async (data) => { await createEvent(data); fetch(); };
  const handleUpdate = async (id, data) => { await updateEvent(id, data); fetch(); };
  const handleDelete = async (id) => { await deleteEvent(id); fetch(); };

  return (
    <CmsTable
      title="Events"
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
