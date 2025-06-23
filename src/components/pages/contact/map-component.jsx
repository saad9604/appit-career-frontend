import React from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import { officeAddresses } from "@/assets/data";
import Section from "../../../components/layout/section-box";
import Container from "../../../components/layout/container";
import Image from "next/image";

// const containerStyle = {
//     width: "100%",
//     height: "500px",
// };

// const center = {
//     lat: 20.5937,
//     lng: 78.9629, // center of India
// };

const MapComponent = () => {
  // const { isLoaded } = useJsApiLoader({
  //     id: "google-map-script",
  //     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // replace with your key
  // });

  // return isLoaded ? (
  //     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
  //         {officeAddresses.map((office, index) => (
  //             <Marker key={index} position={{ lat: office.lat, lng: office.lng }} title={office.address} />
  //         ))}
  //     </GoogleMap>
  // ) : (
  //     <p>Loading Map...</p>
  // );

  return (
    <Section>
      <Container className="!py-8">
        <Image
          src={"/images/map-big.png"}
          alt="Map"
          width={1000}
          height={1000}
          className="object-cover w-full h-full rounded-lg bg-transparent"
        />
      </Container>
    </Section>
  );
};

export default MapComponent;
