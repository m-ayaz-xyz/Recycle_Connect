"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { vendorIcon } from "@/lib/mapIcons";

export default function VendorMap({ vendor }) {

  if (
    !vendor?.shopLocation?.latitude ||
    !vendor?.shopLocation?.longitude
  ) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Location not added
      </div>
    );
  }

  return (
    <MapContainer
      center={[
        vendor.shopLocation.latitude,
        vendor.shopLocation.longitude,
      ]}
      zoom={16}
      className="w-full h-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        icon={vendorIcon}
        position={[
          vendor.shopLocation.latitude,
          vendor.shopLocation.longitude,
        ]}
      >
        <Popup>

          <div>

            <h2 className="font-bold">
              {vendor.shopNameEnglish}
            </h2>

            <p>{vendor.address}</p>

          </div>

        </Popup>

      </Marker>

    </MapContainer>
  );
}