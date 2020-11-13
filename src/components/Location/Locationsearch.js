import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useStyles} from '../Search';
import { useForm } from "react-hook-form";
import className from "classnames";

export const Locationsearch = ({ location,formSubmitA }) => {
  const styles = useStyles();
  const { handleSubmit, register, errors } = useForm();
 
  const onSubmit = values =>{
     formSubmitA(values.location);
  };

    return (
        <>
            <Grid item>
            <Paper style={{height:"200px"}}  className={styles.paper}>
              <h3>Location to lng,lat</h3>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <input
                name="location"
                id="standard-full-width"
                className={className("input","form-control",{"is-invalid":errors.location})}
                label="Enter Location"
                style={{ margin: 8 }}
                margin="normal"
                ref={register({
                  required:"This field is required",
                  // pattern:{
                  //   value:/^[A-Za-z]+$/,
                  //   message:"Please add numbers only"
                  // }
                })}

              />
                {errors.location
                 && 
                 <div className="invalid-feedback">
                   {errors.location.message}
                 </div>
                 }
               <br/><br/>
              <Button variant="contained" type="submit">Search</Button>
              </form>
            </Paper>
          </Grid>
        </>
    )

}
