import React from 'react';
import {
  Document, Page, Text, View, StyleSheet, Font
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    padding: 0,
  },
  headerBar: {
    backgroundColor: '#4f46e5',
    padding: '28 30',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyName: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  companyTag: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  companyContact: {
    fontSize: 7.5,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
    lineHeight: 1.7,
  },
  invTitleBlock: { alignItems: 'flex-end' },
  invTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 3,
  },
  invNumber: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 3,
  },
  statusBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 7,
    color: '#ffffff',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  body: { padding: '20 30 25 30' },
  metaGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metaBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 6,
    padding: '10 12',
    borderLeftWidth: 3,
    borderLeftColor: '#4f46e5',
  },
  metaLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metaName: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 8,
    color: '#475569',
    lineHeight: 1.6,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  dateItem: { flex: 1 },
  dateLabel: {
    fontSize: 6.5,
    color: '#94a3b8',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  dateVal: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    borderRadius: 4,
    padding: '6 8',
    marginBottom: 2,
  },
  thText: {
    color: '#ffffff',
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  tableRow: {
    flexDirection: 'row',
    padding: '6 8',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableRowEven: { backgroundColor: '#f8fafc' },
  tdText: { fontSize: 8, color: '#334155' },
  tdAmount: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#1e293b', textAlign: 'right' },
  colDesc: { flex: 2.5 },
  colQty:  { flex: 0.7, textAlign: 'center' },
  colRate: { flex: 1 },
  colTax:  { flex: 0.8, textAlign: 'center' },
  colAmt:  { flex: 1, textAlign: 'right' },
  totalsSection: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  totalsBox: {
    width: '50%',
    borderTopWidth: 1.5,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  totalLabel: { fontSize: 8, color: '#64748b' },
  totalVal: { fontSize: 8, color: '#334155' },
  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 2,
    borderTopColor: '#4f46e5',
    marginTop: 4,
  },
  grandLabel: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#0f172a' },
  grandVal: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#4f46e5' },
  taxGreen: { color: '#059669' },
  notesBox: {
    marginTop: 16,
    padding: '10 12',
    backgroundColor: '#f0f9ff',
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#06b6d4',
  },
  notesLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0369a1',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  notesText: { fontSize: 8, color: '#0369a1', lineHeight: 1.6 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'dashed',
  },
  footerLeft: { fontSize: 7, color: '#94a3b8', lineHeight: 1.6 },
  signatureBlock: { alignItems: 'flex-end' },
  signatureLine: { width: 120, height: 1, backgroundColor: '#334155', marginBottom: 3 },
  signatureText: { fontSize: 7, color: '#64748b' },
  powered: {
    textAlign: 'center',
    fontSize: 6.5,
    color: '#cbd5e1',
    marginTop: 12,
  },
});

const fmt = (currency, val) => `${currency}${Number(val).toFixed(2)}`;

const InvoicePDF = ({ data }) => {
  const { from, to, invoice, items, tax, notes, currency, discount } = data;
  const subtotal = items.reduce((s, i) => s + (i.quantity * i.price), 0);
  const discountAmt = subtotal * (parseFloat(discount) || 0) / 100;
  const taxAmt = (subtotal - discountAmt) * (parseFloat(tax) || 0) / 100;
  const total = subtotal - discountAmt + taxAmt;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.companyName}>{from.name || 'Your Company'}</Text>
            {from.tagline ? <Text style={styles.companyTag}>{from.tagline}</Text> : null}
            <Text style={styles.companyContact}>
              {[from.address, from.city, from.phone, from.email].filter(Boolean).join('\n')}
            </Text>
          </View>
          <View style={styles.invTitleBlock}>
            <Text style={styles.invTitle}>INVOICE</Text>
            <Text style={styles.invNumber}>#{invoice.number || '0001'}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>UNPAID</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Bill from / to */}
          <View style={styles.metaGrid}>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Bill From</Text>
              <Text style={styles.metaName}>{from.name || '—'}</Text>
              <Text style={styles.metaValue}>{[from.address, from.city, from.gst ? `GST: ${from.gst}` : ''].filter(Boolean).join('\n')}</Text>
            </View>
            <View style={styles.metaBox}>
              <Text style={styles.metaLabel}>Bill To</Text>
              <Text style={styles.metaName}>{to.name || '—'}</Text>
              <Text style={styles.metaValue}>{[to.address, to.city, to.phone, to.gst ? `GST: ${to.gst}` : ''].filter(Boolean).join('\n')}</Text>
            </View>
          </View>

          {/* Dates */}
          <View style={styles.datesRow}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Invoice Date</Text>
              <Text style={styles.dateVal}>{invoice.date || '—'}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Due Date</Text>
              <Text style={styles.dateVal}>{invoice.dueDate || '—'}</Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Payment Terms</Text>
              <Text style={styles.dateVal}>{invoice.terms || 'Net 30'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Table */}
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colDesc]}>Description</Text>
            <Text style={[styles.thText, styles.colQty, { textAlign: 'center' }]}>Qty</Text>
            <Text style={[styles.thText, styles.colRate]}>Rate</Text>
            <Text style={[styles.thText, styles.colTax, { textAlign: 'center' }]}>Tax%</Text>
            <Text style={[styles.thText, styles.colAmt, { textAlign: 'right' }]}>Amount</Text>
          </View>

          {items.map((item, i) => (
            <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowEven : {}]}>
              <Text style={[styles.tdText, styles.colDesc]}>{item.description || '—'}</Text>
              <Text style={[styles.tdText, styles.colQty, { textAlign: 'center' }]}>{item.quantity}</Text>
              <Text style={[styles.tdText, styles.colRate]}>{fmt(currency, item.price)}</Text>
              <Text style={[styles.tdText, styles.colTax, { textAlign: 'center' }]}>{tax}%</Text>
              <Text style={[styles.tdAmount, styles.colAmt]}>{fmt(currency, item.quantity * item.price)}</Text>
            </View>
          ))}

          {/* Totals */}
          <View style={styles.totalsSection}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalVal}>{fmt(currency, subtotal)}</Text>
              </View>
              {discountAmt > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount ({discount}%)</Text>
                  <Text style={[styles.totalVal, { color: '#dc2626' }]}>-{fmt(currency, discountAmt)}</Text>
                </View>
              )}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax ({tax}%)</Text>
                <Text style={[styles.totalVal, styles.taxGreen]}>{fmt(currency, taxAmt)}</Text>
              </View>
              <View style={styles.grandRow}>
                <Text style={styles.grandLabel}>TOTAL DUE</Text>
                <Text style={styles.grandVal}>{fmt(currency, total)}</Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          {notes && (
            <View style={styles.notesBox}>
              <Text style={styles.notesLabel}>Notes & Terms</Text>
              <Text style={styles.notesText}>{notes}</Text>
            </View>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <View>
              <Text style={styles.footerLeft}>Thank you for your business!</Text>
              {from.bank && <Text style={styles.footerLeft}>Bank: {from.bank}</Text>}
              {from.upi && <Text style={styles.footerLeft}>UPI: {from.upi}</Text>}
            </View>
            <View style={styles.signatureBlock}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Authorised Signature</Text>
              <Text style={[styles.signatureText, { marginTop: 2 }]}>{from.name || 'Your Company'}</Text>
            </View>
          </View>

          <Text style={styles.powered}>Generated with Invoice Pro • Professional Invoice Generator</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
