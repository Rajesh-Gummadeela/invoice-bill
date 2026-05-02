# 🧾 Invoice Pro — Professional Invoice Generator

A sleek, modern, and high-performance invoice generator built with **React** and **Vite**. Designed for small business owners and shopkeepers who need a fast, reliable, and private way to generate professional invoices — entirely in the browser, with zero data sent to any server.

---

## ✨ Features

- **Live Preview** — See your invoice update in real-time as you type
- **Dynamic Item Management** — Add or remove items with automatic subtotal and grand total calculations
- **Detailed Business Info** — Include shop name, tagline, address, GST details, UPI ID, and bank details
- **Tax & Discount Support** — Built-in GST/tax percentage and discount calculations
- **Multi-Currency Support** — ₹ INR, $ USD, € EUR, £ GBP, ¥ JPY, ₩ KRW, AED and more
- **Instant PDF Download** — Generate high-resolution, professional A4 PDF invoices directly in the browser
- **Email Invoice** — Send the invoice with full item breakdown directly to the customer's email via EmailJS
- **Cash Change Calculator** — Enter cash received and instantly see the change to return
- **Fully Responsive** — Works on desktops, tablets, and mobile devices
- **100% Private** — No invoice data is ever sent to any server; everything runs locally on your device

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Hooks & Functional Components) |
| Styling | Custom CSS — Dark UI with Glassmorphism |
| PDF Generation | `html2pdf.js` + `html2canvas` |
| Email Delivery | EmailJS (`@emailjs/browser`) |
| Build Tool | Vite |

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajesh-Gummadeela/invoice-bill
   ```

2. **Navigate to the project directory**
   ```bash
   cd Invoice-generator
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── InvoiceForm.jsx       # All input fields and form logic
│   └── InvoicePreview.jsx    # Live-updating invoice layout
├── utils/
│   └── generatePDF.js        # Core PDF generation logic
├── App.jsx                   # Main layout and state management
├── App.css                   # Component-specific styles
└── index.css                 # Global design system & theme
```

---

## 📧 Email Setup (EmailJS)

The email feature uses [EmailJS](https://www.emailjs.com/) to send invoices directly from the browser — no backend required.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Add an **Email Service** (Gmail recommended) and copy the **Service ID**
3. Create an **Email Template** and copy the **Template ID**
4. Copy your **Public Key** from the Account → General tab
5. Open `src/components/InvoiceForm.jsx` and replace these three lines:

```js
const YOUR_SERVICE_ID  = 'your_service_id';
const YOUR_TEMPLATE_ID = 'your_template_id';
const YOUR_PUBLIC_KEY  = 'your_public_key';
```

> **Free tier:** 200 emails/month — more than enough for a retail shop.

---

## 📝 How to Use

1. **Fill in Details** — Enter your business information and invoice details
2. **Add Items** — List products/services with quantity and price
3. **Configure Tax & Discount** — Adjust GST percentage and any applicable discount
4. **Cash Change** — Enter the cash given by the customer to instantly see the change to return
5. **Preview** — Check the live preview panel to ensure everything looks correct
6. **Download or Email** — Click **Download Invoice PDF** to save, or **Send to Email** to deliver it directly to your customer


---

## 💡 About

Built with ❤️ for small businesses and shopkeepers who deserve professional tools without the complexity.
