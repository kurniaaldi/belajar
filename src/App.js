import React, { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { NavBar } from "./component";

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Container, IconButton, ListItem } from "@mui/material";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
function App() {
  const [valueList, setValueList] = useState(["aldi", "jhon"]);
  const [valueInputAdd, setValueInputAdd] = useState("");
  const [valueInputUpdate, setValueInputUpdate] = useState("");
  const [indexList, setIndexList] = useState(null);

  //untuk merubah value input add
  const handleChange = (e) => {
    setValueInputAdd(e.target.value);
  };

  //untuk trigger button add
  const handleAdd = () => {
    setValueList([...valueList, valueInputAdd]);
    setValueInputAdd("");
  };

  const handleDelete = (id) => {
    setValueList((value) => {
      const newArray = value.filter((item, index) => index !== id);
      return newArray;
    });
  };

  const handleChangeUpdate = (e) => {
    setValueInputUpdate(e.target.value);
  };

  //untuk trigger button update
  const handleUpdate = (id) => {
    setValueList((previousValue) => {
      // mapping array list yang disimpan variable
      const newArray = previousValue.map((item, index) => {
        // kondisi jika index sama dengan id(index) yang akan di update
        if (index === id) {
          return valueInputUpdate;
        } else {
          return item;
        }
      });
      return newArray;
    });

    // reset value seperti semula
    setValueInputUpdate("");
    setIndexList(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Container
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input value={valueInputAdd} onChange={handleChange} />
          <button onClick={handleAdd}>add</button>
        </div>
        {/* kondisi jika index list tidak null */}
        {indexList !== null && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <input value={valueInputUpdate} onChange={handleChangeUpdate} />
            <button onClick={() => handleUpdate(indexList)}>Update</button>
          </div>
        )}
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nama List
            </ListSubheader>
          }
        >
          {valueList.map((item, index) => {
            return (
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() => setIndexList(index)}
                      edge="end"
                      aria-label="delete"
                    >
                      <BorderColorIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(index)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={item} />
              </ListItem>
            );
          })}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;
