import styled from 'styled-components'
import Header from '@/resources/components/Header/Header'

const Wrapper = styled.div`
    background: var(--color-surface-1);
    min-height: 100vh;
    color: var(--color-text-primary);
`

const Content = styled.div`
    width: min(100% - 24px, 1024px);
    margin: 24px auto;
    padding: 24px;
`

export default function SaibaMaisPage() {
    return (
        <>
        <Header variant="floating" />
        <Wrapper>
            <Content>
                <h1>Saiba mais</h1>
                <p>Entenda como o FinanceApp pode ajudar a organizar suas finanças e atingir metas com clareza. Explore recursos, perguntas frequentes e exemplos práticos.</p>
            </Content>
        </Wrapper>
        </>
    )
}



