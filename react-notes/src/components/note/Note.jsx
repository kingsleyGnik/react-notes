import { useState } from "react";
import { a } from "react-router-dom";
import "./note.css";
import { BsPin } from "react-icons/bs"
import { Link } from 'react-router-dom'

//import BookmarkIcon from '@mui/icons-material/Bookmark';

export default function Note({ note, handleModal, noteIndex, handlePinNotes, handleArchive }) {
  var colors = [["photo"], ["#cfead9"], ["#f5f5dc"], ["pink"], ["#ebcd96"], ["#acd4ee"]]
  const [colorPalate, setColorPalate] = useState(false)
  const PF = "http://localhost:3000/images/";

  function daysSince(previousDate) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const currentDate = new Date();
    const prevTimestamp = new Date(previousDate).getTime();
    const currentTimestamp = currentDate.getTime();
    const diffDays = Math.round(Math.abs(currentTimestamp - prevTimestamp) / oneDay);
    //console.log('diffDays', diffDays)
    if(diffDays === 1 ){
      return 'just now'
    }
    return ` ${diffDays} days ago`;
  }

  const colorChange = (color) => {
    //const note = document.getElementsByClassName('note');
    console.log("colorChange", color, note)
    //note.style.backgroundColor = 'yellow';
    //note.style = { backgroundColor:"red" };
    let stylee = {
      backgroundImage: `url(${PF}${note.photo})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: color
    }
    // document.getElementById('id1').style = stylee
    if (color === "photo") {
      document.getElementById(note.title).style.backgroundImage = `url(${PF}${note.photo})`
      document.getElementById(note.title).style.backgroundSize = 'cover'
      document.getElementById(note.title).style.backgroundPosition = 'center'
      document.getElementById(note.title).style.backgroundRepeat = 'no-repeat'
    } else {
      document.getElementById(note.title).style.backgroundColor = color
      document.getElementById(note.title).style.backgroundImage = ''

    }
    setColorPalate(false)

    //console.log("document color change after", document.getElementById('id1').style)
  }


  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }
  return (
    <div className="note" id={note.title} style={{ backgroundColor: note.color }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      {/* <img
        className="noteImg"
        src={img}
        alt=""
      /> */}

      {colorPalate && (<div className="colorPalate">
        {
          colors.map((color, i) => {
            // <div className="colorPalateElement" style={{ backgroundColor: color[0], borderRadius: "50%" }} onClick={() => { colorChange(color[0]) }}>
            //   o
            // </div>
            if (color[0] === 'photo') {

              return (<button
                key={i}
                className="colorPalateElement"
                style={{ backgroundImage: `url(${PF}${note.photo})`, backgroundSize: "contain", borderRadius: "50%" }}
                onClick={() => colorChange(color[0])}
              />)
            } else {
              return (<button
                key={i}
                className="colorPalateElement"
                style={{ backgroundColor: color[0], borderRadius: "50%" }}
                onClick={() => colorChange(color[0])}
              />)
            }

          }
          )
        }
      </div>)}
      <div className="noteInfo" >

        {isHovering && note.pin === false &&
          <i className="fa-regular fa-bookmark pinIcon" onClick={() => { handlePinNotes(note) }}></i>
        }
        {isHovering && note.pin === true &&
          <i className="fa-solid fa-bookmark pinIcon" onClick={() => { handlePinNotes(note) }}></i>
        }

        <span className="noteTitle" onClick={() => { handleModal(note) }} >
          <a to="/note/abc" className="nav-link">
            {note.title}
          </a>
        </span>
        <span className="noteDate" onClick={() => { handleModal(note) }} >Last edited at: {daysSince(note.date)}</span>
        <p className="noteDesc" onClick={() => { handleModal(note) }}>
          {note.desc}
        </p>
      </div>
      {/* <div>
        <div className="batch">
          <div className="">
            <label className="batch-lable">movie</label>
          </div>
          <div className="batch-remove">x
          </div>
        </div>
      </div> */}
      
      <div className="colorPalateContainer">
        {isHovering ? (<>
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { setColorPalate(true) }} >
            <i class="fa-solid fa-palette"></i>
          </Link>
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
            <i class="fa-solid fa-box-archive"  ></i>
          </Link>
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
          <i class="fa-solid fa-tags"></i>
          </Link>
          {/* <div className="tag-dropdown">
            <label>add tag</label>
            <input type='text' className="tag-input"></input>
          </div> */}
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
            <i class="fa-solid fa-stopwatch"></i>
          </Link>
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
            <i class="fa-solid fa-image"></i>
          </Link>
          <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
            <i class="fa-sharp fa-solid fa-circle-info"></i>
          </Link>
        </>) : (
          <div style={{ visibility: "hidden" }}>
            <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { }} >
              <i class="fa-solid fa-palette"></i>
            </Link>

          </div>)}

        {/* <Link className="link" to={`/write/${singleNote.noteId}`}>
        </Link> */}
        {/* <i className=" far fa-edit" ></i>
        <i className=" far fa-trash-alt" > </i> */}
        

      </div>
    </div>
  );
}