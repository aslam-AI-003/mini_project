import { ShoppingCart, Package, Clock, CheckCircle } from 'lucide-react';

const demoOrders = [
  { id: 'ORD-001', supplier: 'Sri Lakshmi Wholesale Traders', product: 'Premium Basmati Rice', qty: '100 kg', total: '₹8,800', status: 'Delivered', date: '28 Aug 2024' },
  { id: 'ORD-002', supplier: 'Chennai Food Grains Wholesale', product: 'Wheat Flour', qty: '50 kg', total: '₹2,100', status: 'In Transit', date: '30 Aug 2024' },
  { id: 'ORD-003', supplier: 'Royal Agro Wholesale', product: 'Sunflower Oil', qty: '20 litres', total: '₹2,240', status: 'Processing', date: '01 Sep 2024' },
  { id: 'ORD-004', supplier: 'Velachery Grocery Hub', product: 'Sugar', qty: '100 kg', total: '₹4,000', status: 'Delivered', date: '25 Aug 2024' },
];

const statusColors: Record<string, string> = {
  'Delivered': 'bg-green-100 text-green-700',
  'In Transit': 'bg-blue-100 text-blue-700',
  'Processing': 'bg-orange-100 text-orange-700',
};

export default function Orders() {
  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Orders</h1>
        <p className="text-sm text-gray-500">Track your wholesale orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-700">4</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-700">1</p>
              <p className="text-xs text-gray-500">Processing</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-700">1</p>
              <p className="text-xs text-gray-500">In Transit</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-navy-700">2</p>
              <p className="text-xs text-gray-500">Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Supplier</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Quantity</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Total</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map(order => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-brand-600">{order.id}</td>
                <td className="py-3 px-4 text-gray-800">{order.supplier}</td>
                <td className="py-3 px-4 text-gray-600">{order.product}</td>
                <td className="py-3 px-4 text-gray-600">{order.qty}</td>
                <td className="py-3 px-4 font-semibold text-navy-700">{order.total}</td>
                <td className="py-3 px-4 text-gray-500">{order.date}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        * This is demo data. Order tracking will be available when backend is connected.
      </p>
    </div>
  );
}
