import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ children, closeBtnText, ref }) {
    const dialog = useRef();
    useImperativeHandle(ref, () => {
        return {
            open() {
                return dialog.current.showModal();
            },
            close() {
                return dialog.current.close();
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
            {children}
            <form method="dialog" className="mt-4 text-right">
                <Button>{closeBtnText}</Button>
            </form>
        </dialog>, document.getElementById('modal-root')
    );
}