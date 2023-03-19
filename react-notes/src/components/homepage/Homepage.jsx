import { useLocation } from "react-router";

import "./homepage.css";
import Notes from "../notes/Notes";

export default function Homepage() {
  //const location = useLocation();
  //console.log(location);
  return (
    <>
      
      <div className="home">
        {/* <h1 style={{alignItems: "center"}}>Notes</h1> */}
        <Notes></Notes>
      </div>
    </>
  );
}