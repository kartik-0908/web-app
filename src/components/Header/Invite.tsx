// components/ButtonWithForm.js
import { useEffect, useRef, useState } from 'react';
import { Inviteform } from '../email-invite';
import { useUser } from '@clerk/nextjs';

const ButtonWithForm = () => {
    const { user } = useUser();
    const [isFormVisible, setFormVisible] = useState(false);
    const formRef = useRef<HTMLDivElement | null>(null);
    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };

    // Close if the esc key is pressed or click outside of the form
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (keyCode === 27) {
                setFormVisible(false);
            }
        };

        const clickOutsideHandler = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setFormVisible(false);
            }
        };

        document.addEventListener('keydown', keyHandler);
        document.addEventListener('mousedown', clickOutsideHandler);

        return () => {
            document.removeEventListener('keydown', keyHandler);
            document.removeEventListener('mousedown', clickOutsideHandler);
        };
    }, []);

    return (
        <>
            <button
                onClick={toggleForm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Show Form
            </button>

            {isFormVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0"></div>
                    <div
                        ref={formRef}
                        className="bg-white top-80 rounded shadow-lg z-999999999 relative"
                    >
                        <Inviteform shopDomain={user?.publicMetadata.shopDomain} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ButtonWithForm;
