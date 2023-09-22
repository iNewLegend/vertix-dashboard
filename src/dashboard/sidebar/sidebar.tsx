import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";

import ZenRedux from "@zenflux/redux";
import ZenCore from "@zenflux/core";


const menu = [
    {
        title: "Management",
        icon: <i className="bi bi-kanban"></i>,
        link: "management",
    },
    {
        title: "Configuration",
        icon: <i className="bi bi-gear"></i>,
        link: "configuration",
    },
    {
        title: "Customization",
        icon: <i className="bi bi-palette"></i>,
        link: "customization",
    },
];

export default function Sidebar() {
    const profile = ZenRedux.hooks.useControllerProperty( "Auth/Controller", "profile" );

    const location = useLocation(),
        active = location.pathname.replace( "/dashboard/", "" );

    const navigate = useNavigate();

    return (
        <>
            <div id="sidebar" className="d-flex flex-column flex-shrink-0 min-vh-100 shadow user-select-none">
                <div className="header pt-5 pb-5">
                    <div className="logo text-center pt-3 pb-3">
                        <a className="text-decoration-none cursor-pointer" onClick={ () => window.location.reload() }>
                            <img alt="logo" className="bi pe-none m-auto cursor-pointer" width="70" src="/vertix-optimized.gif"/>
                            <br/>
                            <span className="text fs-2 ft-roboto">Vertix</span>
                            <span className="beta">&nbsp;beta</span>
                        </a>
                    </div>
                </div>

                <Nav className="nav nav-pills flex-column mb-auto" prefix={ "dashboard" } as="ul">
                    <Nav.Link disabled={true} className="d-flex" as="li">
                        <span className=" rounded-0 text-muted w-100">
                            <span className="title">General</span>
                        </span>
                    </Nav.Link>

                    { menu.map( ( item, index ) => (
                        <Nav.Item className="d-flex" as="li" key={ index }>
                            <Link className={`nav-link rounded-0 text-light w-100 cursor-pointer ${ active.includes( item.link ) ? "active" : "" }`} to={ item.link }>
                                <span className="icon me-3 fs-4 user-select-none">{ item.icon }</span>
                                <span className="title fs-5">{ item.title }</span>
                            </Link>
                        </Nav.Item>
                    ) ) }
                </Nav>

                <Dropdown>
                    <Dropdown.Toggle as={ "a" }
                                     className="user-select-none d-flex align-items-center text-decoration-none dropdown-toggle cursor-pointer p-3 border-top border-top-1">
                        <img src={ profile.avatar } alt="" width="32" height="32" className="rounded-circle me-2"/>
                        <strong>{ profile.username }</strong>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="text-small shadow">
                        <Dropdown.Item className="text-decoration-none" as={ "a" } href={ "/" }>Profile</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={ () => navigate( "/auth/logout" ) }>Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="divider">

            </div>
        </>
    );
}
