import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
} from "@mui/material";
import { useUsers } from "../hooks/useUsers";
import {
  PERMISSIONS,
  validateName,
  validatePermissions,
  validateSessionTimeOut,
  validateUserFull,
  validateUserName,
} from "../utils/userValidation";
import appTheme from "../styles/theme";
import { useSelector } from "react-redux";
import AppInput from "./common/AppInput";
import AppComboBox from "./common/AppComboBox";
import AppButton from "./common/AppButton";
import AppErrorPopApp from "./common/AppErrorPopApp";

const UserModal = ({ open, handleClose, editUser, onSave }) => {
  const app = useSelector((state) => state.app);
  const theme = app.darkMode ? appTheme.dark : appTheme.light;
  const isEdit = Boolean(editUser);
  const [formErrors, setFormErrors] = useState([]);
  const {
    createUser,
    updateUser,
    error: dbError,
    setError: setDbError,
  } = useUsers();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    sessionTimeOut: 30,
    userName: "",
    permissions: [],
  });

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (editUser) {
      setForm({
        firstName: editUser.firstName || "",
        lastName: editUser.lastName || "",
        sessionTimeOut: +editUser.sessionTimeOut / 60 || 30,
        userName: editUser.userName || "",
        permissions: editUser.permissions || [],
      });
      setFormErrors([]);
    } else {
      setForm({
        firstName: "",
        lastName: "",
        sessionTimeOut: 30,
        userName: "",
        permissions: [],
      });
      setFormErrors([]);
    }
  }, [editUser, open]);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value).length) {
      setFormErrors((prev) => [...prev, "firstName"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "firstName"));
    }
    setForm((prev) => ({ ...prev, firstName: e.target.value }));
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (validateName(value).length) {
      setFormErrors((prev) => [...prev, "lastName"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "lastName"));
    }
    setForm((prev) => ({ ...prev, lastName: e.target.value }));
  };
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (validateUserName(value).length) {
      setFormErrors((prev) => [...prev, "userName"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "userName"));
    }
    setForm((prev) => ({ ...prev, userName: e.target.value }));
  };
  const handleSessionTimeoutChange = (e) => {
    const value = e.target.value;
    if (validateSessionTimeOut(value).length) {
      setFormErrors((prev) => [...prev, "sessionTimeOut"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "sessionTimeOut"));
    }
    setForm((prev) => ({ ...prev, sessionTimeOut: value }));
  };

  const handlePermissionsChange = (event) => {
    let newPerms =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;

    if (
      newPerms.some((p) =>
        [
          "Create Subscriptions",
          "Update Subscriptions",
          "Delete Subscriptions",
        ].includes(p)
      ) &&
      !newPerms.includes("View Subscriptions")
    ) {
      newPerms = [...newPerms, "View Subscriptions"];
    }

    if (
      newPerms.some((p) =>
        ["Create Movies", "Update Movies", "Delete Movies"].includes(p)
      ) &&
      !newPerms.includes("View Movies")
    ) {
      newPerms = [...newPerms, "View Movies"];
    }

    if (validatePermissions(newPerms).length) {
      setFormErrors((prev) => [...prev, "permissions"]);
    } else {
      setFormErrors((prev) => prev.filter((err) => err !== "permissions"));
    }

    setForm((prev) => ({
      ...prev,
      permissions: newPerms,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateUserFull(form);
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
      isSaveValid = await updateUser(editUser.id, form);
    } else {
      isSaveValid = await createUser(form);
    }

    if (isSaveValid) {
      setPopup({
        show: true,
        message: isEdit
          ? "User updated successfully!"
          : "User created successfully!",
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
                error={formErrors.includes("firstName")}
                errorMessage={
                  <span>Invalid first name: letters only, 2-30 chars.</span>
                }
                instructions={"First name is required."}
              />
            </Box>
            <AppInput
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleLastNameChange}
              error={formErrors.includes("lastName")}
              errorMessage={
                <span>Invalid last name: letters only, 2-30 chars.</span>
              }
              instructions={"Last name is required."}
            />
            <AppInput
              type="text"
              placeholder="Username"
              value={form.userName}
              onChange={handleUsernameChange}
              error={formErrors.includes("userName")}
              errorMessage={
                <span>Invalid username: letters only, 3-30 chars.</span>
              }
              instructions={"Username is required."}
              fullWidth
            />
            <AppInput
              type="number"
              placeholder="Session Timeout (minutes)"
              value={form.sessionTimeOut}
              onChange={handleSessionTimeoutChange}
              error={formErrors.includes("sessionTimeOut")}
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
              error={formErrors.includes("permissions")}
              errorMessage={<span>At least one permission is required.</span>}
              instructions={"Select at least one permission."}
              multiple
              fullWidth
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
