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
    const [error, setError] = useState({
        toggle: false,
        message: ""
    })
    const [distanceM, setDistanceM] = useState(0);
    const [distanceKm, setDistanceKm] = useState(0);
    const [location, setLocation] = useState("");
    const [longitude, setlongitude] = useState("");
    const [latitude, setlatitude] = useState("")
    const [points, setPoints] = useState();
    const [address, setAddress] = useState("");
    const [display, setDisplay] = useState({
        geocode: false,
        reversecode: false,
    });

    //Geocoding submit handler
    const formSubmitA = (location) => {
        setLocation(location);
        setToggle({
            geocode: true
        });
        dataA(location, true);
    }
    //geocoding API trigger
    async function dataA(locationn, geocode) {
        let req = {}
        if (geocode) {
            try {
                req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                    params: {
                        address: locationn,
                        key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
                    }
                });
                //set points to display output component
                setlatitude(req.data.results[0].geometry.location.lat);
                setlongitude(req.data.results[0].geometry.location.lng);
                //set display toggle
                setDisplay({
                    geocode: true
                })
                setError({
                    toggle: false,
                })
            } catch (e) {
                setError({
                    toggle: true,
                    message: "Error 404"
                })
            }
        }
        return req;
    }

    //Reverse Geocoding submit handler
    const formSubmitB = (points) => {
        setPoints(points);
        setToggle({
            reversecode: true
        });
        setError({
            toggle: false,
        })
        dataB(points, true)
    }
    async function dataB(latlng, reversecode) {
        let req = ''
        let latitude, longitude = 0;
        if (reversecode) {

            let pts = latlng.split(',');
            latitude = JSON.parse(pts[0]);
            longitude = JSON.parse(pts[1]);
            try {
                req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`, {
                    params: {
                        key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
                    }
                });
                //set address to display output component
                setAddress(req.data.results[0].formatted_address);
                //set display toggle
                setError({
                    toggle: false,
                })
                setDisplay({
                    reversecode: true
                })
            } catch (e) {
                setError({
                    toggle: true,
                    message: "Error 404"
                })
            }
        }
        return req;

    }

    //Calculate distance form handler
    const formSubmitC = (m, km) => {
        setDistanceM(m.toFixed(2));
        setDistanceKm(km.toFixed(2));
        if ((isNaN(m)) && (isNaN(km))) {
            setDisplay({
                geocode: false,
                reverse: false,
            })
            setError({
                toggle: true,
                message: "Invalid input"
            })
        }
        else {

            setError({
                toggle: false,
            })
            setToggle({
                distance: true,
                reversecode: false,
                geocode: false
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
            { toggle.geocode && display.geocode ?
                (<>
                    <OutputLocation latitude={latitude} longitude={longitude} />
                </>
                ) : ""
            }
            { toggle.reversecode && display.reversecode && (
                <OutputGeometry address={address} />

            )}

            { toggle.distance ?
                <OutputDistance distanceKm={distanceKm} distanceM={distanceM} />
                : ""
            }
            { error.toggle ?
                <ErrorComp error={error.message} />
                : ""
            }
        </Grid>
    )
}