import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2, X, DollarSign } from 'lucide-react';

interface Client {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  created_at: string;
}

interface ClientBalance {
  client_id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  balance: number;
}

export default function Clients() {
  const [clients, setClients] = useState<ClientBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    company: '',
    phone: '',
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('v_client_balances')
        .select('*')
        .order('company');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingClient) {
        const { error } = await supabase
          .from('clients')
          .update(formData)
          .eq('id', editingClient.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('clients').insert([formData]);

        if (error) throw error;
      }

      setShowModal(false);
      setFormData({ first_name: '', last_name: '', company: '', phone: '' });
      setEditingClient(null);
      loadClients();
    } catch (error) {
      console.error('Error saving client:', error);
      alert('Müşteri kaydedilirken hata oluştu');
    }
  };

  const handleEdit = async (clientBalance: ClientBalance) => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientBalance.client_id)
        .single();

      if (error) throw error;

      setEditingClient(data);
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        company: data.company || '',
        phone: data.phone || '',
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error loading client:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) return;

    try {
      const { error } = await supabase.from('clients').delete().eq('id', id);

      if (error) throw error;
      loadClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Müşteri silinirken hata oluştu');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClient(null);
    setFormData({ first_name: '', last_name: '', company: '', phone: '' });
  };

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Müşteriler</h2>
          <p className="text-slate-600">Müşteri bilgilerini ve bakiyelerini yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Müşteri
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Henüz müşteri eklenmemiş</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 text-slate-900 hover:underline"
          >
            İlk müşteriyi ekleyin
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Ad Soyad</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Şirket</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Telefon</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Bakiye</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.client_id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-4 px-6 text-slate-900">
                      {client.first_name || client.last_name
                        ? `${client.first_name || ''} ${client.last_name || ''}`.trim()
                        : '-'}
                    </td>
                    <td className="py-4 px-6 text-slate-900">{client.company || '-'}</td>
                    <td className="py-4 px-6 text-slate-600">{client.phone || '-'}</td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`font-semibold ${
                          client.balance > 0
                            ? 'text-green-600'
                            : client.balance < 0
                            ? 'text-red-600'
                            : 'text-slate-900'
                        }`}
                      >
                        ₺{Number(client.balance).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.client_id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingClient ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}
              </h3>
              <button onClick={closeModal} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ad</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Ad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Soyad</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Soyad"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Şirket</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Şirket adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="05XX XXX XX XX"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  {editingClient ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
