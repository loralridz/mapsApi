import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useStyles} from '../Search';
import { useForm } from "react-hook-form";
import className from "classnames";

export const GeomerySearch = ({ points,formSubmitB }) => {
    const styles = useStyles();
    const { handleSubmit, register, errors } = useForm();
 
    const onSubmit = values =>{
       formSubmitB(values.points);
    };
  
    return (
        <>
        <Grid item>
        <Paper className={styles.paper}>
          <h3>Lat,Lng to location</h3>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
          className={className("form-control",{"is-invalid":errors.points})}

            name="points"
            id="standard-full-width"
            label="Enter lat,lng"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            ref={register({
              required:"This field is required",
              // pattern:{
              //   value:/^[0-9,]*$/,
              //   message:"Please enter comma seprated numbers"
              // }
            })}

          />
            {errors.points
             && 
             <div className="invalid-feedback">
               {errors.points.message}
             </div>
             } <br /><br />
          <Button variant="contained" type="submit">Search</Button>
          </form>
        </Paper>
      </Grid>
    </>
    )
}
