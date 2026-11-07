"use client"

import React, { useState, useEffect } from "react"
import { TopIcon } from "./icons/TopIcon"

export function ToTopButton(): React.JSX.Element {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleVisibility = (): void => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            const maxScroll = docHeight - winHeight;

            if (maxScroll > 0) {
                const scrollPercent = scrollTop / maxScroll;

                setVisible(scrollPercent > 0.75);
            } else {
                setVisible(false);
            }
        }

        window.addEventListener("scroll", handleVisibility);

        handleVisibility();

        return () => {
            window.removeEventListener("scroll", handleVisibility);
        }
    }, [])

    const clickHandler = (): void => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    return (
        <button
            onClick={clickHandler}
            className={`btn fixed bottom-5 left-1/2 z-50 inline-flex items-center gap-1.5 cursor-pointer rounded-3xl bg-[#688E8F] text-white border-none hover:bg-[#023E3B] transition-all duration-500 ease-in-out transform -translate-x-1/2 ${visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0 pointer-events-none"
                }`}
        >
            <TopIcon className="w-5 h-5" /> Back to Top
        </button>
    )
}
