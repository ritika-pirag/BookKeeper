import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";


import Dashboardd from "./Components/Dashboard/Dashboardd";
import Company from "./Components/Dashboard/Company";
// import CompanyDetails from './Components/Dashboard/CompanyDetails';
import PlansPricing from "./Components/Dashboard/PlansPricing";
import RequestPlan from "./Components/Dashboard/RequestPlan";
import Payments from "./Components/Dashboard/Payments";
import SystemSettings from "./Components/Dashboard/SystemSettings";
import CompanyDashbaord from "./Components/Company-Dashboard/CompanyDashbaord";
// import ProductDetails from "./Components/Company-Dashboard/Inventory/ProductDetails";
import BatchExpiry from "./Components/Company-Dashboard/Inventory/BatchExpiry";
import Inventorys from "./Components/Company-Dashboard/Inventory/Inventorys";
import UnitofMeasure from "./Components/Company-Dashboard/Inventory/UnitofMeasure";
import LowStock from "./Components/Company-Dashboard/Inventory/LowStock";
import PrintBarcode from "./Components/Company-Dashboard/Inventory/printBarcode";
import Invoice from "./Components/Company-Dashboard/Sales/Invoice";
import InvoiceForm from "./Components/Company-Dashboard/Sales/InvoiceForm";
import AccountStatement from "./Components/Company-Dashboard/Payments/AccountStatement";
import Coupons from "./Components/Company-Dashboard/Payments/Coupons";
import TaxReport from "./Components/Company-Dashboard/GST/TaxReport ";
import Customer from "./Components/Company-Dashboard/Sales/Customer";
// import QRInvoice from "./Components/Company-Dashboard/GST/QRInvoice";
import GSTReturns from "./Components/Company-Dashboard/GST/GSTReturns";
import TdsTcs from "./Components/Company-Dashboard/GST/TdsTcs";
import ITCReport from "./Components/Company-Dashboard/GST/ITCReport";
import EWayBill from "./Components/Company-Dashboard/GST/EWayBill";

import Vendors from "./Components/Company-Dashboard/Purchases/Vendors";
import PurchaseReturn from "./Components/Company-Dashboard/Purchases/PurchaseReturn";
import DayBook from "./Components/Company-Dashboard/Finance&Accounts/DayBook";
import Expense from "./Components/Company-Dashboard/Finance&Accounts/Expense";
import JournalEntries from "./Components/Company-Dashboard/Finance&Accounts/JournalEntries";
import Ledger from "./Components/Company-Dashboard/Finance&Accounts/Ledger";
import TrialBalance from "./Components/Company-Dashboard/Finance&Accounts/TrialBalance";
import CustomerList from "./Components/Company-Dashboard/ClientsVendors/CustomerList";
// import Purchasedataa from "./Components/Company-Dashboard/Reports/Purchasedata";
// import salesreport from "./Components/Company-Dashboard/Reports/Salesreport";
// import NewOrderPurchase from "./Components/Company-Dashboard/Purchases/NewOrderPurchase";
import CreateVoucher from "./Components/Company-Dashboard/Inventory/CreateVoucher";
import Taxreport from "./Components/Company-Dashboard/Reports/Taxreports";
import InventorySummary from "./Components/Company-Dashboard/Reports/InventorySummary";
import VatReport from "./Components/Company-Dashboard/Reports/VatReport"
import BalanceSheet from "./Components/Company-Dashboard/Reports/BalanceSheet";
import CashFlow from "./Components/Company-Dashboard/Reports/CashFlow";
import ProfitLoss from "./Components/Company-Dashboard/Reports/ProfitLoss";
import Users from "./Components/Company-Dashboard/UserManagement/Users";
import RolesPermissions from "./Components/Company-Dashboard/UserManagement/RolesPermissions";
import DeleteAccountRequest from "./Components/Company-Dashboard/UserManagement/DeleteAccountRequest";
import CompanyInfo from "./Components/Company-Dashboard/Settings/CompanyInfo";
import LanguageSetting from "./Components/Company-Dashboard/Settings/LanguageSetting";
import UserDashboard from "./Components/User-Dashboard/UserDashboard";
import Productts from "./Components/User-Dashboard/Inventory/Product";
import ManageProduct from "./Components/User-Dashboard/Inventory/MangeProduct";

import Invoices from "./Components/User-Dashboard/Sales/Invoices";
import Pos from "./Components/User-Dashboard/Sales/Pos";
import PurchaseOrder from "./Components/User-Dashboard/Purchases/PurchaseOrder";
import PurchaseView from "./Components/User-Dashboard/Purchases/PurchaseView";


