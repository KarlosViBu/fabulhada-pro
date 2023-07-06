import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="#019"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      d="M0 14h16v1H0zm16-2v1H0v-1l2-4h4v2h4V8h4zM3.5 5 8 .5 12.5 5H9v4H7V5z"
    />
  </svg>
)
export default SvgComponent
