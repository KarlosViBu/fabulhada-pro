import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 14 14"
    {...props}
  >
    <g fill="none" stroke="#33496a" strokeLinecap="round" strokeLinejoin="round">
      <rect width={5} height={7} x={8.5} y={6.5} rx={0.5} />
      <rect width={5} height={3.01} x={8.5} y={0.5} rx={0.5} />
      <rect width={5} height={7} x={0.5} y={0.5} rx={0.5} />
      <rect width={5} height={3.01} x={0.5} y={10.49} rx={0.5} />
    </g>
  </svg>
)
export default SvgComponent
