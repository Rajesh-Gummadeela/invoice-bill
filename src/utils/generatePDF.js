import html2pdf from 'html2pdf.js';

/**
 * Captures the element with id="invoice-print-area" and saves it as a PDF
 * using html2pdf.js, which guarantees a proper downloadable .pdf format.
 */
export async function generatePDF(filename = 'Invoice.pdf') {
  const element = document.getElementById('invoice-print-area');
  
  if (!element) {
    alert('Invoice preview not found. Please fill in at least one field first.');
    return;
  }

  try {
    const opt = {
      margin:       5, // 5mm margin
      filename:     filename,
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf to process and directly trigger the native browser download
    html2pdf().set(opt).from(element).save();
    
  } catch (err) {
    console.error('PDF generation error:', err);
    alert('An error occurred while generating the PDF.');
  }
}
