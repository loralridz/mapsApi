import React,{useState,useEffect} from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useStyles } from '../Search';
import Input from '@material-ui/core/Input';
import { useForm } from "react-hook-form";

import Button from '@material-ui/core/Button';
import {OutputDistance} from './OutputDistance';

export const Distance = () => {

    const styles = useStyles();
    const [distanceM, setDistanceM] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [toggle, setToggle] = useState(false)
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = values =>{
        const km = Math.acos(Math.sin(Math.PI*`${values.lat1}`/180.0)*Math.sin(Math.PI*`${values.lat2}`/180.0)+Math.cos(Math.PI*`${values.lat1}`/180.0)*Math.cos(Math.PI*`${values.lat2}`/180.0)*Math.cos(Math.PI*`${values.lng1}`/180.0-Math.PI*`${values.lng2}`/180.0))*6378
        const m = Math.acos(Math.sin(Math.PI*`${values.lat1}`/180.0)*Math.sin(Math.PI*`${values.lat2}`/180.0)+Math.cos(Math.PI*`${values.lat1}`/180.0)*Math.cos(Math.PI*`${values.lat2}`/180.0)*Math.cos(Math.PI*`${values.lng1}`/180.0-Math.PI*`${values.lng2}`/180.0))*3963
         setDistanceKm(km);
         setDistanceM(m);
        setToggle(true);
    };

    return (
        <div>
            
            
                <Paper className={styles.paper}>
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Grid container spacing={3}  justify="center" alignItems="center">
                            <Grid item xs={2}>  
                                <h4>Point 1</h4>
                            </Grid>  
                            <Grid item xs={5}>
                                <input  placeholder="Longitude" name="lng1" ref={register} required />
                            </Grid>
                            <Grid item xs={5}>
                                <input placeholder="Latitude" name="lat1" ref={register} required />
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}  justify="center" alignItems="center">
                            <Grid item xs={2}>
                                <h4>Point 2</h4>
                            </Grid>
                            <Grid item xs={5}>
                                <input placeholder="Longitude" name="lng2"  ref={register} required />
                            </Grid>
                            <Grid item xs={5}>
                                <input placeholder="Latitude" name="lat2" ref={register} required />
                            </Grid>   
                            <br/><br/>
                            <Button variant="contained" type="submit">Calculate</Button>
                            </Grid>
                        </form>
                    </Paper>
                    
                    { toggle ? 
            <OutputDistance distanceKm={distanceKm} distanceM={distanceM} />
            
             : ""
          }
                

           
        </div>
    )
}
