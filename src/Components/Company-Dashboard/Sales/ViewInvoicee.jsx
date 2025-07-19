import React, { useState } from 'react';
import { Row, Col, Table, Button, Badge, Dropdown, ButtonGroup } from 'react-bootstrap';
import {
  FaEdit, FaPrint, FaEye, FaMoneyBill, FaPaperPlane,
  FaGlobe, FaExchangeAlt, FaTimes,
  FaCaretUp, FaLanguage
} from 'react-icons/fa';

const ViewInvoicee = () => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  // English content
  const content = {
    title: "Invoice",
    invoiceNo: "Invoice# INV-1045",
    reference: "Reference:",
    grossAmount: "Gross Amount:",
    billTo: "Bill To",
    invoiceDate: "Invoice Date:",
    dueDate: "Due Date:",
    terms: "Terms:",
    paymentStatus: "Payment Status:",
    paymentMethod: "Payment Method:",
    note: "Note:",
    subTotal: "Sub Total",
    tax: "TAX",
    shipping: "Shipping",
    total: "Total",
    paymentReceived: "Payment Received",
    balanceDue: "Balance Due",
    creditTransactions: "Credit Transactions:",
    termsConditions: "Terms & Conditions",
    paymentTerms: "Payment Due On Receipt",
    pricesPayment: "1. Prices And Payment:",
    paymentDetails: "Payments are to be made in U.S. funds. Unless otherwise specified, all invoices are due net 30 days from shipment date.",
    publicAccess: "Public Access URL:",
    attachments: "Attachments",
    selectFiles: "Select files...",
    allowedFiles: "Allowed: gif, jpeg, png, docx, docs, txt, pdf, xls",
    businessOwner: "Business Owner",
    noTransactions: "No transactions",
    tableHeaders: ["#", "Description", "Rate", "Qty", "Tax", "Discount", "Amount"],
    transactionHeaders: ["Date", "Method", "Amount", "Note"]
  };

  // Arabic content
  const arabicContent = {
    title: "فاتورة",
    invoiceNo: "فاتورة رقم INV-1045",
    reference: "المرجع:",
    grossAmount: "المبلغ الإجمالي:",
    billTo: "فاتورة إلى",
    invoiceDate: "تاريخ الفاتورة:",
    dueDate: "تاريخ الاستحقاق:",
    terms: "الشروط:",
    paymentStatus: "حالة الدفع:",
    paymentMethod: "طريقة الدفع:",
    note: "ملاحظة:",
    subTotal: "المجموع الفرعي",
    tax: "الضريبة",
    shipping: "الشحن",
    total: "المجموع",
    paymentReceived: "المبلغ المستلم",
    balanceDue: "الرصيد المستحق",
    creditTransactions: "معاملات الائتمان:",
    termsConditions: "الشروط والأحكام",
    paymentTerms: "الدفع عند الاستلام",
    pricesPayment: "1. الأسعار والدفع:",
    paymentDetails: "يجب أن تتم المدفوعات بالدولار الأمريكي. ما لم يُذكر خلاف ذلك، تكون جميع الفواتير مستحقة الدفع خلال 30 يومًا من تاريخ الشحن.",
    publicAccess: "رابط الوصول العام:",
    attachments: "المرفقات",
    selectFiles: "اختر ملفات...",
    allowedFiles: "مسموح: gif, jpeg, png, docx, docs, txt, pdf, xls",
    businessOwner: "صاحب العمل",
    noTransactions: "لا توجد معاملات",
    tableHeaders: ["#", "الوصف", "السعر", "الكمية", "الضريبة", "الخصم", "المبلغ"],
    transactionHeaders: ["التاريخ", "الطريقة", "المبلغ", "ملاحظة"]
  };

  const currentContent = isArabic ? arabicContent : content;

  return (
    <div className={`mt-4 p-4 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Action Bar */}
      <Row className="mb-4">
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="outline-primary" onClick={toggleLanguage} className="d-flex align-items-center gap-1">
              <FaLanguage /> <span>{isArabic ? 'English' : 'العربية'}</span>
            </Button>
            <Button variant="warning" className="d-flex align-items-center gap-1">
              <FaEdit /> <span>{isArabic ? 'تعديل' : 'Edit Invoice'}</span>
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-1">
              <FaMoneyBill /> <span>{isArabic ? 'استلام الدفع' : 'Receive Payment'}</span>
            </Button>
            <Button variant="primary" className="d-flex align-items-center gap-1">
              <FaPaperPlane /> <span>{isArabic ? 'إرسال' : 'Send'}</span>
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-1">
              <FaPrint /> <span>{isArabic ? 'طباعة الفاتورة' : 'Print Invoice'}</span>
            </Button>
            <Button variant="info" className="d-flex align-items-center gap-1">
              <FaGlobe /> <span>{isArabic ? 'معاينة الطباعة' : 'Print Preview'}</span>
            </Button>
            <Button variant="secondary" className="d-flex align-items-center gap-1">
              <FaExchangeAlt /> <span>{isArabic ? 'تغيير الحالة' : 'Change Status'}</span>
            </Button>
            <Button variant="success" className="d-flex align-items-center gap-1">
              <FaEdit /> <span>{isArabic ? 'إذن التوصيل' : 'Delivery Note'}</span>
            </Button>
            <Button variant="info" className="d-flex align-items-center gap-1">
              <FaEye/> <span>{isArabic ? 'فاتورة مؤقتة' : 'Proforma Invoice'}</span>
            </Button>
            <Button variant="secondary" className="d-flex align-items-center gap-1">
              <FaCaretUp /> <span>{isArabic ? 'نسخ الفاتورة' : 'Copy Invoice'}</span>
            </Button>
            <Button variant="danger" className="d-flex align-items-center gap-1">
              <FaTimes /> <span>{isArabic ? 'إلغاء' : 'Cancel'}</span>
            </Button>
          </div>
        </Col>

        <Col md={4} className={`text-md-end mt-3 mt-md-0 ${isArabic ? 'text-md-start' : 'text-md-end'}`}>
          <div className="d-flex justify-content-end mb-2">
            
          </div>
          <h5 className="fw-bold mb-1">{currentContent.title}</h5>
          <div>{currentContent.invoiceNo}</div>
          <div>{currentContent.reference}</div>
          <div className="fw-bold mt-2">{currentContent.grossAmount} <span className="text-success">$ 10.90</span></div>
        </Col>
      </Row>

      {/* Rest of your component with currentContent used for text */}
      {/* Customer Info */}
      <Row className="mb-4">
        <Col md={6}>
          <strong className="d-block mb-2">{currentContent.billTo}</strong>
          <div><strong className="text-primary">Haroun Spiers</strong></div>
          <div>4 Kings Park</div>
          <div>Zouparia do Monte, Portugal</div>
          <div>{isArabic ? 'هاتف: 489-737-5435' : 'Phone: 489-737-5435'}</div>
          <div>{isArabic ? 'بريد إلكتروني: hspiers2g@redcross.org' : 'Email: hspiers2g@redcross.org'}</div>
        </Col>
        <Col md={6} className={`${isArabic ? 'text-md-start' : 'text-md-end'} mt-4 mt-md-0`}>
          <div><strong>{currentContent.invoiceDate}</strong> 15-07-2025</div>
          <div><strong>{currentContent.dueDate}</strong> 15-07-2025</div>
          <div><strong>{currentContent.terms}</strong> {currentContent.paymentTerms}</div>
        </Col>
      </Row>

      {/* Item Table */}
      <div className="table-responsive mb-4">
        <Table bordered className="align-middle">
          <thead className="table-light">
            <tr>
              {currentContent.tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{isArabic ? 'منتج عينة' : 'Sample Product'}</td>
              <td>$ 10.00</td>
              <td>1</td>
              <td>$ 1.90 (19.00%)</td>
              <td>$ 1.00 (1.00 flat)</td>
              <td>$ 10.90</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Payment Summary */}
      <Row className="mb-4">
        <Col md={6}>
          <p><strong>{currentContent.paymentStatus}</strong> <Badge bg="success">{isArabic ? 'مدفوع' : 'Paid'}</Badge></p>
          <p><strong>{currentContent.paymentMethod}</strong> <u>{isArabic ? 'نقدي' : 'Cash'}</u></p>
          <p><strong>{currentContent.note}</strong></p>
        </Col>
        <Col md={6}>
          <div className="table-responsive">
            <Table borderless className={isArabic ? 'text-start' : 'text-end'}>
              <tbody>
                <tr><td>{currentContent.subTotal}</td><td>$ 10.00</td></tr>
                <tr><td>{currentContent.tax}</td><td>$ 1.90</td></tr>
                <tr><td>{currentContent.shipping}</td><td>$ 0.00</td></tr>
                <tr className="fw-bold border-top"><td>{currentContent.total}</td><td>$ 10.90</td></tr>
                <tr className="text-danger"><td>{currentContent.paymentReceived}</td><td>(-) $ 10.90</td></tr>
                <tr className="fw-bold border-top"><td>{currentContent.balanceDue}</td><td>$ 0.00</td></tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Signature */}
      <div className={isArabic ? 'text-start' : 'text-end'} style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <div>(John Doe)</div>
        <small>{currentContent.businessOwner}</small>
      </div>

      {/* Credit Transactions */}
      <h6 className="mb-3">{currentContent.creditTransactions}</h6>
      <div className="table-responsive mb-5">
        <Table bordered>
          <thead className="table-light">
            <tr>
              {currentContent.transactionHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={4} className="text-center">{currentContent.noTransactions}</td></tr>
          </tbody>
        </Table>
      </div>

      {/* Terms */}
      <h6>{currentContent.termsConditions}</h6>
      <p className="mb-1 fw-bold">{currentContent.paymentTerms}</p>
      <p className="mb-3">
        {currentContent.pricesPayment}<br />
        {currentContent.paymentDetails}
      </p>

      {/* Public Access */}
      <p className="text-muted small mb-4">
        {currentContent.publicAccess}<br />
        https://billing.ultimatekode.com/neo/billing/invoice?id=1045&token=XXXXXXX
      </p>

      {/* File Upload */}
      <div style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
        <label className="fw-bold d-block mb-2">{currentContent.attachments}</label>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <Button style={{backgroundColor:"#3daaaa", borderColor:"#3daaaa"}} size="sm">
            {currentContent.selectFiles}
          </Button>
          <input type="file" />
        </div>
        <small className="text-muted">{currentContent.allowedFiles}</small>
      </div>
    </div>
  );
};

export default ViewInvoicee;