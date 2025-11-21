import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, X, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface Client {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
}

interface Transaction {
  id: string;
  client_id: string | null;
  clients: { first_name: string | null; last_name: string | null; company: string | null } | null;
  amount: number;
  type: string;
  note: string | null;
  created_at: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    amount: '',
    type: 'odeme',
    note: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [transactionsRes, clientsRes] = await Promise.all([
        supabase
          .from('transactions')
          .select('*, clients(first_name, last_name, company)')
          .order('created_at', { ascending: false }),
        supabase.from('clients').select('*').order('company'),
      ]);

      if (transactionsRes.error) throw transactionsRes.error;
      if (clientsRes.error) throw clientsRes.error;

      setTransactions(transactionsRes.data || []);
      setClients(clientsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const amount = parseFloat(formData.amount);

      const { error } = await supabase.from('transactions').insert([
        {
          client_id: formData.client_id || null,
          amount,
          type: formData.type,
          note: formData.note || null,
        },
      ]);

      if (error) throw error;

      setShowModal(false);
      setFormData({ client_id: '', amount: '', type: 'odeme', note: '' });
      loadData();
    } catch (error) {
      console.error('Error saving transaction:', error);
      alert('İşlem kaydedilirken hata oluştu');
    }
  };

  const getClientDisplay = (transaction: Transaction) => {
    if (!transaction.clients) return 'Genel';
    const { first_name, last_name, company } = transaction.clients;
    if (company) return company;
    return `${first_name || ''} ${last_name || ''}`.trim() || 'İsimsiz';
  };

  const getTransactionTypeDisplay = (type: string) => {
    switch (type) {
      case 'odeme':
        return { label: 'Ödeme', color: 'bg-green-100 text-green-700', icon: TrendingUp };
      case 'alacak':
        return { label: 'Alacak', color: 'bg-blue-100 text-blue-700', icon: DollarSign };
      case 'borc':
        return { label: 'Borç', color: 'bg-red-100 text-red-700', icon: TrendingDown };
      default:
        return { label: type, color: 'bg-slate-100 text-slate-700', icon: DollarSign };
    }
  };

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Ödemeler</h2>
          <p className="text-slate-600">Ödeme ve alacak kayıtlarını yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni İşlem
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Henüz işlem kaydı bulunmuyor</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Tarih</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Müşteri</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Tip</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Tutar</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Not</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const typeInfo = getTransactionTypeDisplay(transaction.type);
                  const Icon = typeInfo.icon;
                  return (
                    <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-4 px-6 text-slate-900">
                        {new Date(transaction.created_at).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-4 px-6 text-slate-900">{getClientDisplay(transaction)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${typeInfo.color}`}>
                          <Icon className="w-3 h-3" />
                          {typeInfo.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right text-slate-900 font-semibold">
                        ₺{Number(transaction.amount).toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-slate-600">{transaction.note || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Yeni İşlem</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Müşteri (Opsiyonel)
                </label>
                <select
                  value={formData.client_id}
                  onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="">Genel / Müşteri seçin</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.company || `${client.first_name || ''} ${client.last_name || ''}`.trim()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">İşlem Tipi</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                >
                  <option value="odeme">Ödeme</option>
                  <option value="alacak">Alacak</option>
                  <option value="borc">Borç</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tutar</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Not (Opsiyonel)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Açıklama ekleyin"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
