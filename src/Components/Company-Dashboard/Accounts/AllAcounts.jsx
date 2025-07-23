import React from "react";
import { Table, Container, Card } from "react-bootstrap";

const accountData = [
  {
    type: "Cash-in-hand",
    rows: [{ name: "Cash", bal: "0.00" }],
  },
  {
    type: "Bank A/Cs",
    rows: [{ name: "Bank", bal: "0.00" }],
  },
  {
    type: "Sundry Debtors",
    rows: [
      { name: "Customer A", bal: "0.00" },
      { name: "Customer B", bal: "0.00" },
    ],
  },
  {
    type: "Sundry Creditors",
    rows: [
      { name: "Supplier A", bal: "0.00" },
      { name: "Supplier B", bal: "0.00" },
    ],
  },
  {
    type: "Purchases A/C",
    rows: [{ name: "Purchase", bal: "0.00" }],
  },
  {
    type: "Purchases Return",
    rows: [{ name: "Purchases Return", bal: "0.00" }],
  },
  {
    type: "Sales A/C",
    rows: [{ name: "Sales", bal: "0.00" }],
  },
  {
    type: "Sales Return",
    rows: [{ name: "Sales Return", bal: "0.00" }],
  },
  {
    type: "Capital A/C",
    rows: [
      { name: "Capital", bal: "0.00" },
      { name: "Profit & Loss A/c", bal: "0.00" },
    ],
  },
  {
    type: "Direct Expenses",
    rows: [
      { name: "Cartage", bal: "0.00" },
      { name: "Discount On Sale", bal: "0.00" },
      { name: "Discount given", bal: "0.00" },
    ],
  },
  {
    type: "Indirect Expenses",
    rows: [{ name: "Advertisement expenses", bal: "0.00" }],
  },
];

const AllAccounts = () => {
  return (
    <Container fluid className="py-4">
                  <h4 className="text-start fw-bold mb-3">All Accounts</h4>
      <Card className="">
        <Card.Body>

          <div className="table-responsive">
            <Table bordered hover className="text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th className="text-start">Account Type</th>
                  <th className="text-start">Acc Name</th>
                  <th>Acc Bal</th>
                  <th>Total Bal</th>
                </tr>
              </thead>
              <tbody>
                {accountData.map((group, i) =>
                  group.rows.map((row, j) => (
                    <tr key={`${i}-${j}`}>
                      {j === 0 && (
                        <td rowSpan={group.rows.length} className="fw-semibold text-start bg-light">
                          {group.type}
                        </td>
                      )}
                      <td className="text-start">{row.name}</td>
                      <td>{row.bal}</td>
                      <td>{row.bal}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AllAccounts;
