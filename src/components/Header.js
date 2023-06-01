import React from "react";
import Logo from "../images/logo.png"
import '../styles/Header.css'

export default function Header(){
    return (
        <header className="header">
            <img src={Logo} className="header-logo"/>
            <h2 className="header-title">TypingTest</h2>

        </header>
    )
}