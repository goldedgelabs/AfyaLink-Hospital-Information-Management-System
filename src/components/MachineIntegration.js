// src/components/MachineIntegration.js
"use client";
import { useState } from "react";

/**
 * MachineIntegration - placeholder for:
 * - connecting to imaging hardware via WebUSB/WebSerial (not implemented here)
 * - sending images to printers
 *
 * This provides the hooks and UI so backend/hardware teams can replace the mock
 * functions with real device code later.
 */

export default function MachineIntegration() {
  const [xrayConnected, setXrayConnected] = useState(false);
  const [printerConnected, setPrinterConnected] = useState(false);
  const [lastAction, setLastAction] = useState("");

  async function connectXrayMock() {
    // Real implementation: navigator.usb.requestDevice(...) / WebSocket to PACS
    setXrayConnected(true);
    setLastAction("Connected to X-ray (mock).");
  }

  async function connectPrinterMock() {
    // Real implementation: navigator.usb or IPP or send to server that has printer access.
    setPrinterConnected(true);
    setLastAction("Connected to Printer (mock).");
  }

  async function sendToPrinter(imageDataUrl) {
    if (!printerConnected) return alert("No printer connected (mock).");
    // Mock: open print window for image
    const w = window.open("");
    if (!w) return alert("Popup blocked");
    w.document.write(`<img src="${imageDataUrl}" style="max-width:100%;">`);
    w.document.close();
    w.focus();
    w.print();
    setLastAction("Sent image to printer (mock).");
  }

  return (
    <div className="bg-white/80 p-4 rounded-2xl shadow space-y-3">
      <h3 className="font-semibold">Machine Integration (Mock)</h3>

      <div className="flex gap-2">
        <button onClick={connectXrayMock} className="px-3 py-2 bg-indigo-600 text-white rounded">
          {xrayConnected ? "X-ray Connected" : "Connect X-ray"}
        </button>
        <button onClick={connectPrinterMock} className="px-3 py-2 bg-green-600 text-white rounded">
          {printerConnected ? "Printer Connected" : "Connect Printer"}
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <div>Last action: {lastAction || "none"}</div>
        <div className="mt-2">Notes:
          <ul className="list-disc ml-6">
            <li>Replace `connectXrayMock` with WebUSB / PACS socket code when integrating real devices.</li>
            <li>Printer: implement IPP, WebUSB, or server-side print gateway depending on environment.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
