import { useState, useEffect, useCallback } from 'react';
import CmsTable from '../../components/CmsTable';
import {
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff,
} from '../../services/api';

const COLUMNS = [
  { key: 'name',       label: 'Name' },
  { key: 'role',       label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'bio',        label: 'Bio' },
];

const FORM_FIELDS = [
  { name: 'name',       label: 'Full Name',    type: 'text',     required: true },
  { name: 'nameMl',     label: 'Full Name (Malayalam)', type: 'text', required: false },
  { name: 'role',       label: 'Job Title',    type: 'text',     required: true },
  { name: 'roleMl',     label: 'Job Title (Malayalam)', type: 'text', required: false },
  { name: 'department', label: 'Department',   type: 'text',     required: true },
  { name: 'departmentMl', label: 'Department (Malayalam)', type: 'text', required: false },
  { name: 'bio',        label: 'Short Bio',    type: 'textarea', required: true },
  { name: 'bioMl',      label: 'Short Bio (Malayalam)', type: 'textarea', required: false },
  { name: 'imageUrl',   label: 'Image',        type: 'file',     required: false },
];

export default function AdminStaff() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(() => {
    setLoading(true);
    getStaff()
      .then((res) => setItems(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const handleCreate = async (data) => { await createStaff(data); fetch(); };
  const handleUpdate = async (id, data) => { await updateStaff(id, data); fetch(); };
  const handleDelete = async (id) => { await deleteStaff(id); fetch(); };

  return (
    <CmsTable
      title="Staff"
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
