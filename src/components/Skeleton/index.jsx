import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={320}
    height={500}
    viewBox="0 0 320 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" /> 
    <rect x="0" y="273" rx="0" ry="0" width="260" height="23" /> 
    <rect x="0" y="317" rx="0" ry="0" width="260" height="84" /> 
    <rect x="158" y="419" rx="25" ry="25" width="105" height="44" /> 
    <rect x="0" y="429" rx="26" ry="26" width="36" height="27" />
  </ContentLoader>
)

export default MyLoader