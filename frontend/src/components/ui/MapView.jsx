"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

import { Fragment, useEffect } from "react";
import { userIcon, vendorIcon } from "@/lib/mapIcons";
import { useRouter } from "next/navigation";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FitBounds({ userLocation, vendors }) {
  const map = useMap();

  useEffect(() => {
    if (!userLocation) return;

    const bounds = L.latLngBounds([
      [userLocation.latitude, userLocation.longitude],
    ]);

    vendors.forEach((vendor) => {
      if (vendor.shopLocation?.latitude && vendor.shopLocation?.longitude) {
        bounds.extend([
          vendor.shopLocation.latitude,
          vendor.shopLocation.longitude,
        ]);
      }
    });

    map.fitBounds(bounds, {
      padding: [80, 80],
    });
  }, [map, userLocation, vendors]);

  return null;
}

export default function MapView({
  userLocation,

  vendors,
}) {
  const router = useRouter();

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading Map...
      </div>
    );
  }

  return (
    <MapContainer
      center={[userLocation.latitude, userLocation.longitude]}
      zoom={13}
      scrollWheelZoom
      className="w-full h-full z-0"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds userLocation={userLocation} vendors={vendors} />

      {/* User */}

      {/* <Marker position={[userLocation.latitude, userLocation.longitude]}> */}
      <Marker
        icon={userIcon}
        position={[userLocation.latitude, userLocation.longitude]}
      >
        <Popup>📍 Your Location</Popup>
      </Marker>
      

      {/* Vendors */}

      {/* {vendors.map((vendor) => (
        <Marker
          key={vendor._id}
          position={[
            vendor.shopLocation.latitude,

            vendor.shopLocation.longitude,
          ]}
        >
          <Popup>
            <div className="space-y-2">
              <h2 className="font-bold">{vendor.shopNameEnglish}</h2>

              <p>{vendor.distance} KM Away</p>

              <button
                onClick={() =>
                  router.push(`/dashboard/user/${vendor.username}`)
                }
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                View Shop
              </button>
            </div>
          </Popup>
        </Marker>
      ))} */}
      {vendors
        .filter(
          (vendor) =>
            vendor.shopLocation &&
            vendor.shopLocation.latitude &&
            vendor.shopLocation.longitude,
        )
        .map((vendor) => (
          <Fragment key={vendor._id}>

          <Polyline
        key={`line-${vendor._id}`}
        positions={[
          [
            userLocation.latitude,
            userLocation.longitude,
          ],
          [
            vendor.shopLocation.latitude,
            vendor.shopLocation.longitude,
          ],
        ]} pathOptions={{color: "#22c55e", weight: 4,}}/>
          <Marker
          icon={vendorIcon}
            key={vendor._id}
            position={[
              vendor.shopLocation.latitude,
              vendor.shopLocation.longitude,
            ]}
          >
            <Popup>
              <div className="space-y-2">
                <h2 className="font-bold">{vendor.shopNameEnglish}</h2>

                <p>{vendor.distance} KM Away</p>

                <button
                  onClick={() =>
                    router.push(`/dashboard/user/${vendor.username}`)
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  View Shop
                </button>
              </div>
            </Popup>
          </Marker>
            </Fragment>

        ))}
    </MapContainer>
  );
}
