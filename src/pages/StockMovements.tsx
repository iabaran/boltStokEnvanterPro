import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Filter, X, TrendingUp, TrendingDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  unit: string;
}

interface StockMovement {
  id: string;
  product_id: string;
  products: { name: string; unit: string };
  movement_type: string;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  supplier: string | null;
  entry_date: string;
  created_at: string;
}

export default function StockMovements() {
  const { user } = useAuth();
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [formData, setFormData] = useState({
    product_id: '',
    movement_type: 'giriş',
    quantity: '',
    unit_price: '',
    supplier: '',
    entry_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [movementsRes, productsRes] = await Promise.all([
        supabase
          .from('stock_movements')
          .select('*, products(name, unit)')
          .order('entry_date', { ascending: false })
          .order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('name'),
      ]);

      if (movementsRes.error) throw movementsRes.error;
      if (productsRes.error) throw productsRes.error;

      setMovements(movementsRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_id) {
      alert('Lütfen bir ürün seçin');
      return;
    }

    try {
      const quantity = parseFloat(formData.quantity);
      const unitPrice = formData.unit_price ? parseFloat(formData.unit_price) : null;
      const totalPrice = unitPrice ? quantity * unitPrice : null;

      const { error } = await supabase.from('stock_movements').insert([
        {
          product_id: formData.product_id,
          movement_type: formData.movement_type,
          quantity,
          unit_price: unitPrice,
          total_price: totalPrice,
          supplier: formData.supplier || null,
          entry_date: formData.entry_date,
          created_by: user?.id,
        },
      ]);

      if (error) throw error;

      setShowModal(false);
      setFormData({
        product_id: '',
        movement_type: 'giriş',
        quantity: '',
        unit_price: '',
        supplier: '',
        entry_date: new Date().toISOString().split('T')[0],
      });
      loadData();
    } catch (error) {
      console.error('Error saving movement:', error);
      alert('Hareket kaydedilirken hata oluştu');
    }
  };

  const filteredMovements = movements.filter((m) => {
    if (filterType === 'all') return true;
    return m.movement_type === filterType;
  });

  if (loading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Stok Hareketleri</h2>
          <p className="text-slate-600">Giriş ve çıkış kayıtlarını takip edin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Hareket
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
            filterType === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          Tümü
        </button>
        <button
          onClick={() => setFilterType('giriş')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
            filterType === 'giriş'
              ? 'bg-green-500 text-white'
              : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Giriş
        </button>
        <button
          onClick={() => setFilterType('çıkış')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
            filterType === 'çıkış'
              ? 'bg-red-500 text-white'
              : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
          }`}
        >
          <TrendingDown className="w-4 h-4" />
          Çıkış
        </button>
      </div>

      {filteredMovements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Henüz hareket kaydı bulunmuyor</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Tarih</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Ürün</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Tip</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Miktar</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Birim Fiyat</th>
                  <th className="text-right py-3 px-6 text-sm font-semibold text-slate-700">Toplam</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-slate-700">Tedarikçi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovements.map((movement) => (
                  <tr key={movement.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-4 px-6 text-slate-900">
                      {new Date(movement.entry_date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-slate-900">{movement.products.name}</div>
                      <div className="text-sm text-slate-500">{movement.products.unit}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          movement.movement_type === 'giriş'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {movement.movement_type === 'giriş' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {movement.movement_type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-900 font-medium">
                      {Number(movement.quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-600">
                      {movement.unit_price ? `₺${Number(movement.unit_price).toFixed(2)}` : '-'}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-900 font-medium">
                      {movement.total_price ? `₺${Number(movement.total_price).toFixed(2)}` : '-'}
                    </td>
                    <td className="py-4 px-6 text-slate-600">{movement.supplier || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Yeni Stok Hareketi</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-600 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Ürün</label>
                <select
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                >
                  <option value="">Ürün seçin</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hareket Tipi</label>
                <select
                  value={formData.movement_type}
                  onChange={(e) => setFormData({ ...formData, movement_type: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
                >
                  <option value="giriş">Giriş</option>
                  <option value="çıkış">Çıkış</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Miktar</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Birim Fiyat (Opsiyonel)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.unit_price}
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tedarikçi (Opsiyonel)
                </label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Firma adı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tarih</label>
                <input
                  type="date"
                  value={formData.entry_date}
                  onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  required
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
