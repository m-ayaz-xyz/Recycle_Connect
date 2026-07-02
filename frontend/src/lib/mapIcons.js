import L from "leaflet";

export const userIcon = new L.DivIcon({
  html: `
    <div style="
      width:22px;
      height:22px;
      background:#2563eb;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 0 10px rgba(0,0,0,.3);
    "></div>
  `,
  className: "",
  iconSize: [22, 22],
});

export const vendorIcon = new L.DivIcon({
  html: `
    <div style="
      width:38px;
      height:38px;
      background:#22c55e;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:20px;
      border:3px solid white;
      box-shadow:0 4px 12px rgba(0,0,0,.25);
    ">
      ♻️
    </div>
  `,
  className: "",
  iconSize: [38, 38],
});