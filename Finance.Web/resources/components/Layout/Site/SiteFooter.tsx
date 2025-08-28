import styled from 'styled-components'

const Footer = styled.footer`
    width: 100%;
    margin-top: 12px;
    padding: 28px 12px 0 12px;
    border-top: 1px solid rgba(255,255,255,0.08);
    background: transparent;
`

const FooterContent = styled.div`
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 12px 0 24px 0;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 24px;

    @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    .logo {
        width: 100px;
        height: 100px;
        border-radius: 8px;
    }

    .name {
        margin: 0;
        font-weight: 800;
        color: var(--color-text-primary);
        font-size: 30px;
    }

    .desc {
        margin: 2px 0 0 0;
        color: var(--color-text-secondary);
        font-size: 15px;
    }
`

const Column = styled.div`
    .title {
        margin: 0 0 10px 0;
        color: var(--color-text-primary);
        font-weight: 700;
        font-size: 16px;
    }

    .list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 8px;
    }

    a {
        color: var(--color-text-secondary);
        text-decoration: none;
    }

    a:hover { color: var(--color-primary); }
`

const Legal = styled.div`
    width: min(100%, 1280px);
    margin: 0 auto;
    padding: 12px 0 24px 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;

    .links {
        display: flex;
        align-items: center;
        gap: 8px;

        @media (max-width: 640px) { flex-direction: column; }
    }

    .dot { opacity: 0.6; }

    a { 
        color: var(--color-text-secondary); 
        text-decoration: none;

        @media (max-width: 640px) { margin-top: 8px; }
    }

    a:hover { color: var(--color-primary); }

    @media (max-width: 640px) {
        flex-direction: column;
        align-items: flex-start;
    }
`

export default function SiteFooter() {
    return (
        <Footer aria-label="Rodapé do site">
            <FooterContent>
                <Brand>
                    <img className="logo" src="/minilogo_financeapp.png" alt="Logo FinanceApp" loading="lazy" />
                    <div>
                        <div className="name">FinanceApp</div>
                        <p className="desc">Gerencie suas finanças de forma simples e prática.</p>
                    </div>
                </Brand>

                <Column>
                    <div className="title">Links úteis</div>
                    <ul className="list">
                        <li><a href="https://github.com/GustavoHBarth/FinanceApp" target="_blank" rel="noopener noreferrer">Repositório</a></li>
                    </ul>
                </Column>

                <Column>
                    <div className="title">Autor / Contato</div>
                    <ul className="list">
                        <li>Gustavo Henrique Barth</li>
                        <li><a href="https://github.com/GustavoHBarth" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://www.linkedin.com/in/gustavo-henrique-barth/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://seuportfolio.com" target="_blank" rel="noopener noreferrer">Portfólio (em breve)</a></li>
                        <li><a href="mailto:barthgustavo5@gmail.com">barthgustavo5@gmail.com</a></li>
                    </ul>
                </Column>

                <Column>
                    <div className="title">Créditos</div>
                    <ul className="list">
                        <li>Projeto desenvolvido para estudos de C#, .NET e React.</li>
                        <li>UI com styled-components. Ícones por react-icons.</li>
                    </ul>
                </Column>
            </FooterContent>

            <Legal>
                <span>© 2025 FinanceApp. Todos os direitos reservados.</span>
                <div className="links">
                    <a href="/politica-de-privacidade">Política de Privacidade</a>
                    <span className="dot">•</span>
                    <a href="/termos-de-uso">Termos de Uso</a>
                </div>
            </Legal>
        </Footer>
    )
}


