import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing(3)
    }
}));

export default function CheckboxesGroup({ handleFilterChange, state }) {
    const classes = useStyles();


    const { launchSuccess, landSuccess } = state;
    const error = [launchSuccess, landSuccess].filter((v) => v).length !== 2;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Apply Filter</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={launchSuccess} onChange={handleFilterChange} name="launchSuccess" />
                        }
                        label="Launch Success"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={landSuccess} onChange={handleFilterChange} name="landSuccess" />
                        }
                        label="Land Success"
                    />
                </FormGroup>
                <FormHelperText>Select Checkbox to Apply Filter</FormHelperText>
            </FormControl>
        </div>
    );
}
