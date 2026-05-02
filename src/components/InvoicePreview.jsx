import React from 'react';

const fmt = (currency, val) =>
  `${currency}${Number(val || 0).toFixed(2)}`;

const InvoicePreview = ({ data }) => {
  const { from, to, invoice, items, tax, notes, currency, discount } = data;

  const hasItems = items && items.some(i => i.description);

  const subtotal = items.reduce((s, i) => s + (parseFloat(i.quantity || 0) * parseFloat(i.price || 0)), 0);
  const discountAmt = subtotal * (parseFloat(discount) || 0) / 100;
  const taxAmt = (subtotal - discountAmt) * (parseFloat(tax) || 0) / 100;
  const total = subtotal - discountAmt + taxAmt;

  if (!hasItems && !from.name && !to.name) {
    return (
      <div id="invoice-print-area" className="invoice-preview-wrapper" style={{ background: 'var(--bg-card)' }}>
        <div className="empty-preview">
          <div className="empty-icon">📄</div>
          <div className="empty-text">Your invoice preview will appear here</div>
          <div className="empty-sub">Start filling the form on the left to see a live preview</div>
        </div>
      </div>
    );
  }

  return (
    <div id="invoice-print-area" className="invoice-preview-wrapper">
      {/* Gradient Header */}
      <div className="invoice-header-bar">
        <div>
          <div className="inv-company-name">{from.name || 'Your Company'}</div>
          {from.tagline && <div className="inv-company-tagline">{from.tagline}</div>}
          <div className="inv-company-contact">
            {from.address && <span>{from.address}<br /></span>}
            {from.city && <span>{from.city}<br /></span>}
            {from.phone && <span>📞 {from.phone}<br /></span>}
            {from.email && <span>✉ {from.email}</span>}
          </div>
        </div>
        <div className="inv-title-block">
          <div className="inv-title">INVOICE</div>
          <div className="inv-number">#{invoice.number || '0001'}</div>
          <div className="inv-status-badge">UNPAID</div>
        </div>
      </div>

      {/* Body */}
      <div className="invoice-body">
        {/* Bill From / To */}
        <div className="inv-meta-grid">
          <div className="inv-meta-box">
            <div className="inv-meta-label">Bill From</div>
            <div className="inv-meta-value">
              <strong>{from.name || '—'}</strong>
              {from.address && <span>{from.address}, </span>}
              {from.city && <span>{from.city}<br /></span>}
              {from.gst && <span>GST: {from.gst}</span>}
            </div>
          </div>
          <div className="inv-meta-box">
            <div className="inv-meta-label">Bill To</div>
            <div className="inv-meta-value">
              <strong>{to.name || '—'}</strong>
              {to.address && <span>{to.address}, </span>}
              {to.city && <span>{to.city}<br /></span>}
              {to.phone && <span>📞 {to.phone}<br /></span>}
              {to.gst && <span>GST: {to.gst}</span>}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="inv-dates">
          <div className="inv-date-item">
            <div className="inv-date-label">Invoice Date</div>
            <div className="inv-date-val">{invoice.date || '—'}</div>
          </div>
          <div className="inv-date-item">
            <div className="inv-date-label">Due Date</div>
            <div className="inv-date-val">{invoice.dueDate || '—'}</div>
          </div>
          <div className="inv-date-item">
            <div className="inv-date-label">Terms</div>
            <div className="inv-date-val">{invoice.terms || 'Net 30'}</div>
          </div>
          {invoice.po && (
            <div className="inv-date-item">
              <div className="inv-date-label">PO Number</div>
              <div className="inv-date-val">{invoice.po}</div>
            </div>
          )}
        </div>

        {/* Items Table */}
        <table className="inv-table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Description</th>
              <th style={{ textAlign: 'center' }}>Qty</th>
              <th>Rate</th>
              <th style={{ textAlign: 'center' }}>Tax%</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(i => i.description).map((item, idx) => (
              <tr key={idx}>
                <td>{item.description}</td>
                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                <td>{fmt(currency, item.price)}</td>
                <td style={{ textAlign: 'center' }}>{tax}%</td>
                <td>{fmt(currency, item.quantity * item.price)}</td>
              </tr>
            ))}
            {items.filter(i => i.description).length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1.5rem', fontSize: '0.75rem' }}>
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Totals */}
        <div className="inv-totals">
          <div className="inv-total-row">
            <span>Subtotal</span>
            <span>{fmt(currency, subtotal)}</span>
          </div>
          {parseFloat(discount) > 0 && (
            <div className="inv-total-row" style={{ color: 'var(--danger)' }}>
              <span>Discount ({discount}%)</span>
              <span>-{fmt(currency, discountAmt)}</span>
            </div>
          )}
          <div className="inv-total-row tax-row-preview">
            <span>Tax ({tax}%)</span>
            <span>{fmt(currency, taxAmt)}</span>
          </div>
          <div className="inv-total-row grand">
            <span>TOTAL DUE</span>
            <span>{fmt(currency, total)}</span>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="inv-notes">
            <strong>Notes & Terms</strong>
            {notes}
          </div>
        )}

        {/* Footer */}
        <div className="inv-footer">
          <div>
            <div>Thank you for your business!</div>
            {from.bank && <div>Bank: {from.bank}</div>}
            {from.upi && <div>UPI: {from.upi}</div>}
          </div>
          <div className="inv-signature-block">
            <div className="inv-signature-line" />
            <div>Authorised Signature</div>
            <div style={{ marginTop: '2px', fontWeight: 600, color: 'var(--text-primary)' }}>{from.name || 'Your Company'}</div>
          </div>
        </div>
        <div className="inv-powered">Generated with Invoice Pro • Professional Invoice Generator</div>
      </div>
    </div>
  );
};

export default InvoicePreview;
