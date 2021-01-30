import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [college, setCollege] = useState(2);

    const handleChange = (event, newValue) => {
        setCollege(newValue);
    };

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={college}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Item One" value="기호 일번" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />
                    </Tabs>
                </AppBar>
                <div>{`당신이 선택한 값은 : ${college}`}</div>
            </div>
        </>
    );
}