import TaxData  from "./Components/User-Dashboard/GST/TaxData";
import  ITCData  from "./Components/User-Dashboard/GST/ITCData";
import GSTData  from "./Components/User-Dashboard/GST/GSTData";
import Tds  from "./Components/User-Dashboard/GST/Tds";
import EWay  from "./Components/User-Dashboard/GST/EWay";

import InvoiceForms from "./Components/User-Dashboard/Sales/InvoiceForms";

import Cashflow from "./Components/User-Dashboard/Account&Finance/Cashflow";
import Accountstatement from "./Components/User-Dashboard/Account&Finance/Accountstatement";
import Salesreport from "./Components/User-Dashboard/Reports/Salesreport";
import Purchasereport from "./Components/User-Dashboard/Reports/Purchasereport";
import Inventory from "./Components/User-Dashboard/Reports/Inventory";
import Invoicereport from "./Components/User-Dashboard/Reports/Invoicereport";
import Taxreports from "./Components/User-Dashboard/Reports/Taxreports";
import Balancesheet from "./Components/User-Dashboard/Account&Finance/BalanceSheet";

import DeliveryChallans from "./Components/User-Dashboard/Sales/DeliveryChallans";
import Estimates from "./Components/User-Dashboard/Sales/Estimates";
import OnlineOrder from "./Components/User-Dashboard/Sales/OnlineOrder";
// import PosOrder from "./Components/User-Dashboard/Sales/PosOrder";
import PaymentMode from "./Components/User-Dashboard/Purchases/PaymentMode";
import Invoicee from "./Components/User-Dashboard/Purchases/Invoicee";
import Expenses from "./Components/User-Dashboard/Purchases/Expenses";
// import PurchaseData from "./Components/User-Dashboard/Reports/Purchasereport";


import WareHouses from "./Components/User-Dashboard/Inventory/SiteData/WareHouses";

import BrandPages from "./Components/User-Dashboard/Inventory/SiteData/BrandPages";


import Product from "./Components/User-Dashboard/Inventory/Product";
// import AddProducts from "./Components/User-Dashboard/Inventory/Product/AddProduct";
import  DevicePages from "./Components/User-Dashboard/Inventory/SiteData/DevicePages";
// import TaxPages from "./Components/User-Dashboard/Inventory/SiteData/TaxPage";
import StockTransferss from "./Components/User-Dashboard/Inventory/SiteData/StockTransfers";

// import PointOfSales from "./Components/Company-Dashboard/Inventory/Pos/PointOfSale";
// import InvoiceSummarys from "./Components/Company-Dashboard/Inventory/Pos/InvoiceSummary";
// import ManageInvoicess from "./Components/Company-Dashboard/Inventory/Pos/ManageInvoice";
// import ViewInvoices from "./Components/Company-Dashboard/Inventory/Pos/ViewInvoice";
// import EditInvoices from "./Components/Company-Dashboard/Inventory/Pos/EditInvoice";-









import WareHouse from "./Components/Company-Dashboard/Inventory/SiteData/WareHouse";
// import Categories from "./Components/Company-Dashboard/Inventory/SiteData/Categories";

import BrandPage from "./Components/Company-Dashboard/Inventory/SiteData/BrandPage";

import Productt from "./Components/Company-Dashboard/Inventory/Productt";
import AddProduct from "./Components/Company-Dashboard/Inventory/Product/AddProduct";
import DevicePage from "./Components/Company-Dashboard/Inventory/SiteData/DevicePage";
import TaxPage from "./Components/Company-Dashboard/Inventory/SiteData/TaxPage";
import StockTransfer from "./Components/Company-Dashboard/Inventory/SiteData/StockTransfer";
import PointOfSale from "./Components/Company-Dashboard/Inventory/Pos/PointOfSale";
import InvoiceSummary from "./Components/Company-Dashboard/Inventory/Pos/InvoiceSummary";
import ManageInvoices from "./Components/Company-Dashboard/Inventory/Pos/ManageInvoice";
import ViewInvoice from "./Components/Company-Dashboard/Inventory/Pos/ViewInvoice";
import EditInvoice from "./Components/Company-Dashboard/Inventory/Pos/EditInvoice";
import Profile from "./Layout/ProfileModal";
import PurchaseOrderView from "./Components/Company-Dashboard/Purchases/PurchaseOrderView";
import ViewInvoicee from "./Components/Company-Dashboard/Sales/ViewInvoicee";

