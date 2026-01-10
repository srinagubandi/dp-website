// Custom brand-aligned icons using DocPropel colors
// Primary: #0066B3 (blue), Secondary: #F7941D (orange)

interface IconProps {
  className?: string;
  size?: number;
}

export function DoctorIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="7" r="4" stroke="#0066B3" strokeWidth="2" />
      <path
        d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 14v4m-2-2h4"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DentistIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C8.5 2 6 4.5 6 7c0 2 1 3.5 1.5 5.5.5 2 1 4.5 1.5 7 .3 1.5 1 2.5 2 2.5s1.5-1 2-2.5c.5-2.5 1-5 1.5-7C15 10.5 16 9 16 7c0-2.5-2.5-5-4-5z"
        stroke="#0066B3"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M9 7h6"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="1" fill="#F7941D" />
      <circle cx="14" cy="10" r="1" fill="#F7941D" />
    </svg>
  );
}

export function PharmacyIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="3"
        y="6"
        width="18"
        height="15"
        rx="2"
        stroke="#0066B3"
        strokeWidth="2"
      />
      <path
        d="M7 6V4a2 2 0 012-2h6a2 2 0 012 2v2"
        stroke="#0066B3"
        strokeWidth="2"
      />
      <path
        d="M12 10v6m-3-3h6"
        stroke="#F7941D"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PTOTIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="5" r="3" stroke="#0066B3" strokeWidth="2" />
      <path
        d="M12 10v6"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 12l4 4 4-4"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 22l3-6h6l3 6"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GrowthPulseIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 12h4l3-9 6 18 3-9h4"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="12" r="2" fill="#0066B3" />
    </svg>
  );
}

export function PerformanceIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 3v18h18"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 14l4-4 4 4 6-6"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="8" r="2" fill="#F7941D" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="#0066B3"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AIOptimizeIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="9" stroke="#0066B3" strokeWidth="2" />
      <path
        d="M12 6v2m0 8v2m-6-6h2m8 0h2"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="#F7941D" />
      <path
        d="M12 9l1.5 2.5L12 15l-1.5-2.5L12 9z"
        fill="#0066B3"
      />
    </svg>
  );
}

export function PatientGrowthIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="9" cy="7" r="3" stroke="#0066B3" strokeWidth="2" />
      <path
        d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"
        stroke="#0066B3"
        strokeWidth="2"
      />
      <circle cx="17" cy="7" r="2" stroke="#F7941D" strokeWidth="2" />
      <path
        d="M17 11v4m-2-2h4"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ROIIcon({ className = "", size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" stroke="#0066B3" strokeWidth="2" />
      <path
        d="M12 6v12"
        stroke="#0066B3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 9c0-1.5 1.5-2 3-2s3 .5 3 2-1.5 2-3 2-3 .5-3 2 1.5 2 3 2 3-.5 3-2"
        stroke="#F7941D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
