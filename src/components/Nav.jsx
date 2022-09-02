import instagram from "../assets/instagram.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faComment,
  faBars,
  faCompass,

} from "@fortawesome/free-solid-svg-icons";


export default function Nav (){

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += "responsive";
    } else {
      x.className = "topnav";
    }
  }

 
        return (
          <nav id="myTopnav" className="topnav">
            <button className="logo">
              <img src={instagram} alt="" />
            </button>
            <input type="text" className="search" placeholder="search" />
            <span className="nav-links">
            <a href="#home">
              <button>
              <FontAwesomeIcon className="fa-icon"icon={faHome} />
              </button>
              </a>
              <a href="#comment">
              <button>
              <FontAwesomeIcon className="fa-icon"icon={faComment} />
              </button>
              </a>
              
              <a href="#heart">
              <button>
              <FontAwesomeIcon className="fa-icon"icon={faHeart} /> 
              </button>
              </a>
              <a href="#moon">
              <button >
                <FontAwesomeIcon icon ={faCompass} />
              </button>
              </a>
              
              <button onClick={myFunction} className="hamburger">
              <FontAwesomeIcon icon={faBars} />
              {/* <FontAwesomeIcon icon={faClose} /> */}

              </button>

              
            
            </span>
          </nav>
        );
}