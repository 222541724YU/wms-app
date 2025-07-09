"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export default function WMSScreen() {
  const [language, setLanguage] = useState("en");
  const [inventory, setInventory] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ sku: "", quantity: "", customer: "" });
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  const t = (en, zh) => (language === "en" ? en : zh);

  const handleAddInventory = () => {
    const existing = inventory.find((item) => item.sku === form.sku);
    if (existing) {
      existing.quantity += parseInt(form.quantity);
      setInventory([...inventory]);
    } else {
      setInventory([...inventory, { sku: form.sku, quantity: parseInt(form.quantity) }]);
    }
    setForm({ ...form, sku: "", quantity: "" });
  };

  const handleShipOrder = () => {
    const item = inventory.find((item) => item.sku === form.sku);
    if (item && item.quantity >= parseInt(form.quantity)) {
      item.quantity -= parseInt(form.quantity);
      setInventory([...inventory]);
    }
    setForm({ ...form, sku: "", quantity: "" });
  };

  const handleAddCustomer = () => {
    if (!customers.includes(form.customer)) {
      setCustomers([...customers, form.customer]);
    }
    setForm({ ...form, customer: "" });
  };

  useEffect(() => {
    if (scanning && window.Html5Qrcode) {
      const html5QrCode = new window.Html5Qrcode("reader");
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setForm((f) => ({ ...f, sku: decodedText }));
          html5QrCode.stop().then(() => setScanning(false));
        },
        (error) => {}
      );
    }
  }, [scanning]);

  return (
    <div className="p-4">
      <script src="https://unpkg.com/html5-qrcode"></script>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{t("Warehouse System", "仓库系统")}</h1>
        <Button onClick={() => setLanguage(language === "en" ? "zh" : "en")}>{t("中文", "English")}</Button>
      </div>

      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">{t("Inventory", "库存")}</TabsTrigger>
          <TabsTrigger value="inbound">{t("Inbound", "入库")}</TabsTrigger>
          <TabsTrigger value="outbound">{t("Outbound", "出货")}</TabsTrigger>
          <TabsTrigger value="customers">{t("Customers", "客户")}</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card><CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("SKU", "货号")}</TableHead>
                  <TableHead>{t("Quantity", "数量")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="inbound">
          <Card><CardContent className="space-y-4">
            <Label>{t("SKU", "货号")}</Label>
            <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <Button onClick={() => setScanning(true)}>{t("Scan Barcode", "扫码")}</Button>
            <div id="reader" className="mt-2" style={{ width: "100%" }}></div>
            <Label>{t("Quantity", "数量")}</Label>
            <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <Button onClick={handleAddInventory}>{t("Add Inventory", "添加库存")}</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="outbound">
          <Card><CardContent className="space-y-4">
            <Label>{t("SKU", "货号")}</Label>
            <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <Button onClick={() => setScanning(true)}>{t("Scan Barcode", "扫码")}</Button>
            <div id="reader" className="mt-2" style={{ width: "100%" }}></div>
            <Label>{t("Quantity", "数量")}</Label>
            <Input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <Button onClick={handleShipOrder}>{t("Ship Order", "出货")}</Button>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card><CardContent className="space-y-4">
            <Label>{t("Customer Name", "客户名称")}</Label>
            <Input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
            <Button onClick={handleAddCustomer}>{t("Add Customer", "添加客户")}</Button>
            <ul className="mt-4 list-disc list-inside">
              {customers.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
