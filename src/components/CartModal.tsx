import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartModal({ isOpen, onClose }: CartModalProps): React.ReactElement | null {
  const { items, removeItem, clearCart } = useCart();
  const { user } = useAuth();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingCost = 5; // flat shipping cost, adjust as needed or calculate dynamically
  const grandTotal = total + shippingCost;

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            value: grandTotal.toFixed(2),
            currency_code: 'USD',
            breakdown: {
              item_total: { currency_code: 'USD', value: total.toFixed(2) },
              shipping: { currency_code: 'USD', value: shippingCost.toFixed(2) },
            },
          },
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    const details = await actions.order.capture();

    // Persist order to Firestore
    try {
      await addDoc(collection(db, user ? `users/${user.uid}/orders` : 'guestOrders'), {
        userId: user?.uid ?? null,
        items,
        subtotal: total,
        shipping: shippingCost,
        total: grandTotal,
        paypalOrderId: details.id,
        paypalDetails: details,
        createdAt: serverTimestamp(),
      });
      // Forward the order to Printful for fulfilment (fire-and-forget)
      fetch('/api/printful/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          external_id: details.id,
          shipping: {
            name: details.payer.name.given_name + ' ' + details.payer.name.surname,
            address1: details.purchase_units[0].shipping.address.address_line_1,
            city: details.purchase_units[0].shipping.address.admin_area_2,
            state_code: details.purchase_units[0].shipping.address.admin_area_1,
            country_code: details.purchase_units[0].shipping.address.country_code,
            zip: details.purchase_units[0].shipping.address.postal_code,
          },
          items: items.map((i) => ({ variant_id: Number(i.id), quantity: i.quantity })),
        }),
      }).catch((err) => console.error('Failed to send order to Printful', err));
    } catch (err) {
      console.error('Failed to record order in Firestore', err);
    }

    clearCart();
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/60 backdrop-blur py-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 relative animate-fade max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-4">
              {items.map((item) => (
                <li key={item.id} className="py-2 flex gap-3 items-center">
                  <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">Shipping</span>
              <span className="font-bold">${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4 border-t pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-bold">${grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={clearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
              >
                Clear Cart
              </button>
              {items.length > 0 && (
                <PayPalButtons
                  style={{ layout: 'vertical' }}
                  forceReRender={[grandTotal]}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={(err) => {
                    console.error('PayPal Buttons error', err);
                    alert('There was a problem initialising PayPal. Check console for details.');
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;
