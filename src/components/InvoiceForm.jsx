import React, { useState } from 'react';
import { generatePDF } from '../utils/generatePDF';

const CURRENCIES = [
  { symbol: '₹', label: 'INR (₹)' },
  { symbol: '$', label: 'USD ($)' },
  { symbol: '€', label: 'EUR (€)' },
  { symbol: '£', label: 'GBP (£)' },
  { symbol: '¥', label: 'JPY (¥)' },
  { symbol: '₩', label: 'KRW (₩)' },
  { symbol: 'د.إ', label: 'AED' },
];

const TERMS_OPTIONS = ['Net 7', 'Net 15', 'Net 30', 'Net 60', 'Due on Receipt', 'COD'];

const defaultItem = () => ({ description: '', quantity: 1, price: 0 });

const InvoiceForm = ({ data, onChange }) => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const { from, to, invoice, items, tax, discount, notes, currency } = data;

  const update = (section, field, value) => {
    onChange({ ...data, [section]: { ...data[section], [field]: value } });
  };

  const updateRoot = (field, value) => onChange({ ...data, [field]: value });

  const updateItem = (idx, field, value) => {
    const next = items.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: next });
  };

  const addItem = () => onChange({ ...data, items: [...items, defaultItem()] });

  const removeItem = (idx) => {
    if (items.length === 1) return;
    onChange({ ...data, items: items.filter((_, i) => i !== idx) });
  };

  const subtotal = items.reduce((s, i) => s + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0);
  const discountAmt = subtotal * (parseFloat(discount) || 0) / 100;
  const taxAmt = (subtotal - discountAmt) * (parseFloat(tax) || 0) / 100;
  const total = subtotal - discountAmt + taxAmt;
  const fmt = v => `${currency}${Number(v).toFixed(2)}`;

  return (
    <div>
      {/* ─── INVOICE DETAILS ─── */}
      <div className="form-section">
        <div className="section-label">📋 Invoice Details</div>
        <div className="form-grid form-grid-2">
          <div className="form-group">
            <label className="form-label">Invoice Number <span>*</span></label>
            <input value={invoice.number} onChange={e => update('invoice', 'number', e.target.value)} placeholder="INV-0001" />
          </div>
          <div className="form-group">
            <label className="form-label">Currency</label>
            <select value={currency} onChange={e => updateRoot('currency', e.target.value)}>
              {CURRENCIES.map(c => <option key={c.symbol} value={c.symbol}>{c.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Invoice Date <span>*</span></label>
            <input type="date" value={invoice.date} onChange={e => update('invoice', 'date', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input type="date" value={invoice.dueDate} onChange={e => update('invoice', 'dueDate', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Payment Terms</label>
            <select value={invoice.terms} onChange={e => update('invoice', 'terms', e.target.value)}>
              {TERMS_OPTIONS.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">PO Number</label>
            <input value={invoice.po} onChange={e => update('invoice', 'po', e.target.value)} placeholder="PO-2024-001" />
          </div>
        </div>
      </div>

      {/* ─── FROM ─── */}
      <div className="form-section">
        <div className="section-label">🏢 Your Business (From)</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Business / Shop Name <span>*</span></label>
            <input value={from.name} onChange={e => update('from', 'name', e.target.value)} placeholder="Your Shop Name" />
          </div>
          <div className="form-group">
            <label className="form-label">Tagline / Slogan</label>
            <input value={from.tagline} onChange={e => update('from', 'tagline', e.target.value)} placeholder="Quality you can trust" />
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Address</label>
              <input value={from.address} onChange={e => update('from', 'address', e.target.value)} placeholder="123 Main Street" />
            </div>
            <div className="form-group">
              <label className="form-label">City / State / PIN</label>
              <input value={from.city} onChange={e => update('from', 'city', e.target.value)} placeholder="Mumbai, MH 400001" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input value={from.phone} onChange={e => update('from', 'phone', e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" value={from.email} onChange={e => update('from', 'email', e.target.value)} placeholder="shop@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">GST / Tax ID</label>
              <input value={from.gst} onChange={e => update('from', 'gst', e.target.value)} placeholder="27XXXXX1234Z5" />
            </div>
            <div className="form-group">
              <label className="form-label">UPI ID</label>
              <input value={from.upi} onChange={e => update('from', 'upi', e.target.value)} placeholder="yourshop@upi" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Bank Details (for footer)</label>
            <input value={from.bank} onChange={e => update('from', 'bank', e.target.value)} placeholder="SBI A/C: 1234567890, IFSC: SBIN0001234" />
          </div>
        </div>
      </div>

      {/* ─── CUSTOMER ─── */}
      <div className="form-section">
        <div className="section-label">👤 Customer (Bill To)</div>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Customer Name <span>*</span></label>
            <input value={to.name} onChange={e => update('to', 'name', e.target.value)} placeholder="Customer / Company Name" />
          </div>
          <div className="form-grid form-grid-2">
            <div className="form-group">
              <label className="form-label">Address</label>
              <input value={to.address} onChange={e => update('to', 'address', e.target.value)} placeholder="Customer Address" />
            </div>
            <div className="form-group">
              <label className="form-label">City / State</label>
              <input value={to.city} onChange={e => update('to', 'city', e.target.value)} placeholder="Delhi, 110001" />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input value={to.phone} onChange={e => update('to', 'phone', e.target.value)} placeholder="+91 99999 11111" />
            </div>
            <div className="form-group">
              <label className="form-label">GST No. (if applicable)</label>
              <input value={to.gst} onChange={e => update('to', 'gst', e.target.value)} placeholder="Customer GST" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── ITEMS ─── */}
      <div className="form-section">
        <div className="section-label">📦 Items / Services</div>
        <div className="items-header">
          <span>Description</span>
          <span>Qty</span>
          <span>Rate</span>
          <span>Amount</span>
          <span></span>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="item-row">
            <input
              value={item.description}
              onChange={e => updateItem(idx, 'description', e.target.value)}
              placeholder="Item description..."
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateItem(idx, 'quantity', e.target.value)}
              style={{ textAlign: 'center' }}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.price}
              onChange={e => updateItem(idx, 'price', e.target.value)}
              placeholder="0.00"
            />
            <div className="item-amount">{fmt(item.quantity * item.price)}</div>
            <button className="btn-remove" onClick={() => removeItem(idx)} title="Remove item">✕</button>
          </div>
        ))}
        <button className="btn-add-item" onClick={addItem}>
          ＋ Add Item / Service
        </button>
      </div>

      {/* ─── TAX & TOTALS ─── */}
      <div className="form-section">
        <div className="section-label">🧾 Tax & Totals</div>
        <div className="form-grid form-grid-2" style={{ marginBottom: '0.75rem' }}>
          <div className="form-group">
            <label className="form-label">Tax / GST Rate (%)</label>
            <div className="tax-input-row">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={tax}
                onChange={e => updateRoot('tax', e.target.value)}
                style={{ textAlign: 'center' }}
              />
              <span>%</span>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Discount (%)</label>
            <div className="tax-input-row">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={discount}
                onChange={e => updateRoot('discount', e.target.value)}
                style={{ textAlign: 'center' }}
              />
              <span>%</span>
            </div>
          </div>
        </div>
        <div className="tax-row">
          <div className="tax-item">
            <div className="tax-label">Subtotal</div>
            <div className="tax-value">{fmt(subtotal)}</div>
          </div>
          <div className="tax-item">
            <div className="tax-label">Tax + Discount</div>
            <div className="tax-value" style={{ color: 'var(--success)' }}>
              +{fmt(taxAmt)} / -{fmt(discountAmt)}
            </div>
          </div>
          <div className="tax-item">
            <div className="tax-label">Grand Total</div>
            <div className="tax-value highlight">{fmt(total)}</div>
          </div>
        </div>
      </div>

      {/* ─── NOTES ─── */}
      <div className="form-section">
        <div className="section-label">📝 Notes & Terms</div>
        <textarea
          value={notes}
          onChange={e => updateRoot('notes', e.target.value)}
          placeholder="Payment instructions, return policy, thank you message, etc."
          rows={3}
        />
      </div>

      {/* ─── DOWNLOAD ─── */}
      <div className="actions-bar">
        <button
          className="btn btn-cyan"
          style={{ flex: 1, justifyContent: 'center' }}
          disabled={pdfLoading}
          onClick={async () => {
            setPdfLoading(true);
            await generatePDF(`Invoice-${invoice.number || 'draft'}.pdf`);
            setPdfLoading(false);
          }}
        >
          {pdfLoading ? '⏳ Generating PDF...' : '⬇️ Download Invoice PDF'}
        </button>
        <button
          className="btn btn-outline"
          onClick={() => {
            onChange({
              from: { name: '', tagline: '', address: '', city: '', phone: '', email: '', gst: '', upi: '', bank: '' },
              to: { name: '', address: '', city: '', phone: '', gst: '' },
              invoice: { number: 'INV-0001', date: new Date().toISOString().slice(0,10), dueDate: '', terms: 'Net 30', po: '' },
              items: [defaultItem()],
              tax: '18',
              discount: '0',
              notes: '',
              currency: '₹',
            });
          }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
};

export default InvoiceForm;
