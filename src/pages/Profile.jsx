import React, { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Camera,
  LogOut,
  Mail,
  User,
  Key,
  Trash2,
} from "lucide-react";

export default function Profile() {
  const { user, logout, updateUser, changePassword } = useAuth();

  const [editing, setEditing] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  const [preview, setPreview] = useState(user?.avatar || "");
  const fileRef = useRef();

  const oldPassRef = useRef();
  const newPassRef = useRef();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setPreview(reader.result);
      await updateUser({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    await updateUser(form);
    setEditing(false);
  };

  return (
    <div className="
      min-h-screen pt-28 px-4
      bg-gradient-to-b 
      from-slate-100 to-slate-200 
      dark:from-slate-900 dark:to-slate-800
      transition-colors duration-500
    ">
      <div
        className="
          max-w-3xl mx-auto
          bg-white dark:bg-slate-900
          rounded-3xl shadow-xl border
          border-slate-200 dark:border-slate-700
          p-10 transition-all duration-500
        "
      >
        <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-8">
          My Profile
        </h1>

        {/* AVATAR */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              }
              className="
                w-40 h-40 rounded-full object-cover 
                border-4 border-white dark:border-slate-700 
                shadow-xl transition
              "
            />

            {/* Change Avatar */}
            <button
              onClick={() => fileRef.current.click()}
              className="
                absolute bottom-1 right-1 p-2 rounded-full 
                bg-white dark:bg-slate-800 border 
                hover:scale-105 shadow
                transition-all
              "
            >
              <Camera className="text-slate-600 dark:text-slate-300" size={18} />
            </button>

            {/* Remove Avatar */}
            {preview && (
              <button
                onClick={async () => {
                  setPreview("");
                  await updateUser({ avatar: "" });
                }}
                className="
                  absolute top-1 right-1 p-2 rounded-full 
                  bg-white dark:bg-slate-800 border 
                  hover:bg-red-50 dark:hover:bg-red-900
                  hover:scale-105 shadow
                  transition-all
                "
              >
                <Trash2 className="text-red-500" size={16} />
              </button>
            )}

            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={changeAvatar}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Tap the camera to change photo
          </p>
        </div>

        {/* INFO CARD */}
        <div
          className="
            bg-slate-50 dark:bg-slate-800 
            p-6 rounded-2xl border 
            border-slate-200 dark:border-slate-700
            shadow-inner space-y-6 transition
          "
        >
          {/* USERNAME */}
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-400 mb-1 block">
              Username
            </label>

            <div className="flex items-center gap-3">
              <input
                disabled={!editing}
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
                className="
                  flex-1 px-4 py-3 rounded-xl border 
                  border-slate-300 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-800 dark:text-slate-100
                  disabled:bg-slate-100 dark:disabled:bg-slate-700
                  transition
                "
              />
              <User className="text-slate-400" />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-400 mb-1 block">
              Email
            </label>

            <div className="flex items-center gap-3">
              <input
                disabled={!editing}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="
                  flex-1 px-4 py-3 rounded-xl border 
                  border-slate-300 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-800 dark:text-slate-100
                  disabled:bg-slate-100 dark:disabled:bg-slate-700
                  transition
                "
              />
              <Mail className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap justify-between mt-10 gap-4">

          <button
            onClick={() => setEditing(!editing)}
            className="
              px-6 py-3 rounded-xl 
              bg-slate-200 dark:bg-slate-700
              hover:bg-slate-300 dark:hover:bg-slate-600
              text-slate-800 dark:text-slate-100
              shadow transition
            "
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>

          {editing && (
            <button
              onClick={save}
              className="
                px-6 py-3 rounded-xl 
                bg-indigo-600 hover:bg-indigo-700
                text-white shadow transition
              "
            >
              Save
            </button>
          )}

          <button
            onClick={() => setShowPassModal(true)}
            className="
              px-6 py-3 rounded-xl 
              bg-slate-300 dark:bg-slate-600
              hover:bg-slate-400 dark:hover:bg-slate-500
              text-slate-900 dark:text-slate-100
              shadow transition
            "
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="
              px-6 py-3 rounded-xl 
              bg-red-500 hover:bg-red-600 
              text-white shadow
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPassModal && (
        <div className="
          fixed inset-0 bg-black/40 backdrop-blur-sm 
          flex justify-center items-center p-4
        ">
          <div className="
            bg-white dark:bg-slate-900
            rounded-2xl p-8 border 
            border-slate-200 dark:border-slate-700
            max-w-md w-full shadow-xl transition
          ">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Old password"
              ref={oldPassRef}
              className="
                w-full mb-4 px-4 py-3 rounded-xl border
                border-slate-300 dark:border-slate-700
                bg-slate-50 dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                transition
              "
            />

            <input
              type="password"
              placeholder="New password"
              ref={newPassRef}
              className="
                w-full mb-6 px-4 py-3 rounded-xl border
                border-slate-300 dark:border-slate-700
                bg-slate-50 dark:bg-slate-800
                text-slate-800 dark:text-slate-100
                transition
              "
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPassModal(false)}
                className="
                  px-5 py-2 rounded-xl 
                  bg-slate-200 dark:bg-slate-700
                  hover:bg-slate-300 dark:hover:bg-slate-600
                  text-slate-900 dark:text-slate-100
                "
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  changePassword(
                    oldPassRef.current.value,
                    newPassRef.current.value
                  ).then(() => setShowPassModal(false))
                }
                className="
                  px-5 py-2 rounded-xl 
                  bg-indigo-600 hover:bg-indigo-700 
                  text-white shadow
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
