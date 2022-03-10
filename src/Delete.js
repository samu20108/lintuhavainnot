import { Box, Stack, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { Delete as DeleteIcon } from "@mui/icons-material";

function Delete() {
  const { deleteNote } = useGlobalContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteNote();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "30px 0 30px 0",
          backgroundColor: "white",
          borderRadius: "20px",
          boxShadow: "0px 2px 10px rgb(175, 175, 175)",
          width: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "90%" }} textAlign="center">
          <h2>Haluatko varmasti poistaa havainnon?</h2>

          <Stack spacing={1}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              <DeleteIcon />
              Poista havainto
            </Button>
            <Button component={Link} to={"/"} color="success">
              Takaisin
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
export default Delete;
