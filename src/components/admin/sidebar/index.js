import React, { Component } from 'react';
// import { Link } from 'react-router-dom';


export default class Sidebar extends Component {
    render() {
        let role = sessionStorage.getItem("role");
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                
                            <a className="nav-link active" href="/" data-toggle="collapse" data-target="#collapsedash" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                                DASHBORD
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>

                            
                           

                            <div className="collapse" id="collapsedash" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="/admin">COMMANDES</a>
                                    {/* <a  className={role === "Admin"?"nav-link sub_nav_link ":"d-none"}  href="/admin/order/dashbord">TABLEAUX</a> */}
                                     <a  className="nav-link sub_nav_link "  href="/admin/order/dashbord">TABLEAUX</a>
                                </nav>
                            </div>

                            
                            
                            {/* <a    className={role === "Admin"?"nav-link collapsed":"d-none"}   href="#" data-toggle="collapse" data-target="#collapseLocations" aria-expanded="false" aria-controls="collapseLocations"> */}
                            <a    className="nav-link collapsed"   href="#" data-toggle="collapse" data-target="#collapseLocations" aria-expanded="false" aria-controls="collapseLocations">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                CLIENTS
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseLocations" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="/admin/customer/list">LISTES CLIENTS</a>
                                    <a className="nav-link sub_nav_link" href="/admin/customer/discu">LISTES DISCUSSIONS</a>
                                </nav>
                            </div>


                            
                            <a  className={role === "Admin"?"nav-link collapsed":"d-none"}  href="#" data-toggle="collapse" data-target="#collapseShops" aria-expanded="false" aria-controls="collapseShops">
                                <div className="sb-nav-link-icon"><i className="fas fa-store" /></div>
                                COMMERCIALS
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>

                            <div className="collapse" id="collapseShops" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="/admin/commercial/list">LISTES Commercials</a>
                                    <a className="nav-link sub_nav_link" href="/admin/commercial/listeprime">COMMERCIALS PRIMES</a>
                                </nav>
                            </div>


                            <a  className="nav-link collapsed"  href="#" data-toggle="collapse" data-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                                <div className="sb-nav-link-icon"><i className="fas fa-box" /></div>
                                PRODUITS DETAILS
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseProducts" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="/admin/product/list">LISTES PRODUITS</a>
                                    <a className="nav-link sub_nav_link" href="/admin/product/create">AJOUTER PRODUITS</a>
                                    <a className="nav-link sub_nav_link" href="/admin/product/more-photo">AJOUTER IMAGES</a>
                                </nav>
                            </div>


                            <a  className="nav-link collapsed"  href="#" data-toggle="collapse" data-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">
                            <div className="sb-nav-link-icon"><i className="fas fa-list" /></div>
                            CATEGORIES
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                        </a>
                        <div className="collapse" id="collapseCategories" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                <a className="nav-link sub_nav_link" href="/admin/category/list">LISTES CATEGORIES</a>
                                <a className="nav-link sub_nav_link" href="/admin/category/main-category">AJOUTER CATEGORIES</a>
                                <a className="nav-link sub_nav_link" href="/admin/category/sub-category">AJOUTER SUB-CAT</a>
                                <a className="nav-link sub_nav_link" href="/admin/category/child-category">AJOUTER CHILD-CAT</a>
                                <a className="nav-link sub_nav_link" href="/admin/category/coultail-category">AJOUTER COUL/DON </a>
                                <a className="nav-link sub_nav_link" href="/admin/category/homepub">AJOUTER VIDEOS-LOCALITE</a>

                            </nav>
                        </div>
                          
                            <a  className="nav-link collapsed"  href="#" data-toggle="collapse" data-target="#collapseGros" aria-expanded="false" aria-controls="collapseGros">
                                <div className="sb-nav-link-icon"><i className="fas fa-box" /></div>
                                PRODUITS GROS
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseGros" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="/admin/productgros/list">LISTES PRODUITS</a>
                                    <a className="nav-link sub_nav_link" href="/admin/productgros/create">AJOUTES PRODUITS</a>
                                    <a className="nav-link sub_nav_link" href="/admin/productgros/more-photo">AJOUTER IMAGES</a>
                                </nav>
                            </div>

                            <a className="nav-link" href="/admin/user/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                ADMINISTRATEUR
                            </a>


                            <a className="nav-link" href="/admin/order/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-cart-arrow-down" /></div>
                                ORDERS DETAILS
                            </a>


                            <a className="nav-link" href="/admin/serblog/service">
                                <div className="sb-nav-link-icon"><i className="fas fa-map-marked-alt" /></div>
                                SERVICES/BLOGS
                            </a>


                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}
