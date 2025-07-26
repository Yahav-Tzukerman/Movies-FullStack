import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormHelperText,
  Typography,
} from "@mui/material";
import UsersService from "../services/users.service";
import { PERMISSIONS, validateUserFull } from "../utils/userValidation";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppInput from "./common/AppInput";
import AppComboBox from "./common/AppComboBox";
import AppButton from "./common/AppButton";
import App from "../App";

const UserModal = ({ open, handleClose, editUser, onSave }) => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.auth.user);
  const token = user?.token;
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const isEdit = Boolean(editUser);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    sessionTimeOut: 30,
    userName: "",
    permissions: [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (editUser) {
      setForm({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        sessionTimeOut: editUser.sessionTimeOut || 30,
        userName: editUser.userName || "",
        permissions: editUser.permissions || [],
      });
      setErrors([]);
    } else {
      setForm({
        firstName: "",
        lastName: "",
        sessionTimeOut: 30,
        userName: "",
        permissions: [],
      });
      setErrors([]);
    }
  }, [editUser, open]);

  const handleFirstNameChange = (e) => {
    setForm((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const handleLastNameChange = (e) => {
    setForm((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const handleUsernameChange = (e) => {
    setForm((prev) => ({ ...prev, userName: e.target.value }));
  };
  const handleSessionTimeoutChange = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 1440) {
      setErrors((prev) => [...prev, "sessionTimeOut"]);
    } else {
      setErrors((prev) => prev.filter((err) => err !== "sessionTimeOut"));
    }
    setForm((prev) => ({ ...prev, sessionTimeOut: value }));
  };

  const handlePermissionsChange = (event) => {
    const { value } = event.target;
    setForm((prev) => ({
      ...prev,
      permissions: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateUserFull(form);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    try {
      if (isEdit) {
        await UsersService.updateUser(editUser.id, form, token);
      } else {
        await UsersService.createUser(form, token);
      }
      setErrors([]);
      onSave();
    } catch (err) {
      setErrors([
        err.response?.data?.message || "Failed to save user, check your data.",
      ]);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Box sx={{ background: theme.colors.cardBackground }}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <DialogTitle sx={{ color: theme.colors.textLight, fontSize: 24 }}>
            {isEdit ? `Edit User - ${form.userName}` : "Add New User"}
          </DialogTitle>
          <DialogContent
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ mt: 1 }}>
              <AppInput
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleFirstNameChange}
                error={errors.includes("firstName")}
                errorMessage={<span>First name is required.</span>}
                instructions={"First name is required."}
              />
            </Box>
            <AppInput
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleLastNameChange}
              error={errors.includes("lastName")}
              errorMessage={<span>Last name is required.</span>}
              instructions={"Last name is required."}
            />
            <AppInput
              type="text"
              placeholder="Username"
              value={form.userName}
              onChange={handleUsernameChange}
              error={errors.includes("userName")}
              errorMessage={<span>Username is required.</span>}
              instructions={"Username is required."}
              fullWidth
            />
            <AppInput
              type="number"
              placeholder="Session Timeout (minutes)"
              value={form.sessionTimeOut}
              onChange={handleSessionTimeoutChange}
              error={errors.includes("sessionTimeOut")}
              errorMessage={
                <span>Session timeout must be between 1 and 1440 minutes.</span>
              }
              instructions={
                "Session timeout must be between 1 and 1440 minutes."
              }
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.colors.textLight,
                background: theme.colors.cardBackground,
                padding: "0.7rem",
                borderRadius: "4px",
                border: `1px solid ${theme.colors.inputBorder}`,
              }}
            >
              Created Date:{" "}
              {isEdit
                ? new Date(editUser.createdDate).toLocaleDateString("he-IL")
                : new Date().toLocaleDateString("he-IL")}
            </Typography>
            <AppComboBox
              name="permissions"
              label="Permissions"
              options={PERMISSIONS}
              value={form.permissions}
              onChange={handlePermissionsChange}
              error={errors.includes("permissions")}
              errorMessage={<span>At least one permission is required.</span>}
              instructions={"Select at least one permission."}
              multiple
              fullWidth
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
              label={isEdit ? "Update User" : "Create User"}
              onClick={handleSubmit}
              size={"sm"}
            />
          </DialogActions>
        </form>
      </Box>
    </Dialog>
  );
};

export default UserModal;