import Categories from "./Components/Company-Dashboard/Inventory/SiteData/Categories";
import AddCustomer from "./Components/Company-Dashboard/Inventory/Customer/AddCustomer";
import PurchasOrder from "./Components/Company-Dashboard/Purchases/PurchasOrder";
import Bill from "./Components/Company-Dashboard/Purchases/Bill";
import AllAcounts from "./Components/Company-Dashboard/Accounts/AllAcounts";
import CustomersDebtors from "./Components/Company-Dashboard/Accounts/CustomersDebtors";
import VendorsCreditors from "./Components/Company-Dashboard/Accounts/VendorsCreditors";
import PurchaseVoucher from "./Components/Company-Dashboard/Inventory/PurchaseVoucher";
import SalesVoucher from "./Components/Company-Dashboard/Inventory/SalesVoucher";
import PurchaseVoucherView from "./Components/Company-Dashboard/Inventory/PurchaseVoucherView";
import SalesVoucherView from "./Components/Company-Dashboard/Inventory/SalesVoucherView";
// import CreateVoucher from "./Components/Company-Dashboard/Inventory/CreateVoucher";




function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes without sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
   
        {/* Admin Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboardd />} />
          <Route path="/superadmin/company" element={<Company />} />
          {/* <Route path="/superadmin/companydetails" element={<CompanyDetails />} /> */}
          <Route path="/superadmin/planpricing" element={<PlansPricing />} />
          <Route path="/superadmin/requestplan" element={<RequestPlan />} />
          <Route path="/superadmin/payments" element={<Payments />} />
          <Route path="/superadmin/setting" element={<SystemSettings />} />
        </Route>

        {/* Company Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Admin Dashboard */}
          <Route path="/company/dashboard" element={<CompanyDashbaord />} />
{/* Accounts */}
<Route path="/company/allacounts" element={<AllAcounts/>} />
<Route path="/company/customersdebtors" element={<CustomersDebtors/>} />
<Route path="/company/vendorscreditors" element={<VendorsCreditors/>} />


          {/* Inventory */}
          {/* <Route path="/company/productdetails" element={<ProductDetails />} /> */}
          {/* <Route path="/company/batchandexpriry" element={<BatchExpiry />} /> */}
          <Route path="/company/inventorys" element={<Inventorys/>} />
          <Route path="/company/unitofmeasure" element={<UnitofMeasure/>} />
          <Route path="/company/salesvoucher" element={<SalesVoucher/>} />
          <Route path="/company/purchasevoucher" element={<PurchaseVoucher/>} />
          <Route path="/company/purchasevoucherview" element={<PurchaseVoucherView/>} />
          <Route path="/company/salesvoucherview" element={<SalesVoucherView/>} />
          {/* <Route path="/company/lowstock" element={<LowStock />} /> */}
          {/* <Route path="/company/printbarcode" element={<PrintBarcode />} /> */}
          <Route path="/company/createvoucher" element={<CreateVoucher/>} />

          <Route path="/company/warehouse" element={<WareHouse />} />
          <Route path="/company/stocktranfer" element={<StockTransfer />} />
          <Route path="/company/categories" element={<Categories/>} />
          <Route path="/company/brands" element={<BrandPage />} />
          <Route path="/company/product" element={<Productt />} />
          <Route path="/company/createproduct" element={<AddProduct/>} />
          <Route path="/company/update-product/:id" element={<AddProduct/>} />
          <Route path="/company/device" element={<DevicePage />} />
          <Route path="/company/tax" element={<TaxPage/>} />
          <Route path="/company/ponitofsale" element={<PointOfSale />} />
          <Route path="/company/invoice-summary" element={<InvoiceSummary/>} />
          <Route path="/company/addcustomer" element={<AddCustomer/>} />
          {/* Sales */}
          <Route path="/company/invoice" element={<Invoice />} />
          <Route path="/company/manageinvoice" element={<ManageInvoices/>} />
          <Route path="/company/editinvoice" element={<EditInvoice/>} />
          <Route path="/company/viewinvoice" element={<ViewInvoice/>} />
          <Route path="/company/customer" element={<Customer/>} />
        
          {/* Sales */}
          <Route path="/company/invoiceform" element={<InvoiceForm />} />
          <Route path="/company/viewinvoicee" element={<ViewInvoicee/>} />
         

          {/* Payments */}
          <Route path="/company/coupons" element={<Coupons />} />
          <Route
            path="/company/accountstatement"
            element={<AccountStatement />}
          />

          {/* GST Filing */}
          <Route path="/company/taxreport" element={<TaxReport />} />
          {/* <Route path="/company/qrinvoice" element={<QRInvoice />} /> */}
          <Route path="/company/gstreturns" element={<GSTReturns />} />
          <Route path="/company/tdstcs" element={<TdsTcs />} />
          <Route path="/company/itcreport" element={<ITCReport />} />
          <Route path="/company/ewaybill" element={<EWayBill />} />

          {/* Purchases */}
          <Route path="/company/vendors" element={<Vendors />} />
          
          {/* <Route path="/company/neworders" element={<NewOrderPurchase />} /> */}
          <Route path="/company/bill" element={<Bill/>} />
          <Route path="/company/purchasorder" element={<PurchasOrder/>} />
          <Route path="/company/purchasereturn" element={<PurchaseReturn />} />
          <Route path="/company/purchaseview" element={<PurchaseOrderView/>} />
          {/* Finance & Accounts */}
          <Route path="/company/daybook" element={<DayBook />} />

          <Route path="/company/expense" element={<Expense />} />
          <Route path="/company/journalentries" element={<JournalEntries />} />
          <Route path="/company/ledger" element={<Ledger />} />
          <Route path="/company/trialbalance" element={<TrialBalance />} />

          {/* Clients / Vendors */}
          <Route path="/company/customers" element={<CustomerList />} />

          {/* Reports */}
          {/* <Route path="/company/Purchasedata" element={<Purchasedata/>} /> */}
          <Route path="/company/salesreport" element={<Salesreport />} />
          <Route path="/company/taxreport" element={<Taxreport />} />
          <Route path="/company/inventorysummary" element={<InventorySummary/>} />
          <Route path="/company/balancesheet" element={<BalanceSheet />} />
          <Route path="/company/cashflow" element={<CashFlow />} />
          <Route path="/company/profitloss" element={<ProfitLoss />} />
          <Route path="/company/vatreport" element={<VatReport />} />

          {/* User Management */}
          <Route path="/company/users" element={<Users />} />
          <Route
            path="/company/rolespermissions"
            element={<RolesPermissions />}
          />
          <Route
            path="/company/deleteaccountrequests"
            element={<DeleteAccountRequest />}
          />

          {/* Settings */}
          <Route path="/company/companyinfo" element={<CompanyInfo />} />
          <Route path="/company/languages" element={<LanguageSetting />} />
        </Route>

        {/* User Dashboard routes with MainLayout */}
        <Route element={<MainLayout />}>
          {/* Dashboard */}
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* Inventory */}
          <Route path="/user/product" element={<Productts />} />
          <Route path="/user/manageproduct" element={<ManageProduct />} />
          <Route path="/user/warehouse" element={<WareHouses/>} />
          <Route path="/user/stocktranfer" element={<StockTransferss/>} />
          <Route path="/user/categories" element={<Categories/>} />
          <Route path="/user/BrandPages" element={<BrandPages/>} />

          {/* Sales */}

          <Route path="/user/invoices" element={<Invoices />} />
          <Route path="/user/invoiceforms" element={<InvoiceForms />} />
          <Route path="/user/pos" element={<Pos />} />
          <Route path="/user/onlineorders" element={<OnlineOrder />} />
          {/* <Route path="/user/posorders" element={<PosOrder/>} /> */}
          <Route path="/user/estimates" element={<Estimates />} />
          <Route path="/user/deliverychallans" element={<DeliveryChallans />} />

          {/* Purchases */}

          <Route path="/user/purchaseorder" element={<PurchaseOrder />} />
          <Route path="/user/expense" element={<Expenses />} />
          <Route path="/user/paymentmode" element={<PaymentMode />} />
          <Route path="/user/invoice" element={<Invoicee />} />
          <Route path="/user/purchaseviews" element={<PurchaseView/>} />
          <Route path="/user/device" element={<DevicePages />} />
          <Route path="/user/product" element={<Product/>} />
          {/* GST  */}
          <Route path="/user/taxdata" element={<TaxData />} />
           <Route path="/user/gstdata" element={<GSTData />} />
         <Route path="/user/tds" element={<Tds />} /> 
          <Route path="/user/itcdata" element={<ITCData/>} />  
          <Route path="/user/eway" element={<EWay />} />


          {/* Finance & Accounts */}
          <Route path="/user/daybook" element={<DayBook />} />
          <Route path="/user/balancesheet" element={<Balancesheet />} />
          <Route path="/user/cashflow" element={<Cashflow />} />
          <Route path="/user/accountstatement" element={<Accountstatement />} />
     


          {/* Reports */}
          <Route path="/user/salesreport" element={<Salesreport />} />
          <Route path="/user/purchasereport" element={<Purchasereport />} />
          <Route path="/user/inventoryreport" element={<Inventory />} />
          <Route path="/user/invoicereport" element={<Invoicereport />} />
          <Route path="/user/taxreport" element={<Taxreports />} />
       
          {/* <Route path="/user/eway" element={<Eway />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;