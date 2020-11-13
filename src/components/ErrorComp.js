import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './Search';

export const ErrorComp = ({error}) => {
    const styles = useStyles();
    return (
        <>
            <Grid item xs={12}>
                <Paper className={styles.paper}>
                    <Typography noWrap>{error} Sorry, this page doesn't exist
                    </Typography>
                </Paper>
            </Grid>
        </>
    )
}
