import React, { useEffect, useState } from 'react'
import Note from '../note/Note'
import "./notes.css"
import axios from "axios"
import { Link } from 'react-router-dom'

import { FiEdit3, FiTrash } from "react-icons/fi";

export default function Notes({ searchStr }) {

  const PF = "http://localhost:3000/images/";
  const [notes, setNotes] = useState([])
  const [pinNotes, setPinNotes] = useState([])
  const [archiveNotes, setArchive] = useState([])
  const [notess, setNotess] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [singleNote, setSingleNote] = useState(null)
  var user = null;
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });
  const [colorPalate, setColorPalate] = useState(false)


  useEffect(() => {
    var userdata = JSON.parse(localStorage.getItem("user"))
    user = userdata;
    getAllNotes()
  }, [])

  useEffect(() => {
    var temp = [...notes]
    if (searchStr == "" || searchStr == undefined) {
      //console.log("inside notes not a str", searchStr, notess);
      var tempNotess = [...notess]
      setNotes(tempNotess)
    } else {
      var userNotes = temp.filter((note, i) => {
        if (note.title.search(searchStr) > -1) {
          return note
        } else {
          return ""
        }
      })
      setNotes(userNotes)
    }

  }, [searchStr])

  const handleModal = (noteParam) => {
    setOpenModal(!openModal)
    //console.log("modal clicked note ", notes[i])
    //singleNote = notes[i]
    //var tempNote = notes[i] || pinNotes[i]
    setSingleNote(noteParam)
    //console.log("opsetOpenModal(true)", i, singleNote, openModal)
  }

  const handlePinNotes = async (noteParam, i) => {
    var notee = { ...noteParam }
    notee = { ...notee, pin: !notee.pin }
    var { noteId, ...other } = notee
    //console.log(i, notee.pin, noteParam, "fpin handle here", notee, other, noteId)
    await axios.put("http://localhost:3000/notes/" + noteId, other).then(res => {
      getAllNotes()
    })

  }




  const getAllNotes = async () => {
    var userdata = JSON.parse(localStorage.getItem("user"))
    await axios.get("http://localhost:3000/notes/allnotes").then(res => {
      var userNotes = res.data.filter((note, i) => { return note.username === userdata.username })
      //  userNotes = userNotes.filter((note, i) => { return note.archive === 0 })
      console.log("before", userNotes);
      userNotes = userNotes.filter((note, i) => {
        return note.archive === false
      })

      console.log(res.data, userNotes, "response data")
      // --- userNotes and other notes 
      var userNotess = userNotes.filter((note, i) => {
        return note.pin === false
      })
      console.log(userNotes, "filtered data")
      setNotes(userNotess)
      setNotess(userNotess)


      // --- pinned notes
      var pinNotess = userNotes.filter((note, i) => {
        return note.pin === true
      })
      setPinNotes(pinNotess)


      // --- archive notes

      // var archiveNotess = userNotes.filter((note, i) => {
      //   return note.archive === true
      // })
      // setArchive(archiveNotess)

    })
  }
  const removeNote = () => {
    axios.delete("http://localhost:3000/notes/" + singleNote.noteId).then(res => {
      setOpenModal(!openModal)
      getAllNotes()
    })
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleExpanded() {
    setExpanded(true);
  }

  function submitButton(event) {
    setNote({
      title: "",
      desc: "",
    });
    event.preventDefault();
  }

  const handleArchive = async (note) => {
    var temp = { ...singleNote }
    temp = { ...temp, archive: true }
    var { noteId, ...other } = temp
    //other.archive = true
    console.log("singleNote", noteId, other, temp)
    await axios.put("http://localhost:3000/notes/" + noteId, other).then(res => {
      setOpenModal(!openModal)
      getAllNotes()
    })
  }

  return (
    <>
      <div>
        <form className='formm'>
          {isExpanded && (
            <input
              className='inputt'
              value={note.title}
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          )}
          <p>
            <textarea
              className='textareaa'
              value={note.desc}
              onClick={handleExpanded}
              name="desc"
              placeholder="Take a note..."
              onChange={handleChange}
              rows={isExpanded ? 3 : 1}
            ></textarea>
          </p>
          {/* <button onClick={()=> {setExpanded(false)}} className="">
            close
          </button> */}
          <button onClick={submitButton} className="buttonn">
            <Link to="/write/create" state={note} className="" style={{ color: "#300000", marginBottom: "5px" }}>
              <FiEdit3 />
            </Link>
          </button>
        </form>

      </div>

      {/* {pinNotes[0] && (<div className='pinned-name' style={{ visibility: 'visible', display: "block", width: "100%" }}>
        Pinned
      </div>)}

      {pinNotes[0] && (<div className="notes">
        {pinNotes.map((note, i) => (<Note note={note} key={i} noteIndex={i} handleModal={handleModal} handlePinNotes={handlePinNotes}></Note>))}
      </div>)}

      {pinNotes[0] && (<div className='pinned-name' style={{ visibility: 'visible' }}>
        Others
      </div>)} */}

      {pinNotes[0] && (
        <>
          <div className='pinned-name' style={{ visibility: 'visible', display: "block", width: "100%" }}>
            Pinned
          </div>
          <div className="notes">
            {pinNotes.map((note, i) => (<Note note={note} key={i} noteIndex={i} handleModal={handleModal} handlePinNotes={handlePinNotes} colorPalate={colorPalate} setColorPalate={setColorPalate} ></Note>))}
          </div>

        </>
      )}
      {notes[0] && pinNotes[0] && (<div className='pinned-name' style={{ visibility: 'visible' }}>
        Others
      </div>)}

      <div className="notes">
        {notes.map((note, i) => (<Note note={note} key={i} noteIndex={i} handleModal={handleModal} handlePinNotes={handlePinNotes} colorPalate={colorPalate} setColorPalate={setColorPalate} handleArchive={handleArchive}></Note>))}
      </div>

      {openModal && <div id="myModall" className="modall">
        <div className="modal-contentt" style={{ 
          backgroundImage: `url(${PF}${singleNote.photo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: singleNote.color
           }}>
          <span className="close" onClick={() => { setOpenModal(!openModal) }}>&times;</span>
          <div className='content-infoo'>
            <h1 className='modal-titlee'>{singleNote.title}</h1>
            <p style={{ color: "rgb(140 135 135)", fontSize: "18px" }}> {singleNote.desc}</p>
            {/* <span style={{marginBottom : "6px"}}>created at: {singleNote.date}</span> */}
            <div className="singleNoteEdit">
              <div>
              </div>
              <div>
                <Link className="" style={{ color: "#300000", marginRight: "9px" }} onClick={() => { handleArchive(note) }} >
                  <i class="fa-solid fa-box-archive"  ></i>
                </Link>
                <Link className="link" to={`/write/${singleNote.noteId}`} style={{ marginRight: "9px" }}>
                  <i className="singleNoteIcon far fa-edit" ></i>
                </Link>
                <i className="singleNoteIcon far fa-trash-alt" onClick={() => { removeNote() }}> </i>
              </div>
            </div>
          </div>
        </div>
      </div>}</>
  )
}

