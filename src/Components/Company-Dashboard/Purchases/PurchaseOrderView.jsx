import React, { useState } from "react";
import {
  FaEdit,
  FaMoneyBill,
  FaPaperPlane,
  FaPrint,
  FaGlobe,
  FaExchangeAlt,
  FaTimes,
  FaLanguage,
} from "react-icons/fa";
import { Button, Row, Col, Table, Badge } from "react-bootstrap";

const PurchaseOrderView = () => {
  const [language, setLanguage] = useState("en");

  const labels = {
    en: {
      edit: "Edit Order",
      payment: "Make Payment",
      send: "Send",
      print: "Print Order",
      preview: "Public Preview",
      status: "Change Status",
      cancel: "Cancel",
      switch: "Switch to Arabic",
      purchaseOrder: "Purchase Order",
      reference: "Reference",
      grossAmount: "Gross Amount",
      billFrom: "Bill From",
      orderDate: "Order Date",
      dueDate: "Due Date",
      terms: "Terms",
      paymentDue: "Payment Due On Receipt",
      description: "Description",
      rate: "Rate",
      qty: "Qty",
      tax: "Tax",
      discount: "Discount",
      amount: "Amount",
      paymentStatus: "Payment Status",
      paid: "Paid",
      paymentMethod: "Payment Method",
      note: "Note",
      subTotal: "Sub Total",
      shipping: "Shipping",
      total: "Total",
      paymentMade: "Payment Made",
      balanceDue: "Balance Due",
      signature: "(John Doe)",
      owner: "Business Owner",
      debit: "Debit Transactions:",
      noTransactions: "No transactions",
      termsHeading: "Terms & Condition",
      prices: "Prices And Payment:",
      termsBody:
        "Payments are to be made in U.S. funds. Unless otherwise specified, all invoices are due net 30 days from shipment date.",
      publicAccess: "Public Access URL:",
      files: "Files",
      selectFiles: "Select files...",
      allowed: "Allowed: gif, jpeg, png, docx, docs, txt, pdf, xls",
    },
    ar: {
      edit: "تعديل الطلب",
      payment: "إجراء الدفع",
      send: "إرسال",
      print: "طباعة الطلب",
      preview: "معاينة عامة",
      status: "تغيير الحالة",
      cancel: "إلغاء",
      switch: "التبديل إلى الإنجليزية",
      purchaseOrder: "أمر شراء",
      reference: "المرجع",
      grossAmount: "المبلغ الإجمالي",
      billFrom: "الفاتورة من",
      orderDate: "تاريخ الطلب",
      dueDate: "تاريخ الاستحقاق",
      terms: "الشروط",
      paymentDue: "الدفع عند الاستلام",
      description: "الوصف",
      rate: "السعر",
      qty: "الكمية",
      tax: "الضريبة",
      discount: "الخصم",
      amount: "المبلغ",
      paymentStatus: "حالة الدفع",
      paid: "مدفوع",
      paymentMethod: "طريقة الدفع",
      note: "ملاحظة",
      subTotal: "الإجمالي الفرعي",
      shipping: "الشحن",
      total: "الإجمالي",
      paymentMade: "تم الدفع",
      balanceDue: "الرصيد المستحق",
      signature: "(جون دو)",
      owner: "مالك النشاط التجاري",
      debit: "المعاملات المدينة:",
      noTransactions: "لا توجد معاملات",
      termsHeading: "الشروط والأحكام",
      prices: "الأسعار والدفع:",
      termsBody:
        "يجب أن تتم المدفوعات بالدولار الأمريكي. ما لم ينص على خلاف ذلك، فإن جميع الفواتير مستحقة خلال 30 يومًا من تاريخ الشحن.",
      publicAccess: "رابط الوصول العام:",
      files: "الملفات",
      selectFiles: "اختر الملفات...",
      allowed: "المسموح به: gif، jpeg، png، docx، docs، txt، pdf، xls",
    },
  };

  const current = labels[language];
  const isArabic = language === "ar";

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <div
      className={`mt-2 p-4 ${isArabic ? "text-end" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Action Bar */}
      <Row className="mb-4 align-items-start">
        <Col md={8}>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="outline-primary"
              onClick={toggleLanguage}
              className="d-flex align-items-center gap-1"
            >
              <FaLanguage /> <span>{isArabic ? "English" : "العربية"}</span>
            </Button>

            <Button
              variant="warning"
              className="d-flex align-items-center gap-1"
            >
              <FaEdit /> <span>{current.edit}</span>
            </Button>
            <Button
              variant="success"
              className="d-flex align-items-center gap-1"
            >
              <FaMoneyBill /> <span>{current.payment}</span>
            </Button>
            <Button
              variant="primary"
              className="d-flex align-items-center gap-1"
            >
              <FaPaperPlane /> <span>{current.send}</span>
            </Button>
            <Button
              variant="success"
              className="d-flex align-items-center gap-1"
            >
              <FaPrint /> <span>{current.print}</span>
            </Button>
            <Button variant="info" className="d-flex align-items-center gap-1">
              <FaGlobe /> <span>{current.preview}</span>
            </Button>
            <Button
              variant="secondary"
              className="d-flex align-items-center gap-1"
            >
              <FaExchangeAlt /> <span>{current.status}</span>
            </Button>
            <Button
              variant="danger"
              className="d-flex align-items-center gap-1"
            >
              <FaTimes /> <span>{current.cancel}</span>
            </Button>
          </div>
        </Col>

        <Col
          md={4}
          className={`mt-3 mt-md-0 ${isArabic ? "text-start" : "text-md-end"}`}
        >
          <h5 className="fw-bold mb-1">{current.purchaseOrder}</h5>
          <div>PO#1045</div>
          <div>{current.reference}:</div>
          <div className="fw-bold mt-2">
            {current.grossAmount}: <span className="text-success">$ 10.90</span>
          </div>
        </Col>
      </Row>

      {/* Supplier and Order Info */}
      <Row className="mb-4">
        <Col md={6}>
          <strong className="d-block mb-2">{current.billFrom}</strong>
          <div>
            <strong className="text-primary">Haroun Spiers</strong>
          </div>
          <div>4 Kings Park</div>
          <div>Zouparia do Monte, Portugal</div>
          <div>{isArabic ? "هاتف: 489-737-5435" : "Phone: 489-737-5435"}</div>
          <div>
            {isArabic
              ? "بريد إلكتروني: hspiers2g@redcross.org"
              : "Email: hspiers2g@redcross.org"}
          </div>
        </Col>
        <Col
          md={6}
          className={
            isArabic ? "text-start mt-4 mt-md-0" : "text-md-end mt-4 mt-md-0"
          }
        >
          <div>
            <strong>{current.orderDate}:</strong> 15-07-2025
          </div>
          <div>
            <strong>{current.dueDate}:</strong> 15-07-2025
          </div>
          <div>
            <strong>{current.terms}:</strong> {current.paymentDue}
          </div>
        </Col>
      </Row>

      {/* Order Items Table */}
      <div className="table-responsive mb-4">
        <Table bordered className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>{current.description}</th>
              <th>{current.rate}</th>
              <th>{current.qty}</th>
              <th>{current.tax}</th>
              <th>{current.discount}</th>
              <th>{current.amount}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{isArabic ? "منتج عينة" : "Sample Product"}</td>
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
          <p>
            <strong>{current.paymentStatus}:</strong>{" "}
            <Badge bg="success">{current.paid}</Badge>
          </p>
          <p>
            <strong>{current.paymentMethod}:</strong>{" "}
            <u>{isArabic ? "نقدي" : "Cash"}</u>
          </p>
          <p>
            <strong>{current.note}:</strong>
          </p>
        </Col>
        <Col md={6}>
          <div className="table-responsive">
            <Table borderless className={isArabic ? "text-start" : "text-end"}>
              <tbody>
                <tr>
                  <td>{current.subTotal}</td>
                  <td>$ 10.00</td>
                </tr>
                <tr>
                  <td>{current.tax}</td>
                  <td>$ 1.90</td>
                </tr>
                <tr>
                  <td>{current.shipping}</td>
                  <td>$ 0.00</td>
                </tr>
                <tr className="fw-bold border-top">
                  <td>{current.total}</td>
                  <td>$ 10.90</td>
                </tr>
                <tr className="text-danger">
                  <td>{current.paymentMade}</td>
                  <td>(-) $ 10.90</td>
                </tr>
                <tr className="fw-bold border-top">
                  <td>{current.balanceDue}</td>
                  <td>$ 0.00</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>

      {/* Signature Section */}
      <div
        className={isArabic ? "text-start" : "text-end"}
        style={{ marginTop: "3rem", marginBottom: "3rem" }}
      >
        <img src="/path-to-signature.png" alt="signature" height="40" />
        <div>{current.signature}</div>
        <small>{current.owner}</small>
      </div>

      {/* Debit Transactions */}
      <h6 className="mb-3">{current.debit}</h6>
      <div className="table-responsive mb-5">
        <Table bordered>
          <thead className="table-light">
            <tr>
              <th>{current.orderDate}</th>
              <th>{current.paymentMethod}</th>
              <th>{current.amount}</th>
              <th>{current.note}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                {current.noTransactions}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Terms and Conditions */}
      <h6>{current.termsHeading}</h6>
      <p className="mb-1 fw-bold">{current.paymentDue}</p>
      <p className="mb-3">
        1. <strong>{current.prices}</strong>
        <br />
        {current.termsBody}
      </p>

      {/* Public Access URL */}
      <p className="text-muted small mb-4">
        {current.publicAccess}
        <br />
        https://billing.ultimatekode.com/neo/billing/purchase?id=1045&token=XXXXXXX
      </p>

      {/* File Upload Section */}
      <div style={{ marginTop: "1.5rem", marginBottom: "3rem" }}>
        <label className="fw-bold d-block mb-2">{current.files}</label>
        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <Button
            style={{ backgroundColor: "#3daaaa", borderColor: "#3daaaa" }}
            size="sm"
          >
            {current.selectFiles}
          </Button>
          <input type="file" />
        </div>
        <small className="text-muted">{current.allowed}</small>
      </div>
    </div>
  );
};

export default PurchaseOrderView;

