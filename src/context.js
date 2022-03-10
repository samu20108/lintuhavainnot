import { useState, createContext, useContext, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [observationList, setObservationList] = useState(
    localStorage.getItem("observationList")
      ? JSON.parse(localStorage.getItem("observationList"))
      : []
  );
  const [idCounter, setIdCounter] = useState(0);
  const [selectedNoteId, setSelectedNoteId] = useState();

  const addNewNote = (birdName, place, datetime) => {
    const newNote = {
      id: idCounter,
      birdName: birdName,
      place: place,
      datetime: datetime,
    };
    setIdCounter(idCounter + 1);
    setObservationList([...observationList, newNote]);
  };

  const deleteNote = (id) => {
    const newList = observationList.filter((listItem) => listItem.id !== id);
    setObservationList(newList);
  };
  const editNote = (birdName, place, datetime) => {
    const allNotes = [...observationList];
    let index = observationList.findIndex(
      (listItem) => listItem.id === selectedNoteId
    );
    let selectedNote = [allNotes[index]];
    selectedNote = {
      id: selectedNoteId,
      birdName: birdName,
      place: place,
      datetime: new Date(datetime),
    };
    allNotes[index] = selectedNote;
    console.log(allNotes[index]);
    setObservationList([...allNotes]);
  };

  useEffect(() => {
    //Sort list by datetime, newest first
    setObservationList(
      observationList.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      })
    );
    localStorage.setItem("observationList", JSON.stringify(observationList));
  }, [observationList]);

  return (
    <AppContext.Provider
      value={{
        observationList,
        addNewNote,
        deleteNote,
        editNote,
        selectedNoteId,
        setSelectedNoteId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext };
