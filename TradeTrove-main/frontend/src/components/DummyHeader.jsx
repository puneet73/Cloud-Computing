import React from "react";

export default function DummyHeader() {

    var s = {
        height: "2cm",
        width: "5cm"
    }

    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <img style = {s} src="https://i.ibb.co/pj2QBzy/delivery-app.png" alt="delivery-app" border="0">
                    </img>
                </a>
            </div>
        </header>
    )
}