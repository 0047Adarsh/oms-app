// controllers/orderController.js
import supabase from '../db/supabaseClient.js';
import { sendWhatsAppMessage } from '../utils/whatsApp.js';

export const getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;  
  const { status, phone } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('order_id', id)
      .select()
      .single();

    if (error) throw error;

     const messageBody = `
      🚀 Your order has been updated!

      📦 Order ID: ${id}
      🔔 Status: ${status}
      📅 Updated At: ${new Date().toLocaleString()}

      Thank you for choosing us! 💙
      `;

    const whatsappResult = await sendWhatsAppMessage(phone, messageBody);

    if (whatsappResult) {
      console.log(`✅ WhatsApp message sent to ${phone}`);
    } else {
      console.warn(`⚠️ Failed to send WhatsApp message to ${phone}`);
    }

    console.log("✅ Fetched Orders:", data);
    res.json({ message: 'Status updated', order: data });
  } catch (error) {
    console.error(`Error updating order ${id}:`, error.message);
    if (error.code === 'PGRST106') {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(500).json({ error: 'Failed to update order status' });
  }
};