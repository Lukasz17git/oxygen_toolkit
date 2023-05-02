
const ModalContainer = ({ children, closeModal, title }) => {
    return (
        <div className='modal-wrapper' >
            <div className='modal-background' onClick={closeModal} />
            <section className='modal-container'>
                <div className='modal-title-container'>
                    <h2 >{title}</h2>
                    <button className="i" aria-label="close">
                        <img className='i-close-modal' src='/CriticalIcons/close-modal.svg' alt='close-modal' loading='lazy' onClick={closeModal} />
                    </button>
                </div>
                {children}
            </section>
        </div>
    )
}

export default ModalContainer