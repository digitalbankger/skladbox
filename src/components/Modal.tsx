import React from "react";

interface ModalProps {
    children: React.ReactNode
    title: string
    onClose: () => void
}

export function Modal({ children, title, onClose }: ModalProps) {
    return (
        <>
            <div 
                className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
                onClick={onClose}
            />
            <div 
                className="w-[60%] bg-white p-5 rounded absolute top-1/2 left-1/2 -translate-x-1/2"
            >
                <h1 className="text-2xl text-center mb-3">{ title }</h1>
                { children } 
            </div>
        </>
    )
}