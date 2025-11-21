import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Package, TrendingUp, TrendingDown, Users, DollarSign } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalStock: number;
  todayIn: number;
  todayOut: number;
  totalClients: number;
  totalBalance: number;
}

interface StockItem {
  product_id: string;
  product_name: string;
  unit: string;
  current_stock: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalStock: 0,
    todayIn: 0,
    todayOut: 0,
    totalClients: 0,
    totalBalance: 0,
  });
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const [productsRes, stockRes, todayMovementsRes, clientsRes, balanceRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('v_current_stock').select('*'),
        supabase.from('stock_movements').select('movement_type, quantity').eq('entry_date', today),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('v_client_balances').select('balance'),
      ]);

      const totalProducts = productsRes.count || 0;
      const stockData = stockRes.data || [];
      const totalStock = stockData.reduce((sum, item) => sum + Number(item.current_stock), 0);

      const movements = todayMovementsRes.data || [];
      const todayIn = movements
        .filter(m => m.movement_type === 'giriş')
        .reduce((sum, m) => sum + Number(m.quantity), 0);
      const todayOut = movements
        .filter(m => m.movement_type === 'çıkış')
        .reduce((sum, m) => sum + Number(m.quantity), 0);

      const totalClients = clientsRes.count || 0;
      const totalBalance = (balanceRes.data || []).reduce((sum, item) => sum + Number(item.balance), 0);

      setStats({
        totalProducts,
        totalStock,
        todayIn,
        todayOut,
        totalClients,
        totalBalance,
      });

      setStockItems(stockData as StockItem[]);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-600">Yükleniyor...</div>
      </div>
    );
  }

  const statCards = [
    { label: 'Toplam Ürün', value: stats.totalProducts, icon: Package, color: 'bg-blue-500' },
    { label: 'Bugün Giriş', value: `${stats.todayIn.toFixed(2)}`, icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Bugün Çıkış', value: `${stats.todayOut.toFixed(2)}`, icon: TrendingDown, color: 'bg-red-500' },
    { label: 'Toplam Müşteri', value: stats.totalClients, icon: Users, color: 'bg-slate-500' },
    { label: 'Toplam Bakiye', value: `₺${stats.totalBalance.toFixed(2)}`, icon: DollarSign, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Dashboard</h2>
        <p className="text-slate-600">Genel stok ve iş durumu özeti</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-slate-600 text-sm">{card.label}</p>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Güncel Stok Durumu</h3>
        {stockItems.length === 0 ? (
          <p className="text-slate-600 text-center py-8">Henüz stok kaydı bulunmuyor</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Ürün Adı</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Birim</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Mevcut Stok</th>
                </tr>
              </thead>
              <tbody>
                {stockItems.map((item) => (
                  <tr key={item.product_id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-slate-900">{item.product_name}</td>
                    <td className="py-3 px-4 text-slate-600">{item.unit}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-semibold ${item.current_stock < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                        {Number(item.current_stock).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
