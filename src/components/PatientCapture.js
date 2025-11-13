// src/components/PatientCapture.js
"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * PatientCapture component
 *
 * Usage:
 * Pass an `onShare` callback to handle captured images when the user shares.
 *
 * Example:
 *   function handleShare(payload) {
 *     // do something with the shared image payload
 *   }
 *   <PatientCapture onShare={handleShare} />
 *
 * This component stores captured images in localStorage and allows selecting a doctor to share.
 */

export default function PatientCapture({ onShare }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [cameraOn, setCameraOn] = useState(false);
  const [preview, setPreview] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // load mocked doctors list (from mock-server data or local file)
    fetch("/mock-server/data/doctors.json")
      .then(r => r.json())
      .then(setDoctors)
      .catch(() => {
        setDoctors([
          { id: 'd1', fullName: 'Dr. Asha Mwangi' },
          { id: 'd2', fullName: 'Dr. Peter Kimani' }
        ]);
      });
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraOn(true);
    } catch (e) {
      alert("Camera access denied or unavailable.");
    }
  }

  function stopCamera() {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
    }
    setCameraOn(false);
  }

  function capture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/png");
    setPreview(data);
    // store locally for patient
    const key = `afya:patient:${user?.id || 'anon'}:images`;
    const arr = JSON.parse(localStorage.getItem(key) || "[]");
    arr.unshift({
      id: Date.now(),
      data,
      timestamp: new Date().toISOString(),
      doctor: selectedDoctor || null
    });
    localStorage.setItem(key, JSON.stringify(arr));
  }

  function share() {
    if (!preview) return alert("Capture an image first.");
    // simulate sharing: POST to mock API or save to shared storage
    const payload = {
      from: user || { id: 'anon', name: 'Patient' },
      toDoctorId: selectedDoctor,
      image: preview,
      note: "Patient-shared image",
      ts: new Date().toISOString()
    };
    // Save to local shared mailbox for doctor
    const inboxKey = `afya:doctor:inbox:${selectedDoctor || 'unassigned'}`;
    const inbox = JSON.parse(localStorage.getItem(inboxKey) || "[]");
    inbox.unshift(payload);
    localStorage.setItem(inboxKey, JSON.stringify(inbox));
    if (onShare) onShare(payload);
    alert("Shared with doctor (mock).");
  }

  return (
    <div className="bg-white/80 p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-2">Capture & Share (Patient)</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-sm">Select Doctor to share with</label>
          <select
            className="mt-1 border p-2 w-full rounded"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">— Choose doctor —</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.fullName || d.name}
              </option>
            ))}
          </select>
        </div>

        {!cameraOn && (
          <button
            onClick={startCamera}
            className="px-3 py-2 bg-indigo-600 text-white rounded"
          >
            Start Camera
          </button>
        )}
        {cameraOn && (
          <button onClick={stopCamera} className="px-3 py-2 border rounded">
            Stop Camera
          </button>
        )}

        <div className="mt-3">
          <video
            ref={videoRef}
            className="w-full rounded border"
            style={{ display: cameraOn ? "block" : "none" }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={capture}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Capture Photo
          </button>
          <button
            onClick={share}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Share with Doctor
          </button>
        </div>

        {preview && (
          <div className="mt-3">
            <div className="text-sm font-medium mb-1">Preview</div>
            <img
              src={preview}
              alt="preview"
              className="w-48 h-48 object-contain rounded border"
            />
          </div>
        )}
      </div>
    </div>
  );
      }
