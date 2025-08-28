import styled from 'styled-components'
import { FiTrendingUp, FiTarget, FiBarChart2, FiCheckCircle } from 'react-icons/fi'

const Section = styled.section`
    padding: 84px 0 24px 0;
    min-height: 100vh;
    box-sizing: border-box;
    scroll-margin-top: 84px;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
`

const Title = styled.h2`
    margin: 0;
    font-size: 40px;
    font-weight: 800;
    color: var(--color-text-primary);
    text-align: center;
`

const Subtitle = styled.p`
    margin: 0 0 40px 0;
    color: var(--color-text-secondary);
    text-align: center;
    font-size: 25px;
`

const Grid = styled.div`
    width: min(100%, 1280px);
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const Card = styled.div`
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    padding: 16px;
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 14px 28px rgba(0,0,0,0.30);
    backdrop-filter: blur(6px);
    min-height: 140px;

    .num {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: grid;
        place-items: center;
        background: var(--color-primary);
        color: #fff;
        font-weight: 800;
        font-size: 18px;
    }

    .icon { 
        color: var(--color-primary); 
        font-size: 22px; 
    }

    .title { 
        color: var(--color-text-primary); 
        font-weight: 700; 
        margin: 0 0 6px 0; 
    }

    .desc { 
        color: var(--color-text-secondary); 
        margin: 0; 
    }
`

const Showcase = styled.div`
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    margin-top: 24px;
    padding: 0;
    background: transparent;
    border: none;
    box-shadow: none;
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 380px;
`

const WaveCanvas = styled.div`
    position: relative;
    width: 100%;
    height: 460px;
    border-radius: 0;
    overflow: hidden;
    background: transparent;

    svg { 
        position: absolute; 
        inset: 0; 
        width: 100%; 
        height: 100%; 
    }
`

export default function SectionThree() {
    const steps = [
        { n: '1', icon: <FiCheckCircle className="icon" />, title: 'Cadastre suas contas e receitas', desc: 'Comece adicionando suas entradas e despesas principais.' },
        { n: '2', icon: <FiBarChart2 className="icon" />, title: 'Acompanhe em tempo real', desc: 'Visualize gráficos claros e relatórios automáticos.' },
        { n: '3', icon: <FiTarget className="icon" />, title: 'Defina suas metas', desc: 'Estabeleça objetivos financeiros e acompanhe seu progresso.' },
        { n: '4', icon: <FiTrendingUp className="icon" />, title: 'Tenha controle total', desc: 'Receba insights e veja exatamente para onde vai o seu dinheiro.' },
    ]

    return (
        <Section id="section-three">
            <Title>Veja como é fácil usar o FinanceApp</Title>
            <Subtitle>Em poucos passos você organiza sua vida financeira sem complicação.</Subtitle>

            <Grid>
                {steps.map((s, i) => (
                    <Card key={i}>
                        <div className="num">{s.n}</div>
                        <div>
                            <div className="title">{s.title}</div>
                            <p className="desc">{s.desc}</p>
                        </div>
                    </Card>
                ))}
            </Grid>

            <Showcase>
                <WaveCanvas>
                    <svg viewBox="0 0 1440 620" preserveAspectRatio="none" aria-hidden>
                        <defs>
                            <linearGradient id="waveGreen" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#34D399" stopOpacity="0.80" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0.75" />
                            </linearGradient>
                            <linearGradient id="waveGreenDark" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#0EA5A4" stopOpacity="0.55" />
                                <stop offset="100%" stopColor="#0E9F6E" stopOpacity="0.55" />
                            </linearGradient>
                            <linearGradient id="bgFade" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-surface-1)" stopOpacity="0" />
                                <stop offset="100%" stopColor="var(--color-surface-1)" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <path d="M0,360 C240,260 520,220 880,360 C1240,500 1440,460 1440,460 L1440,600 L0,600 Z" fill="url(#waveGreenDark)" opacity="0.8" />
                        <path d="M0,300 C300,140 620,220 960,340 C1300,460 1440,280 1440,280 L1440,600 L0,600 Z" fill="url(#waveGreen)" opacity="0.95" />
                        <path d="M0,540 C220,600 520,610 820,580 C1080,555 1260,520 1440,560 L1440,620 L0,620 Z" fill="url(#bgFade)" />
                    </svg>
                </WaveCanvas>
            </Showcase>
        </Section>
    )
}


