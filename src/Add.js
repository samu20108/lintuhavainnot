import { Box, Stack, Button, TextField } from "@mui/material";
import { useState } from "react";
import { isValid } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function Add() {
  const datetime = new Date();
  const [birdName, setBirdName] = useState("");
  const [place, setPlace] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { addNewNote } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonPressed(true);
    if (isValid(datetime) && birdName !== "" && place !== "") {
      addNewNote(birdName, place, datetime);
      navigate("/");
    }
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "90%" }}
          textAlign="center"
        >
          <h2>Uusi havainto</h2>

          <Stack spacing={1}>
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Linnun nimi"
              value={birdName}
              onChange={(e) => {
                setBirdName(e.target.value);
              }}
              error={birdName === "" && isButtonPressed}
              helperText={
                birdName === "" && isButtonPressed
                  ? "Linnun nimi on pakollinen"
                  : " "
              }
              color="success"
            />{" "}
            <TextField
              required
              fullWidth
              id="outlined-required"
              label="Havaintopaikka"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              error={place === "" && isButtonPressed}
              helperText={
                place === "" && isButtonPressed
                  ? "Havaintopaikka on pakollinen"
                  : " "
              }
              color="success"
            />
            <Button variant="contained" color="success" type="submit">
              Lisää havainto
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
export default Add;
