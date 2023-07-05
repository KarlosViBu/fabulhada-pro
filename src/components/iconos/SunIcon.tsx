import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="#507" strokeLinecap="round" strokeWidth={2}>
      <circle cx={12} cy={32} r={5} fill="#507" fillOpacity={0.3}>
        <animate fill="freeze" attributeName="cy" dur="0.6s" values="32;12" />
      </circle>
      <g>
        <animateTransform
          fill="none"
          strokeDasharray={2}
          strokeDashoffset={2}
          attributeName="transform"
          dur="30s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </g>
    </g>
  </svg>
)
export default SvgComponent
