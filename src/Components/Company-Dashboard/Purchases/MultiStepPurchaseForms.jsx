import React, { useState, useRef } from 'react';
import { Tabs, Tab, Form, Button, Table, Row, Col } from 'react-bootstrap';
import html2pdf from 'html2pdf.js';

const detectInitialStep = (data) => {
    if (!data) return 'quotation';
    if (data.payment?.amount) return 'payment';
    if (data.invoice?.invoiceNo) return 'invoice';
    if (data.purchaseOrder?.orderNo) return 'purchaseOrder';
    return 'quotation';
};

const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => {
        return total + (parseFloat(item.qty) * parseFloat(item.rate) || 0);
    }, 0).toFixed(2);
};

const MultiStepPurchaseForms = ({ onSubmit, initialData, initialStep }) => {
    const [key, setKey] = useState(initialStep || detectInitialStep(initialData));
    const formRef = useRef();

    const [formData, setFormData] = useState(() => ({
        quotation: {
            quotationNo: initialData?.quotation?.quotationNo || '',
            vendor: initialData?.quotation?.vendor || '',
            items: initialData?.quotation?.items || [{ name: '', qty: '', rate: '' }],
        },
        purchaseOrder: {
            quotationNo: initialData?.purchaseOrder?.quotationNo || '',
            orderNo: initialData?.purchaseOrder?.orderNo || '',
            deliveryDate: initialData?.purchaseOrder?.deliveryDate || '',
            items: initialData?.purchaseOrder?.items || [{ name: '', qty: '', rate: '' }],
        },
        invoice: {
            orderNo: initialData?.invoice?.orderNo || '',
            invoiceNo: initialData?.invoice?.invoiceNo || '',
            invoiceDate: initialData?.invoice?.invoiceDate || '',
            items: initialData?.invoice?.items || [{ name: '', qty: '', rate: '' }],
        },
        payment: {
            invoiceNo: initialData?.payment?.invoiceNo || '',
            paymentDate: initialData?.payment?.paymentDate || '',
            amount: initialData?.payment?.amount || '',
        },
    }));

    const handleChange = (tab, field, value) => {
        setFormData(prev => ({
            ...prev,
            [tab]: { ...prev[tab], [field]: value },
        }));
    };

    const handleItemChange = (tab, index, field, value) => {
        const updatedItems = [...formData[tab].items];
        updatedItems[index][field] = value;
        setFormData(prev => ({
            ...prev,
            [tab]: { ...prev[tab], items: updatedItems },
        }));
    };

    const addItem = (tab) => {
        setFormData(prev => ({
            ...prev,
            [tab]: {
                ...prev[tab],
                items: [...prev[tab].items, { name: '', qty: '', rate: '' }],
            },
        }));
    };

    const removeItem = (tab, index) => {
        const updatedItems = [...formData[tab].items];
        updatedItems.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            [tab]: { ...prev[tab], items: updatedItems },
        }));
    };

    const handleDownloadPDF = () => {
        const element = formRef.current;
        html2pdf().from(element).save('purchase-form.pdf');
    };

    const handleSaveDraft = () => {
        onSubmit(formData, key);
    };

    const handleFinalSubmit = () => {
        onSubmit(formData, 'payment');
    };

    const renderItemsTable = (tab) => (
        <Table striped bordered>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {formData[tab].items.map((item, idx) => (
                    <tr key={idx}>
                        <td>
                            <Form.Control
                                type="text"
                                value={item.name}
                                onChange={(e) => handleItemChange(tab, idx, 'name', e.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                value={item.qty}
                                onChange={(e) => handleItemChange(tab, idx, 'qty', e.target.value)}
                            />
                        </td>
                        <td>
                            <Form.Control
                                type="number"
                                value={item.rate}
                                onChange={(e) => handleItemChange(tab, idx, 'rate', e.target.value)}
                            />
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => removeItem(tab, idx)} size="sm">
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="4" className="text-end">
                        <Button size="sm" onClick={() => addItem(tab)}  
                            style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
                        >+ Add Product</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    );

    return (
        <div className="container mt-4" ref={formRef}>
            <h4 className="text-center mb-4">Purchase Process</h4>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
                {/* QUOTATION */}
                <Tab eventKey="quotation" title="Quotation">
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Quotation No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.quotation.quotationNo}
                                        onChange={(e) => handleChange('quotation', 'quotationNo', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Vendor</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.quotation.vendor}
                                        onChange={(e) => handleChange('quotation', 'vendor', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {renderItemsTable('quotation')}
                        <div className="d-flex justify-content-between mt-3">
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        purchaseOrder: {
                                            ...prev.purchaseOrder,
                                            quotationNo: prev.quotation.quotationNo,
                                        },
                                    }));
                                    setKey('purchaseOrder');
                                }}
                            >
                                Save & Next
                            </Button>
                            <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
                        </div>
                    </Form>
                </Tab>

                {/* PURCHASE ORDER */}
                <Tab eventKey="purchaseOrder" title="Purchase Order">
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Linked Quotation No</Form.Label>
                                    <Form.Control type="text" value={formData.purchaseOrder.quotationNo} readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Order No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.purchaseOrder.orderNo}
                                        onChange={(e) => handleChange('purchaseOrder', 'orderNo', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mt-2">
                                <Form.Group>
                                    <Form.Label>Delivery Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.purchaseOrder.deliveryDate}
                                        onChange={(e) => handleChange('purchaseOrder', 'deliveryDate', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {renderItemsTable('purchaseOrder')}
                        <div className="d-flex justify-content-between mt-2">
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        invoice: {
                                            ...prev.invoice,
                                            orderNo: prev.purchaseOrder.orderNo,
                                        },
                                    }));
                                    setKey('invoice');
                                }}
                            >
                                Save & Next
                            </Button>
                            <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
                        </div>
                    </Form>
                </Tab>

                {/* INVOICE */}
                <Tab eventKey="invoice" title="Invoice">
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Linked Order No</Form.Label>
                                    <Form.Control type="text" value={formData.invoice.orderNo} readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Invoice No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={formData.invoice.invoiceNo}
                                        onChange={(e) => handleChange('invoice', 'invoiceNo', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mt-2">
                                <Form.Group>
                                    <Form.Label>Invoice Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.invoice.invoiceDate}
                                        onChange={(e) => handleChange('invoice', 'invoiceDate', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {renderItemsTable('invoice')}
                        <div className="d-flex justify-content-between mt-2">
                            <Button
                                variant="outline-secondary"
                                onClick={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        payment: {
                                            ...prev.payment,
                                            invoiceNo: prev.invoice.invoiceNo,
                                        },
                                    }));
                                    setKey('payment');
                                }}
                            >
                                Save & Next
                            </Button>
                            <Button variant="warning" onClick={handleSaveDraft}>Save Draft</Button>
                        </div>
                    </Form>
                </Tab>

                {/* PAYMENT */}
                <Tab eventKey="payment" title="Payment">
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Linked Invoice No</Form.Label>
                                    <Form.Control type="text" value={formData.payment.invoiceNo} readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Total Amount</Form.Label>
                                    <Form.Control type="text" value={`₹ ${calculateTotalAmount(formData.invoice.items)}`} readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Payment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={formData.payment.paymentDate}
                                        onChange={(e) => handleChange('payment', 'paymentDate', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Amount Paid</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.payment.amount}
                                        onChange={(e) => handleChange('payment', 'amount', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-between mt-2">
                            <Button variant="success" onClick={handleFinalSubmit}>Submit</Button>
                            <Button variant="primary" onClick={handleDownloadPDF}
                                style={{ backgroundColor: "#53b2a5", border: "none", padding: "8px 16px" }}
                            >Download PDF</Button>
                        </div>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
};

export default MultiStepPurchaseForms;
