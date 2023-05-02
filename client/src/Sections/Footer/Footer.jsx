import FooterLink from "./Components/FooterLink"

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer-section">
                <div className="footer-wrapper">
                    <FooterLink text='Aviso Legal' />
                    <FooterLink text='Política de cookies' />
                    <FooterLink text='Política de privacidad' />
                    <FooterLink text='Términos y condiciones' />
                </div>
                <p className="footer-copyright">@ Lukasz Maraj - All Rights Reserved - 2023</p>
            </section>
        </footer>
    )
}
export default Footer