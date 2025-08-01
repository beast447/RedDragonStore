import React, { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

interface OrderDoc {
  id: string;
  total: number;
  createdAt: { seconds: number } | null;
  paypalDetails?: any;
}

function MyOrders(): React.ReactElement {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const q = query(
          collection(db, `users/${user.uid}/orders`),
          orderBy('createdAt', 'desc'),
        );
        const snap = await getDocs(q);
        const list: OrderDoc[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setOrders(list);
      } catch (err) {
        console.error('Failed to load orders', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user) {
    return (
      <section id="myorders" className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">My Orders</h2>
        <p className="text-gray-600">Please sign in to view your orders.</p>
      </section>
    );
  }

  return (
    <section id="myorders" className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold mb-6">My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const date = o.createdAt ? new Date(o.createdAt.seconds * 1000) : null;
                // PayPal capture status
                const status =
                  o.paypalDetails?.status ??
                  o.paypalDetails?.purchase_units?.[0]?.payments?.captures?.[0]?.status ??
                  'Paid';
                return (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 pr-4 whitespace-nowrap">
                      {date ? date.toLocaleDateString() : '—'}
                    </td>
                    <td className="py-2 pr-4">{o.paypalOrderId ?? o.id}</td>
                    <td className="py-2 pr-4">${o.total.toFixed(2)}</td>
                    <td className="py-2 capitalize">{status.toLowerCase()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MyOrders;
