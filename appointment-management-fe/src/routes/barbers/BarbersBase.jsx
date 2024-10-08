import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useFetchBarbersQuery,
  useUnassignBarberMutation,
} from "../../services/api/barbersApi";
import FadeAlert from "../../components/FadeAlert/FadeAlert";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useMediaQuery } from "@mui/material";

const BarbersBase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useFetchBarbersQuery({
    page: 1,
    limit: 10,
  });
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [unassignBarber] = useUnassignBarberMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const [alert, setAlert] = useState(location.state?.alert || null);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // Refetch barbers when location state changes
  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      navigate(location.pathname, { replace: true });
      refetch();
    }
  }, [location, navigate, refetch]);

  const handleEdit = (id) => {
    navigate(`/manage-barbers/edit/${id}`);
  };

  const handleOpenDialog = (barber) => {
    setSelectedBarber(barber);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBarber(null);
  };

  const handleAlertClose = () => {
    setAlert(null); // Remove the alert from the DOM after fade-out
  };

  const handleDelete = async () => {
    if (selectedBarber) {
      try {
        await unassignBarber(selectedBarber.id).unwrap(); // Use unassignBarber

        setOpenDialog(false); // Close the dialog
        refetch(); // Refetch the barbers after deleting

        setAlert({
          message: "Barber unassigned successfully!",
          severity: "success",
        });
      } catch (error) {
        setAlert({
          message: `Error unassigning barber: ${error.message}`,
          severity: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error loading barbers</Typography>;
  }

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt={params.row.firstName} width="50" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row.id)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleOpenDialog(params.row)}
          >
            Unassign
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <DashboardLayout>
      {alert && (
        <FadeAlert
          message={alert.message}
          severity={alert.severity}
          duration={3000}
          onClose={handleAlertClose}
        />
      )}
      <Typography variant="h4" gutterBottom>
        Manage Barbers
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmallScreen ? "flex-start" : "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/manage-barbers/create")}
          >
            Assign New Barber
          </Button>
        </Box>
        <DataGrid
          rows={data?.results || []}
          columns={columns}
          pageSize={data?.limit || 10}
          rowCount={data?.totalResults || 0}
          paginationMode="server"
          onPageChange={(newPage) => refetch({ page: newPage + 1 })}
          getRowId={(row) => row.id || row._id} // Ensure unique key
        />

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Unassign Barber"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to unassign {selectedBarber?.firstName}{" "}
              {selectedBarber?.lastName} as a barber?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DashboardLayout>
  );
};

export default BarbersBase;
