import React,{useState} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useStyles} from '../Search';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const GeomerySearch = ({ points,onChange, value,formSubmitB }) => {
// const [lat, setLat] = useState('');
// const [lng, setLng] = useState('');
    const styles = useStyles();
    // const handleChange = (e) => {

    //     e.preventDefault();
    //    value={
    //        lat,lng
    //    }
    //       formSubmitB(value);
    //   };

    return (
        <>
        <Grid item>
        <Paper className={styles.paper}>
          <h3>Lat,Lng to location</h3>
          <form>
          <TextField
            onChange={e => onChange(e.target.value)}
             value={points}
            name="location"
            id="standard-full-width"
            label="Enter lat,lng"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          /> <br />
          <br />
          <Button variant="contained" onClick={formSubmitB}>Search</Button>
          </form>
        </Paper>
      </Grid>
    </>
        // <>
        //     <Grid item xs={12} sm={6}>
        //     <Paper className={styles.paper}>
        //       <h3>lng,lat to Location</h3>
        //       <br />
        //       <form>
        //       <Input onChange={e => setLng(e.target.value)} value={lng} style={{ margin: '0.2em' }} name="lng" placeholder="Longitude" inputProps={{ 'aria-label': 'description' }} />
        //       <Input onChange={e => setLat(e.target.value)} value={lat} style={{ margin: '0.2em' }} name="lat" placeholder="Latitude" inputProps={{ 'aria-label': 'description' }} />
        //       <br/><br/>
        //       <Button variant="contained" onClick={handleChange} >Search</Button>  <br /><br />
        //       </form>
        //     </Paper>
        //   </Grid>
        // </>
    )
}
