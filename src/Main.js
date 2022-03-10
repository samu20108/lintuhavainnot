import { useGlobalContext } from "./context";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Stack,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Main() {
  const { observationList, setSelectedNoteId } = useGlobalContext();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (observationList.length > 0) {
      setShowList(true);
    }
  }, [observationList]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          padding: "30px 0 30px 0",
          borderRadius: "20px",
          boxShadow: "0px 2px 10px rgb(175, 175, 175)",
          width: "1000px",
          minHeight: "500px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={1}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography variant="h3" sx={{ wordBreak: "break-word" }}>
            Lintuhavainnot
          </Typography>
          <Button
            component={Link}
            variant="contained"
            to={"/lisaa"}
            color="success"
            sx={{ maxWidth: "500px" }}
          >
            Lisää uusi havainto
          </Button>

          <List
            sx={{
              alignItems: "center",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            {showList ? (
              observationList.map((note) => {
                return (
                  <ListItem
                    disableGutters
                    key={note.id}
                    sx={{
                      margin: "4px 0 4px 0",
                      padding: "5px",
                      borderRadius: "10px",
                      boxShadow: "0px 2px 10px rgb(175, 175, 175)",
                      textAlign: "left",
                      alignItems: "flex-start",
                      wordWrap: "break-word",
                    }}
                  >
                    <ListItemText
                      primary="Lintu "
                      secondary={note.birdName}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />
                    <ListItemText
                      primary="Havaintoaika"
                      secondary={format(
                        new Date(note.datetime),
                        "dd.MM.yyyy' 'HH:mm"
                      )}
                      sx={{ width: "min-content" }}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />

                    <ListItemText
                      primary="Paikka"
                      secondary={note.place}
                      sx={{ width: "min-content" }}
                    ></ListItemText>
                    <Divider
                      orientation="vertical"
                      flexItem
                      light={true}
                      sx={{ margin: "4px" }}
                    />
                    <Stack>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        component={Link}
                        to={"muokkaa"}
                        sx={{
                          pl: "0",
                        }}
                        onClick={() => {
                          setSelectedNoteId(note.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        component={Link}
                        to={"poista"}
                        sx={{
                          pl: "0",
                        }}
                        onClick={() => {
                          setSelectedNoteId(note.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </ListItem>
                );
              })
            ) : (
              <Typography variant="h5" component="div">
                Ei havaintoja
              </Typography>
            )}
          </List>
        </Stack>
      </Box>
    </Box>
  );
}

export default Main;
