import { Box, Stack, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { isAfter, addMinutes } from "date-fns";
import fi from "date-fns/locale/fi";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function Edit() {
  const maxDateTime = new Date();
  const [datetime, setDatetime] = useState(addMinutes(maxDateTime, -1));
  const [birdName, setBirdName] = useState("");
  const [place, setPlace] = useState("");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const { editNote, observationList, selectedNoteId } = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonPressed(true);
    if (!isAfter(datetime, maxDateTime) && birdName !== "" && place !== "") {
      editNote(birdName, place, datetime);
      navigate("/");
    }
  };

  useEffect(() => {
    let note = observationList.find(
      (listItem) => listItem.id === selectedNoteId
    );
    if (note) {
      setBirdName(note.birdName);
      setPlace(note.place);
      setDatetime(new Date(note.datetime));
    } else {
      navigate("/");
    }
  }, [observationList, selectedNoteId, navigate]);

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
          <h2>Muokkaa havaintoa</h2>

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
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
              <DateTimePicker
                label="Havaintoaika"
                color="success"
                value={datetime}
                onChange={(datetime) => {
                  setDatetime(datetime);
                }}
                disableMaskedInput={true}
                maxDateTime={maxDateTime}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    fullWidth
                    color="success"
                    error={isAfter(datetime, maxDateTime)}
                    helperText={
                      isAfter(datetime, maxDateTime)
                        ? "Havaintoaikaa ei voi asettaa tulevaisuuteen"
                        : " "
                    }
                  />
                )}
              />
            </LocalizationProvider>
            <Button variant="contained" color="success" type="submit">
              Tallenna havainto
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
export default Edit;
