import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { wakeServers } from "../../utils/wakeServers";
import AppErrorPopApp from "./AppErrorPopApp";

const WakeServersSpinner = ({ onDone }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await wakeServers();
      if (res.error) {
        setError(res.error);
        setLoading(false);
      } else {
        setLoading(false);
        if (onDone) onDone();
      }
    })();
  }, [onDone]);

  if (loading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="40vh"
      >
        <CircularProgress color="primary" size={60} />
        <Typography mt={3} variant="h6" color="textSecondary">
          Waking up servers, please wait...
        </Typography>
        <Typography mt={1} variant="body2" color="textSecondary">
          This may take up to 60 seconds (Render servers are sleeping).
        </Typography>
      </Box>
    );
  if (error)
    return (
      <AppErrorPopApp
        label={error}
        handleClose={() => setError("")}
        show={Boolean(error)}
        variant="error"
      />
    );
  return null;
};

export default WakeServersSpinner;
