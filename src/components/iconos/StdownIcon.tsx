import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="red"
    viewBox="0 0 2048 2048"
    {...props}
  >
    <path d="M384 384h1280l-640 1280L384 384z" />
  </svg>
)
export default SvgComponent
