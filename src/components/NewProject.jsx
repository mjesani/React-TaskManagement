import { useRef } from "react";
import Input from "./common/Input";
import Modal from "./common/Modal";

export default function NewProject({ onCanelNewProject, onSaveProject }) {
    const modalRef = useRef();
    const titleInput = useRef();
    const descriptionInput = useRef();
    const dueDateInput = useRef();

    function handleSaveProject() {
        const enteredTitle = titleInput.current.value;
        const enteredDescription = descriptionInput.current.value;
        const enteredDueDate = dueDateInput.current.value;

        if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredDueDate.trim().length === 0) {
            modalRef.current.open();
            return;
        }

        var project = {
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        }
        onSaveProject(project);
    }
    return (
        <>
            <Modal ref={modalRef} closeBtnText='Close'>
                <h2 className='text-xl font-bold text-stone-600 my-4'>Invalid Input</h2>
                <p className='text-stone-600 mb-4'>Please enter correct value for all the inputs.</p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button className="text-stone-800 hover:text-stone-950" onClick={onCanelNewProject}>Cancel</button>
                    </li>
                    <li>
                        <button className=" px-6  py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSaveProject}>Save</button>
                    </li>
                </menu>

                <div>
                    <Input label="Title" ref={titleInput} />
                    <Input label="Description" type='textarea' ref={descriptionInput} />
                    <Input label="Due Date" type='date' ref={dueDateInput} />
                </div>
            </div>
        </>

    );
}