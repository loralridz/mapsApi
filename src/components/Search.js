import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Locationsearch } from './Location/Locationsearch';
import { GeomerySearch } from './Geometry/GeomerySearch';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import { OutputLocation } from './Location/OutputLocation';
import { OutputGeometry } from './Geometry/OutputGeometry';
import MapContainer  from './MapContainer';
import { Distance } from './Distance/Distance';

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


let center= {lat:0,lng:0}; 
export const Search = ({}) => {

  const styles = useStyles();
  const [toggle, setToggle] = useState({
    geocode:false,
    reversecode:false,
    map:false,
  });
  const [location, setLocation] = useState("");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("")
  const [points, setPoints] = useState();
const [address, setAddress] = useState("")
let value={};
  let state= {
    toggleA : false,
    toggleB:false,
  }
  
  console.log("locationlocation", location)
  const formula ="d=Math.acos(Math.sin(Math.PI*40.753689/180.0)*Math.sin(Math.PI*35.707/180.0)+Math.cos(Math.PI*40.753689/180.0)*Math.cos(Math.PI*35.707/180.0)*Math.cos(Math.PI*(-73.986032)/180.0-Math.PI*(139.709)/180.0))*6378;"

  useEffect(() => {
    async function data(){
        const req= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
            params:{
                address:location,
                key:`AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
            }
        });

        // address=req.data.results[0].formatted_address;
        setlatitude(req.data.results[0].geometry.location.lat);
        setlongitude(req.data.results[0].geometry.location.lng);
        center= { lat: latitude, lng: longitude };
        // console.log(1);
        return req;
    }
    data();
}, [toggle.geocode]);

      const formSubmitA=(e)=>{
          e.preventDefault();
          setLocation(location);
          setToggle({
            geocode:true,
            map:true
          });
         
      }

      useEffect(() => {
        async function data(){
          let latitude,longitude=0;
          if(toggle.reversecode){
          let pts=points.split(',');
          latitude=JSON.parse(pts[0]);
          longitude=JSON.parse(pts[1]);}
            const req= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`,{
                params:{
                    key:`AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk`
                }
            });
            setAddress(req.data.results[0].formatted_address);
            center.lat= (req.data.results[0].geometry.location.lat);
            center.lng= (req.data.results[0].geometry.location.lng);
            // console.log(center)
            // console.log("2")
            // console.log(req)
            return req;
        }
        data();
    }, [toggle.reversecode]);

      const formSubmitB=(e)=>{
        e.preventDefault();
          setPoints(points);
          setToggle({
            reversecode:true
          });
          
    }
    const place="Kennedy Space Center Historic Launch Complex 39A";

  return (
    // <div className={styles.root}>
    //   <div className={styles.container}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
          <Locationsearch location={location} onChange={(e) => setLocation(e)} formSubmitA={formSubmitA}  />
          </Grid>
          <Grid item xs={4}>
          <GeomerySearch value={value} points={points} onChange={(e) => setPoints(e)} formSubmitB={formSubmitB} />
          </Grid>
          <Grid item xs={4}>
          <Distance/>
          </Grid>
          { toggle.geocode ? 
           ( <>
            <OutputLocation latitude={latitude} longitude={longitude} />
            </>
            ) : ""
          }
          { toggle.reversecode  ? 
          ( <>
            <OutputGeometry address={address} /> 
            </>
            ) : ""
          }
        {
          (toggle.reversecode || toggle.geocode) ?
          <MapContainer center={center}  />
          : ""
        }
        <MapContainer  />
        </Grid>

    //   </div>
    // </div> 
  )
}
