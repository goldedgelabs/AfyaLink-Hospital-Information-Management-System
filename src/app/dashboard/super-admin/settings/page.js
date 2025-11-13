"use client";

import { useState } from "react";
import Image from "next/image";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import { Save, Upload, Settings, User, Palette } from "lucide-react";

export default function SuperAdminSettingsPage() {
  const [systemName, setSystemName] = useState("AfyaLink Infinity");
  const [theme, setTheme] = useState("light");
  const [logo, setLogo] = useState("/logo.png");

  const [profile, setProfile] = useState({
    name: "Super Admin",
    email: "admin@afyalink.africa",
    password: "",
    avatar: "/avatar-placeholder.png",
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    // In a real backend, this would save to DB
    localStorage.setItem(
      "superAdminSettings",
      JSON.stringify({ systemName, theme, logo, profile })
    );
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SuperAdminNavbar />

        <main className="p-6 space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="text-indigo-600" /> System Settings
          </h1>

          {/* System Customization Section */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="text-green-600" /> Branding & Theme
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  System Name
                </label>
                <input
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Upload Logo
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <Image
                    src={logo}
                    alt="System Logo"
                    width={60}
                    height={60}
                    className="rounded-lg border"
                  />
                  <label className="cursor-pointer bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500">
                    <Upload size={16} className="inline mr-1" />
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Theme Mode
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="glass">Glass</option>
                </select>
              </div>
            </div>
          </div>

          {/* Profile Management Section */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="text-indigo-600" /> Profile Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={profile.password}
                  onChange={(e) =>
                    setProfile({ ...profile, password: e.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Avatar
                </label>
                <div className="flex items-center space-x-4 mt-2">
                  <Image
                    src={profile.avatar}
                    alt="Admin Avatar"
                    width={60}
                    height={60}
                    className="rounded-full border"
                  />
                  <label className="cursor-pointer bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-500">
                    <Upload size={16} className="inline mr-1" />
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-500"
            >
              <Save size={18} /> Save All Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
            }
