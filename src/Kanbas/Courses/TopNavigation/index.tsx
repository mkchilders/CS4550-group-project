import { HiMiniBars3, HiEye } from "react-icons/hi2";
import './index.css';
import { useLocation, useParams } from "react-router";
import { FaAngleDown, FaAngleRight, FaBars, FaBook, FaCalendarTimes, FaDesktop, FaEnvelopeOpen, FaEye, FaPencilAlt, FaPlug, FaPuzzlePiece, FaRegClock, FaRegQuestionCircle, FaRegShareSquare, FaRocket, FaTachometerAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { NavDropdown, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavigation = ({course} : any) => {
    const { pathname } = useLocation();
    const location = pathname.split('/').pop();
    return (
        <>
          <nav className="navbar navbar-light my-2 container-fluid d-none d-md-flex">
            <div className="d-flex flex-row align-items-center">
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
                <HiMiniBars3 />
              </button>
              <ol className="breadcrumb wd-breadcrumb">
                <li className="breadcrumb-item">{course?.name}</li>
                <li className="breadcrumb-item active">{location}</li>
              </ol>
            </div>
            <button type="button" className="btn btn-outline-secondary me-2">
              <HiEye /> Student View
            </button>
          </nav>

          <Navbar expand={'md'} className="d-flex d-md-none navbar bg-dark" data-bs-theme="dark">
            <div className="container-fluid m-1 align-items-center justify-content-between">
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
              <Navbar.Offcanvas 
                id={`offcanvasNavbar-expand-md`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                placement="start"
                className="w-100"
              >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                  <ul className="wd-offcanvas p-0">
                    <Link to="/Kanbas/Account">
                      <li><FaUserCircle className="mb-1 me-2"/> Account <FaAngleRight className="float-end mt-2"/></li>
                    </Link>
                    <Link to="/Kanbas/Dashboard">
                      <li><FaTachometerAlt className="mb-1 me-2"/> Dashboard</li></Link>
                    <Link to="Home">
                      <li className="wd-active"><FaBook className="mb-1 me-2"/> Courses <FaAngleRight className="float-end mt-2"/></li></Link>
                    <Link to="/Kanbas/Calendar"><li><FaCalendarTimes className="mb-1 me-2"/> Calendar</li></Link>
                    <Link to="/Kanbas/Inbox"><li>
                      <FaEnvelopeOpen className="mb-1 me-2"/> Inbox</li></Link>
                    <Link to="/Kanbas/History"><li><FaRegClock className="mb-1 me-2"/> History <FaAngleRight className="float-end mt-2"/></li></Link>
                    <Link to="/Kanbas/Studio"><li><FaDesktop className="mb-1 me-2"/> Studio</li></Link>
                    <Link to="/Kanbas/Commons"><li><FaRegShareSquare className="mb-1 me-2"/> Commons</li></Link>
                    <Link to="/Kanbas/Help"><li><FaRegQuestionCircle className="mb-1 me-2"/> Help <FaAngleRight className="float-end mt-2"/></li></Link>
                  </ul>
                </Offcanvas.Body>
              </Navbar.Offcanvas>

              <div className="text-white text-center">
                <div>{course?.number} {course?.name}</div>
                <div>{location}</div>
              </div>
              
              <div className="flex-row align-items-center">
                <button type="button" className="btn btn-dark p-0"><FaEye /></button>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                  <FaAngleDown className="text-white"></FaAngleDown>
                  {/* <FaTimes className="text-white"></FaTimes> */}
                </button>
              </div>
            </div>
          </Navbar>

          <div className="collapse" id="navbarToggleExternalContent">
            <div>
              <ul className="wd-collapse ps-0">
                <li className="wd-active">
                  <i className="fa fa-home"></i>
                  <a href="Home"> Home</a></li>
                <li>
                  <FaPuzzlePiece />
                  <Link to="Modules"> Modules</Link>
                </li>
                <li>
                  <FaPlug />
                  <Link to="http://piazza.com"> Piazza</Link></li>
                <li>
                  <FaPlug /><Link to="Zoom"> Zoom</Link>
                </li>
                <li>
                  <FaPencilAlt />
                  <a href="Assignments"> Assignments</a>
                </li>
                <li><FaRocket /><Link to="Quizzes"> Quizzes</Link></li>
                <li><FaBook /><Link to="Grades"> Grades</Link></li>
                <li><FaUserCircle /><Link to="People"> People</Link></li>
              </ul>
            </div>
          </div>

          <hr className="mt-0 mb-4 me-2"/>
        </>
    );
}

export default TopNavigation;