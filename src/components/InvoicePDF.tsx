import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { Invoice, Patient } from '../types';

// Register standard fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
  },
  clinicInfo: {
    flexDirection: 'column',
  },
  clinicName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5,
  },
  clinicDetails: {
    color: '#64748b',
    fontSize: 9,
    marginBottom: 2,
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: 60,
    color: '#64748b',
    fontWeight: 'bold',
  },
  value: {
    color: '#1e293b',
  },
  billTo: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748b',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  table: {
    width: 'auto',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    padding: 8,
  },
  colDesc: { width: '40%' },
  colCat: { width: '20%' },
  colQty: { width: '10%', textAlign: 'center' },
  colPrice: { width: '15%', textAlign: 'right' },
  colTotal: { width: '15%', textAlign: 'right' },
  
  headerText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
  },
  cellText: {
    fontSize: 9,
    color: '#334155',
  },
  
  totals: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 10,
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 5,
    width: 200,
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 10,
    color: '#64748b',
  },
  totalValue: {
    fontSize: 10,
    color: '#1e293b',
    fontWeight: 'bold',
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  }
});

interface InvoicePDFProps {
  invoice: Invoice;
  patient: Patient;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>Optical Eye Clinic</Text>
          <Text style={styles.clinicDetails}>123 Vision Street, Eye City, EC 54321</Text>
          <Text style={styles.clinicDetails}>Phone: (555) 123-4567</Text>
          <Text style={styles.clinicDetails}>Email: contact@opticaleye.com</Text>
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.title}>INVOICE</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Invoice #:</Text>
            <Text style={styles.value}>{invoice.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{new Date(invoice.date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={{ ...styles.value, color: invoice.status === 'paid' ? '#16a34a' : '#ea580c' }}>
              {invoice.status.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>

      {/* Bill To */}
      <View style={styles.billTo}>
        <Text style={styles.sectionTitle}>Bill To:</Text>
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 2 }}>{patient.full_name}</Text>
        <Text style={styles.clinicDetails}>{patient.address}</Text>
        <Text style={styles.clinicDetails}>{patient.phone}</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colDesc, styles.headerText]}>Description</Text>
          <Text style={[styles.colCat, styles.headerText]}>Category</Text>
          <Text style={[styles.colQty, styles.headerText]}>Qty</Text>
          <Text style={[styles.colPrice, styles.headerText]}>Price</Text>
          <Text style={[styles.colTotal, styles.headerText]}>Total</Text>
        </View>
        {invoice.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.colDesc, styles.cellText]}>{item.description}</Text>
            <Text style={[styles.colCat, styles.cellText]}>{item.category}</Text>
            <Text style={[styles.colQty, styles.cellText]}>{item.quantity}</Text>
            <Text style={[styles.colPrice, styles.cellText]}>${item.price.toFixed(2)}</Text>
            <Text style={[styles.colTotal, styles.cellText]}>${(item.quantity * item.price).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>${invoice.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount ({invoice.discount}%):</Text>
          <Text style={styles.totalValue}>-${(invoice.subtotal * invoice.discount / 100).toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({invoice.tax}%):</Text>
          <Text style={styles.totalValue}>+${((invoice.subtotal - (invoice.subtotal * invoice.discount / 100)) * invoice.tax / 100).toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, { marginTop: 5, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 5 }]}>
          <Text style={[styles.totalLabel, { fontSize: 12, color: '#1e293b' }]}>Grand Total:</Text>
          <Text style={styles.grandTotal}>${invoice.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Thank you for your business! • This is a computer generated invoice.
      </Text>
    </Page>
  </Document>
);
