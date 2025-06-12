
const Modal = ({movie, onClose}) => {
    

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <button onClick={onClose}>Close</button>

            </div>
        </div>
    );
};

export default Modal;
