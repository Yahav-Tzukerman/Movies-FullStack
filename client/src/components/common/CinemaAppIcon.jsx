const CinemaAppIcon = ({ size = 36, color = "#1976d2" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    fill="none"
    style={{ display: "inline-block", verticalAlign: "middle" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Movie ticket shape */}
    <rect
      x="6"
      y="13"
      width="38"
      height="24"
      rx="5"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
    />
    {/* Dotted line */}
    <line
      x1="17"
      y1="14"
      x2="17"
      y2="36"
      stroke="#fff"
      strokeWidth="2"
      strokeDasharray="3,2"
    />
    {/* Film holes */}
    <circle cx="11" cy="17" r="1.4" fill="#fff" />
    <circle cx="11" cy="25" r="1.4" fill="#fff" />
    <circle cx="11" cy="33" r="1.4" fill="#fff" />
    {/* Star */}
    <polygon
      points="30,19 31.8,23.3 36.6,23.3 32.6,26 34.3,30.3 30,27.5 25.7,30.3 27.4,26 23.4,23.3 28.2,23.3"
      fill="#ffd600"
      stroke="#fff"
      strokeWidth="1"
    />
  </svg>
);

export default CinemaAppIcon;
