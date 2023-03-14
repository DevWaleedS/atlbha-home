import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "./CheckMarks.css";
import { IoIosArrowDown } from "react-icons/io";

const activiyType = [
    `1-اختر نوع النشاط`,
    `2-اختر نوع النشاط`,
    `3-اختر نوع النشاط`,
    `4-اختر نوع النشاط`,
];

let CheckMarks = () => {
    const [personName, setPersonName] = React.useState([]);
    const [openSubcategory, setOpenSubcategory] = useState(false);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <>
            <Select
                sx={{
                    height: "3.5rem",

                    border: "1px solid rgba(167, 167, 167, 0.5)",

                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                }}
                IconComponent={IoIosArrowDown}
                multiple
                displayEmpty
                className="check-mark"

                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (personName.length === 0) {
                        return (
                            <span
                                style={{
                                    marginRight: " -30px",
                                    color: "#67747b",
                                }}
                            >
                                اختر نوع النشاط
                            </span>
                        );
                    }

                    return selected.join(", ");
                }}
                onClick={(e) => {
                    setOpenSubcategory(true)
                }}
                open={openSubcategory}
            >
                {activiyType.map((name) => (
                    <MenuItem
                        key={name}
                        className="check-mark-liData"
                        value={name}
                    >
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
                <MenuItem className="check-mark-button">
                    <button className="check-mark-button" onClick={(e) => {
                        e.stopPropagation()
                        setOpenSubcategory(!openSubcategory)


                    }}>اختر</button>
                </MenuItem>
            </Select>
        </>
    );
};
export default CheckMarks;


