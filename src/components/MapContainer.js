import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React from "react";

const mapStyles = {
  marginLeft: "30%",
  marginTop: "10%",
  width: "600px",
  height: "400px",
}; //map styling

export class MapContainer extends React.Component {
  
  render(props) {

const markerLatLng = {lat: 40.7059355, lng: -93.95711519999999}; // lat lng for markers, this can be array for multiple markers
const centerLatLng = {lat: 40.7059355, lng: -93.95711519999999}; // center lat lng for center of map where map should focus when loads
console.log('=========',this.props.google)

    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        // initialCenter={this.props.center}
        initialCenter={centerLatLng}
      >

        {/* use map function if markerLatLng is array in case of multiple markers */}
        <Marker
          // position={{
          //   lat: this.props.center.lat,
          //   lng: this.props.center.lng,
          // }}
          position={{
            lat: markerLatLng.lat,
            lng: markerLatLng.lng,
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAe8hdqRtQVz0X6TjSig4LT7nqniUIJaVk",
})(MapContainer); // GoogleApiWrapper is 
