import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Locationsearch } from './Location/Locationsearch';
import { GeomerySearch } from './Geometry/GeomerySearch';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import { OutputLocation } from './Location/OutputLocation';
import { OutputGeometry } from './Geometry/OutputGeometry';
import MapContainer from './MapContainer';
import { Distance } from './Distance/Distance';
import { ErrorComp } from '../../src/components/ErrorComp';

import { OutputDistance } from './Distance/OutputDistance';

//MUI styling
export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            // width: '25ch',
        },
        paper: {
            height: '190px',
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);


export const Search = ({ }) => {
    //import styles
    const styles = useStyles();

    //Component states
    const [toggle, setToggle] = useState({
        geocode: false,
        reversecode: false,
    });
    const [error, setError] = useState("")
    const [distanceM, setDistanceM] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [location, setLocation] = useState("");
    const [longitude, setlongitude] = useState("");
    const [latitude, setlatitude] = useState("")
    const [points, setPoints] = useState();
    const [address, setAddress] = useState("");

    //Geocoding submit handler
    const formSubmitA = (location) => {
        setLocation(location);
        setToggle({
            geocode: true
        });
    }
    //geocoding API trigger
    useEffect(() => {
        async function data() {
            const req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: location,
                    key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
                }
            });
            //set points to display output component
            setlatitude(req.data.results[0].geometry.location.lat);
            setlongitude(req.data.results[0].geometry.location.lng);
            return req;
        }
        data();
    }, [toggle.geocode]);

    //Reverse Geocoding submit handler
    const formSubmitB = (points) => {
        setPoints(points);
        setToggle({
            reversecode: true
        });
    }

    // Reverse geocoding API trigger
    useEffect(() => {
        async function data() {
            let latitude, longitude = 0;
            if (toggle.reversecode) {
                let pts = points.split(',');
                latitude = JSON.parse(pts[0]);
                longitude = JSON.parse(pts[1]);
            }
            const req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`, {
                params: {
                    key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
                }
            });
            //set address to display output component
            setAddress(req.data.results[0].formatted_address);
            return req;
        }
        data();
    }, [toggle.reversecode]);

   
    //Calculate distance form handler
    const formSubmitC = (m, km) => {
        setDistanceM(m);
        setDistanceKm(km);
        if ((isNaN(m)) && (isNaN(km))) {
            setError("Invalid Input")
            console.log("error")
            setToggle({
                error: true
            });

        }
        else {
            setToggle({
                error: false,
                distance: true
            })
        }
    }
    //JSX
    return (
        <Grid container spacing={3}>
            <Grid item xs={4}>
                <Locationsearch location={location} formSubmitA={formSubmitA} />
            </Grid>
            <Grid item xs={4}>
                <GeomerySearch points={points} formSubmitB={formSubmitB} />
            </Grid>
            <Grid item xs={4}>
                <Distance distanceM={distanceM} distanceKm={distanceKm} formSubmit={formSubmitC} />
            </Grid>
            { toggle.geocode ?
                (<>
                    <OutputLocation latitude={latitude} longitude={longitude} />
                </>
                ) : ""
            }
            { toggle.reversecode ?
                (<>
                    <OutputGeometry address={address} />
                </>
                ) : ""
            }
            { toggle.distance ?
                <OutputDistance distanceKm={distanceKm} distanceM={distanceM} />

                : ""
            }
        </Grid>
    )
}