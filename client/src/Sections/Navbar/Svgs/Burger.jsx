const Burger = () => {
    return (
        <svg width="100" viewBox="0 0 100 100">
            <path d="M30 33h40c3.723 0 7.5 3.126 7.5 8.578S74.773 50 70 50H50" className="line top" />
            <path d="M30 50h40" className="line middle" />
            <path d="M70 67H30s-7.5-.802-7.5-8.366C22.5 51.071 30 50 30 50h20" className="line bottom" />
        </svg>
    )
}
export default Burger