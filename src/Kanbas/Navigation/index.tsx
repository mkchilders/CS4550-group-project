import { Link, useLocation } from "react-router-dom";
import "./index.css";
import "../styles.css";
import { FaDesktop, FaShareSquare, FaTachometerAlt, FaRegUserCircle, FaRegCalendarAlt, FaRegClock, FaRegEnvelopeOpen, FaRegQuestionCircle, FaRegAddressBook } from "react-icons/fa";
function KanbasNavigation() {
  const links = [
    { label: "Account",   icon: <FaRegUserCircle className="fs-2" />  },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" />  },
    { label: "Courses",   icon: <FaRegAddressBook className="fs-2" />           },
    { label: "Calendar",  icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox",   icon: <FaRegEnvelopeOpen className="fs-2" />  },
    { label: "History", icon: <FaRegClock className="fs-2" />  },
    { label: "Studio",   icon: <FaDesktop className="fs-2" />           },
    { label: "Commons",  icon: <FaShareSquare className="fs-2" /> },
    { label: "Help",  icon: <FaRegQuestionCircle className="fs-2" /> },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation sticky-top vh-100 d-none d-md-block">
      <a href="http://northeastern.edu">
        <li><img width="60px" src="/images/northeastern-logo.png" alt=""/></li>
      </a>
      {links.map((link, index) => (
        <Link key={index} to={`/Kanbas/${link.label}`}> 
          <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
            <i>{link.icon}</i> <br/> {link.label}
          </li>
        </Link>
      ))}
    </ul>
  );
}
export default KanbasNavigation;