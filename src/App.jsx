import React, { useState } from 'react';
import './App.css';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';

const today = new Date().toISOString().slice(0, 10);

const defaultData = {
  from: {
    name: '', tagline: '', address: '', city: '',
    phone: '', email: '', gst: '', upi: '', bank: ''
  },
  to: { name: '', address: '', city: '', phone: '', gst: '' },
  invoice: {
    number: 'INV-0001',
    date: today,
    dueDate: '',
    terms: 'Net 30',
    po: ''
  },
  items: [{ description: '', quantity: 1, price: 0 }],
  tax: '18',
  discount: '0',
  notes: 'Thank you for your business! Payment is due within 30 days.\nPlease make payment to the bank account or UPI ID mentioned below.',
  currency: '₹',
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState('form'); // mobile: 'form' | 'preview'

  return (
    <div className="app-wrapper">
      {/* ─── HEADER ─── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">🧾</div>
            <div>
              <div className="logo-text">Invoice Pro</div>
              <span className="logo-sub">Professional Invoicing</span>
            </div>
          </div>
          <div className="header-badge">
            <span className="badge-dot" />
            Free &amp; No Sign-Up Required
          </div>
        </div>
      </header>

      {/* ─── MOBILE TAB SWITCHER ─── */}
      <div className="mobile-tabs">
        <button
          className={`tab-btn ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => setActiveTab('form')}
        >
          📝 Edit Invoice
        </button>
        <button
          className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
      </div>

      {/* ─── MAIN ─── */}
      <main className="main-container">
        {/* LEFT: Form */}
        <div className={`panel form-panel ${activeTab === 'preview' ? 'hidden-mobile' : ''}`}>
          <div className="panel-header">
            <div className="panel-icon indigo">📝</div>
            <div>
              <div className="panel-title">Create Invoice</div>
              <div className="panel-subtitle">Fill in the details below</div>
            </div>
          </div>
          <InvoiceForm data={data} onChange={setData} />
        </div>

        {/* RIGHT: Preview */}
        <div className={`panel preview-panel ${activeTab === 'form' ? 'hidden-mobile' : ''}`}>
          <div className="panel-header">
            <div className="panel-icon cyan">👁️</div>
            <div>
              <div className="panel-title">Live Preview</div>
              <div className="panel-subtitle">Updates as you type</div>
            </div>
          </div>
          <InvoicePreview data={data} />
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="site-footer">
        <p>Invoice Pro © {new Date().getFullYear()} • Built for small businesses &amp; shops • 100% Free</p>
      </footer>
    </div>
  );
}
