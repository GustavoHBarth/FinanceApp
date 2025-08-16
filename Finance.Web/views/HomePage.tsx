import Header from '@/resources/components/Header/Header'
import styled from 'styled-components';

const Wrapper = styled.div`
  background: var(--color-surface-1);
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 24px;
  width: min(100%, 960px);
  color: var(--color-text-primary);
`

export default function HomePage() {
  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          <h1 style={{ margin: 0, fontSize: 28 }}>Bem-vindo ao Finance App</h1>
          <p style={{ marginTop: 8, color: 'var(--color-text-secondary)' }}>
            Organize suas finanças com clareza e segurança.
          </p>
        </Content>
      </Wrapper>
    </>
  )
}


