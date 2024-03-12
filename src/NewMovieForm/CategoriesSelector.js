import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CATEGORIES from "../Resources";
import { useEffect, useState } from "react";
import ListCustomed from "./ListCustomed";

function CategoriesSelector(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedCategories } = props;
  const [selectedCheckBox, setSelectedCheckBox] = useState(new Set());

  useEffect(() => {
    setSelectedCategories(selectedCheckBox);
  }, [selectedCheckBox]);

  return (
    <div>
      <button
        className="btn btn-large btn-chooser"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? "Close categories" : "Choose categories (3)"}
      </button>
      {isOpen ? (
        <ListCustomed
          children={
            <List
              className="selectcategories"
              //   sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {CATEGORIES.map((cat) => {
                const labelId = `checkbox-list-label-${cat.name}`;

                function handleChange(e) {
                  const updatedSet = new Set(selectedCheckBox);
                  if (e.target.checked) {
                    updatedSet.add(cat.name);
                    setSelectedCheckBox(updatedSet);
                  } else {
                    updatedSet.delete(cat.name);
                    setSelectedCheckBox(updatedSet);
                  }
                }

                return (
                  <ListItem
                    key={cat.name}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments"></IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      //   onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          id={cat.name}
                          className="checkbox"
                          onChange={(e) => handleChange(e)}
                          disabled={
                            selectedCheckBox.size === 3 &&
                            !selectedCheckBox.has(cat.name)
                          }
                          checked={selectedCheckBox.has(cat.name)}
                          sx={{
                            color: "#44403c",
                            // "&:hover": { bgcolor: "white" },
                            "&.Mui-checked": {
                              color: "#44403c",
                            },
                          }}
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className="selectcategoryname"
                        id={labelId}
                        primary={`${cat.name.toUpperCase()}`}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          }
        ></ListCustomed>
      ) : null}
    </div>
  );
}

export default CategoriesSelector;
