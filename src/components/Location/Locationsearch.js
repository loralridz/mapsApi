import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useStyles} from '../Search';

export const Locationsearch = ({ location, onChange,formSubmitA }) => {

  const styles = useStyles();
 
    return (
        <>
            <Grid item>
            <Paper className={styles.paper}>
              <h3>Location to lng,lat</h3>
              <form>
              <TextField
                onChange={e => onChange(e.target.value)}
                 value={location}
                name="location"
                id="standard-full-width"
                label="Enter Location"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              /> <br />
              <br />
              <Button variant="contained" onClick={formSubmitA}>Search</Button>
              </form>
            </Paper>
          </Grid>
        </>
    )

}
