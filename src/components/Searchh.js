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
import { OutputDistance } from './Distance/OutputDistance';
import { ErrorComp } from '../../src/components/ErrorComp';

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
  const styles = useStyles();
  const [error, setError] = useState("")
  const [toggle, setToggle] = useState({
    geocode: false,
    geocodeDisplay: false,
    distance: false,
    error: false
  });
  const [displaytoggle, setDisplayToggle] = useState({
    reversecodeDisplay: false,
    reversecode: false,
  })
  const [location, setLocation] = useState("");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("")
  const [distanceM, setDistanceM] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [points, setPoints] = useState();
  const [address, setAddress] = useState("")

  //Geocode submit handler
  const formSubmitA = (location) => {
    setLocation(location);
    setToggle({
      geocode: true
    });
    console.log(toggle)
  }

  // used for Geocode output 
  useEffect(() => {
    async function data() {
      const req = {};
      console.log(toggle.geocode)
        try {
          req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              address: location,
              key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
            }
          });
          console.log(latitude)
          setlatitude(req.data.results[0].geometry.location.lat);
          setlongitude(req.data.results[0].geometry.location.lng);
         
        } catch (e) {
          // setError("404 Error");
          // console.log("errorr")
          // setToggle({
          //   error: true
          // });
        }
        return req;
      
    }
    data();
  }, [toggle.geocode]);

  

  useEffect(() => {
    async function data() {
      const req = {};
      let latitude, longitude = 0;
      if (toggle.reversecode) {
        let pts = points.split(',');
        latitude = JSON.parse(pts[0]);
        longitude = JSON.parse(pts[1]);
      }
      if (toggle.reversecode) {
        try {
          req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`, {
            params: {
              key: `AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
            }
          });
          setAddress(req.data.results[0].formatted_address);
          setlatitude(req.data.results[0].geometry.location.lat);
          setlongitude(req.data.results[0].geometry.location.lng);
          setDisplayToggle({
            reversecodeDisplay: true
          });
        } catch (e) {
          setError("404 Error")
          console.log("errorr")
          setToggle({
            error: true
          });
        }
        return req;
      }
    }
    data();
  }, [toggle.reversecode]);


  const formSubmitB = (points) => {
    setPoints(points);
    setToggle({
      reversecode: true,
      map: true
    });

  }
  //Calculate distance
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
      console.log(67)
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
      {
        toggle.error ?
          <ErrorComp error={error} />
          : ""
      }
      { toggle.reversecode && toggle.reversecodeDisplay ?
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
