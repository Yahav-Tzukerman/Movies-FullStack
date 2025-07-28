import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import AppInput from "./common/AppInput";
import AppButton from "./common/AppButton";
import { useMembers } from "../hooks/useMembers";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";

const MemberModal = ({ open, handleClose, editMember, onSave }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const { createMember, updateMember } = useMembers();
  const isEdit = Boolean(editMember);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (editMember) {
      setForm({
        name: editMember.name || "",
        email: editMember.email || "",
        city: editMember.city || "",
      });
      setErrors([]);
    } else {
      setForm({
        name: "",
        email: "",
        city: "",
      });
      setErrors([]);
    }
  }, [editMember, open]);

  const handleNameChange = (e) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleEmailChange = (e) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };
  const handleCityChange = (e) => {
    setForm((prev) => ({ ...prev, city: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = [];
    if (!form.name) errs.push("Name is required.");
    if (!form.email) errs.push("Email is required.");
    if (!form.city) errs.push("City is required.");
    setErrors(errs);
    if (errs.length) return;
    try {
      if (isEdit) {
        await updateMember(editMember._id, form);
      } else {
        await createMember(form);
      }
      setErrors([]);
      onSave();
    } catch (err) {
      setErrors([
        err.response?.data?.message || "Failed to save member, check your data.",
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ background: theme.colors.cardBackground }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle sx={{ color: theme.colors.textLight, fontSize: 24 }}>
            {isEdit ? `Edit Member - ${form.name}` : "Add New Member"}
          </DialogTitle>
          <DialogContent
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ mt: 1 }}>  
              <AppInput
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleNameChange}
                error={errors.includes("Name is required.")}
                errorMessage={<span>Name is required.</span>}
                instructions={"Name is required."}
              />
            </Box>
            <AppInput
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleEmailChange}
              error={errors.includes("Email is required.")}
              errorMessage={<span>Email is required.</span>}
              instructions={"Email is required."}
            />
            <AppInput
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleCityChange}
              error={errors.includes("City is required.")}
              errorMessage={<span>City is required.</span>}
              instructions={"City is required."}
            />
            {errors.length > 0 && (
              <Box sx={{ mt: 1 }}>
                {errors.map((err, idx) => (
                  <Box key={idx} color="error.main" fontSize={14}>
                    {err}
                  </Box>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <AppButton
              onClick={handleClose}
              variant="muted"
              label="Cancel"
              size={"sm"}
            />
            <AppButton
              variant="primary"
              label={isEdit ? "Update Member" : "Create Member"}
              onClick={handleSubmit}
              size={"sm"}
            />
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default MemberModal;
