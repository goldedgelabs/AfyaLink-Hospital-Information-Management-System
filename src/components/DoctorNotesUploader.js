// src/components/DoctorNotesUploader.js
"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * DoctorNotesUploader:
 * - Doctor can use camera or file upload to save an image of handwritten notes.
 * - Stores to local storage in doctor's own folder and optionally shares with patient or lab.
 */

export default function DoctorNotesUploader({ onSave }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [cameraOn, setCameraOn] = useState(false);
  const [preview, setPreview] = useState(null);
  const { user } = useContext(AuthContext);
  const [targetPatient, setTargetPatient] = useState("");

  useEffect(()=> {
    // optionally load patient list from mock-server
  }, []);

  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = s;
      videoRef.current.play();
      setCameraOn(true);
    } catch (e) {
      alert("Camera unavailable.");
    }
  }
  function stopCamera(){
    const stream = videoRef.current?.srcObject;
    if(stream) stream.getTracks().forEach(t=>t.stop());
    setCameraOn(false);
  }

  function capture() {
    const v = videoRef.current;
    const c = canvasRef.current;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    const ctx = c.getContext("2d");
    ctx.drawImage(v, 0, 0);
    const data = c.toDataURL("image/png");
    setPreview(data);
  }

  function saveNote() {
    if (!preview) return alert("Capture first");
    const key = `afya:doctor:${user?.id||'doc'}:notes`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    const rec = { id: Date.now(), patient: targetPatient || null, data: preview, ts: new Date().toISOString() };
    arr.unshift(rec);
    localStorage.setItem(key, JSON.stringify(arr));
    if (onSave) onSave(rec);
    alert("Saved note locally (mock).");
  }

  function uploadFile(e) {
    const f = e.target.files?.[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = () => setPreview(r.result);
    r.readAsDataURL(f);
  }

  return (
    <div className="bg-white/80 p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-2">Doctor: Capture / Upload Notes</h3>

      <div className="space-y-3">
        <div>
          <label className="text-sm">Attach to Patient (optional)</label>
          <input value={targetPatient} onChange={e=>setTargetPatient(e.target.value)} placeholder="patient id or name" className="mt-1 w-full border p-2 rounded" />
        </div>

        <div className="flex gap-2">
          {!cameraOn && <button onClick={startCamera} className="px-3 py-2 bg-indigo-600 text-white rounded">Start Camera</button>}
          {cameraOn && <button onClick={stopCamera} className="px-3 py-2 border rounded">Stop Camera</button>}
          <label className="px-3 py-2 bg-gray-100 rounded cursor-pointer">
            Upload File
            <input onChange={uploadFile} type="file" accept="image/*,application/pdf" className="hidden" />
          </label>
          <button onClick={capture} className="px-3 py-2 bg-green-600 text-white rounded">Capture</button>
          <button onClick={saveNote} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>

        <video ref={videoRef} style={{display: cameraOn ? 'block' : 'none'}} className="w-full rounded border" />
        <canvas ref={canvasRef} style={{display:'none'}} />
        {preview && <img src={preview} alt="note" className="w-64 h-64 object-contain rounded border" />}
      </div>
    </div>
  );
    }
