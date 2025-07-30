import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import AppInput from "./common/AppInput";
import AppButton from "./common/AppButton";
import { useMembers } from "../hooks/useMembers";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppErrorPopApp from "./common/AppErrorPopApp";
import {
  validateCity,
  validateEmail,
  validateMember,
  validateName,
} from "../utils/memberValidation";

const MemberModal = ({ open, handleClose, editMember, onSave }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const isEdit = Boolean(editMember);
  const [formErrors, setFormErrors] = useState([]);
  const {
    createMember,
    updateMember,
    error: dbError,
    setError: setDbError,
  } = useMembers();

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    if (editMember) {
      setForm({
        name: editMember.name || "",
        email: editMember.email || "",
        city: editMember.city || "",
      });
      setFormErrors([]);
    } else {
      setForm({
        name: "",
        email: "",
        city: "",
      });
      setFormErrors([]);
    }
  }, [editMember, open]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value).length) {
      setFormErrors((prev) => [...prev, "name"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "name"));
    }
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (validateEmail(value).length) {
      setFormErrors((prev) => [...prev, "email"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "email"));
    }
    setForm((prev) => ({ ...prev, email: e.target.value }));
  };
  const handleCityChange = (e) => {
    const value = e.target.value;
    if (validateCity(value).length) {
      setFormErrors((prev) => [...prev, "city"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "city"));
    }
    setForm((prev) => ({ ...prev, city: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateMember(form);
    if (errs.length) {
      setFormErrors(errs);
      setPopup({
        show: true,
        message: errs.join(" "),
        type: "error",
      });
      return;
    }

    let isSaveValid;
    if (isEdit) {
      isSaveValid = await updateMember(editMember._id, form);
    } else {
      isSaveValid = await createMember(form);
    }

    if (isSaveValid) {
      setPopup({
        show: true,
        message: isEdit
          ? "Member updated successfully!"
          : "Member created successfully!",
        type: "success",
      });

      setTimeout(() => {
        setPopup({ ...popup, show: false });
        onSave();
      }, 1200);
    }
  };

  const handleCloseErrorPopup = () => {
    setPopup({ ...popup, show: false, message: "" });
    setDbError("");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ background: theme.colors.cardBackground }}>
        <AppErrorPopApp
          show={popup.show || Boolean(dbError)}
          label={popup.message || dbError}
          handleClose={handleCloseErrorPopup}
          variant={popup.type}
        />
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
                error={formErrors.includes("name")}
                errorMessage={
                  <span>Invalid name: 2-30 chars, letters only.</span>
                }
                instructions={"Name is required."}
              />
            </Box>
            <AppInput
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleEmailChange}
              error={formErrors.includes("email")}
              errorMessage={<span>Invalid email format.</span>}
              instructions={"Email is required."}
            />
            <AppInput
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleCityChange}
              error={formErrors.includes("city")}
              errorMessage={
                <span>Invalid city: 2-50 chars, letters only.</span>
              }
              instructions={"City is required."}
            />
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
