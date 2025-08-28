import { CSSProperties, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    min-height: 100vh;
    justify-content: flex-start;
    padding: 32px 0 48px 0;
    box-sizing: border-box;
    gap: 20px;
`

const Title = styled.h2`
    text-align: center;
    margin: 0;
    font-size: 40px;
    font-weight: 800;
    color: var(--color-text-primary);
`

const Subtitle = styled.p`
    text-align: center;
    font-size: 25px;
    margin: 0;
    color: var(--color-text-secondary);
`

const CarouselFrame = styled.div`
    position: relative;
    width: 100%;
    max-width: 1100px;
    aspect-ratio: 16 / 11;
    overflow: visible;
`

const CarouselContainer = styled.div`
    position: absolute;
    inset: 0;
    overflow: visible;
    border-radius: 16px;
    background: transparent;
    perspective: 1000px;
`

const Stage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    pointer-events: none;
`

const SlideCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding: 20px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 88%;
    height: 84%;
    transform: translate(-50%, -50%);
    border-radius: 18px;
    background: var(--color-surface-2, #0f172a);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 14px 28px rgba(0,0,0,0.30);
    transition: transform 600ms ease, opacity 600ms ease;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: -1px;
        background:
            radial-gradient(700px 360px at 15% -20%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.00) 60%),
            radial-gradient(700px 360px at 85% 120%, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.00) 60%);
        pointer-events: none;
        z-index: 0;
    }

    .imageWrap, .divider, .contentWrap { 
        position: relative; 
        z-index: 1; 
    }

    .imageWrap {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
    }

    .contentWrap {
        width: 50%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 8px;
        text-align: left;
    }

    .title { 
        font-size: 30px; 
        font-weight: 700; 
        text-align: center;
        color: var(--color-text-primary); 
        margin-bottom: 25px;
    }

    .body { 
        font-size: 14px; 
        color: var(--color-text-secondary); 
    }

    .features {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--color-text-secondary);
            font-size: 20px;
            margin-bottom: 8px;

            .icon {
                color: var(--color-primary);
                font-size: 20px;
                line-height: 1;
            }
        }
    }

    @media (max-width: 960px) {
        flex-direction: column;

        .imageWrap {
            width: 100%;
            height: 46%;
        }

        .contentWrap {
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            gap: 6px;
            text-align: center;
        }
    }
`

const NavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    background: var(--color-surface-2);
    color: #fff;
    cursor: pointer;
    transition: background 160ms ease, box-shadow 160ms ease;
    z-index: 2;

    &:hover { 
        background: var(--color-surface-2); 
        box-shadow: 0 8px 20px rgba(0,0,0,0.25); 
        border-color: rgba(255,255,255,0.20); 
    }

    &.prev { 
        left: -180px;
    }

    &.next { 
        right: -180px; 
    }

    @media (max-width: 1100px) {
        &.prev { 
            left: -72px;
        }

        &.next { 
            right: -72px;
        }
    }

    @media (max-width: 960px) {
        &.prev { 
            left: 6px; 
        }

        &.next { 
            right: 6px; 
        }
    }
`

const Dots = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    display: flex;
    gap: 8px;
    justify-content: center;
    z-index: 2;
`

const Dot = styled.button<{ $active?: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: ${props => (props.$active ? 'var(--color-primary)' : 'rgba(255,255,255,0.35)')};
    outline: none;
    cursor: pointer;
`

const AUTOPLAY_INTERVAL_MS = 10000

export default function SectionTwo() {
    const slides = useMemo(
        () => [
            {
                src: '/image-SectionTwo/Dashboard.svg',
                alt: 'Tenha no seu Dashboard o controle total do seu dinheiro.',
                features: [
                    'Gráficos interativos de despesas e receitas',
                    'Comparativo entre meses',
                    'Destaque das categorias com maiores gastos',
                    'Saldo atualizado automaticamente',
                    'Relatórios rápidos para metas financeiras',
                ],
            },
            {
                src: '/image-SectionTwo/piggy-back.svg',
                alt: 'Defina suas metas e transforme seus sonhos em conquistas.',
                features: [
                    "Defina objetivos financeiros e acompanhe seu progresso.",
                    "Criação de metas personalizadas (ex: economizar R$5.000)",
                    "Progresso atualizado automaticamente conforme suas transações",
                    "Alertas de metas concluídas ou expiradas",
                    "Motivação para manter disciplina financeira"
                ],
            },
            {
                src: '/image-SectionTwo/Investiment.svg',
                alt: 'Compreenda seus investimentos e maximize seus resultados.',
                features: [
                    'Cadastro de aplicações (ações, fundos, renda fixa, criptos etc.)',
                    'Acompanhamento da rentabilidade em tempo real',
                    'Comparativo entre diferentes tipos de investimentos',
                    'Gráficos de evolução do patrimônio investido',
                    'Relatórios para analisar riscos e oportunidades '
                ],
            },
            {
                src: '/image-SectionTwo/Expenses-income.svg',
                alt: 'Acompanhe suas despesas e maximize suas receitas.',
                features: [
                    'Cadastro de despesas e categorias',
                    'Lançamentos rápidos e recorrentes',
                    'Parcelas e vencimentos',
                    'Filtros e busca por período',
                    'Exportação de dados',
                ],
            },
        ],
        []
    )

    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)

    const goPrev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1))
    const goNext = () => setIndex(i => (i + 1) % slides.length)

    useEffect(() => {
        if (paused) return
        const id = setInterval(goNext, AUTOPLAY_INTERVAL_MS)
        return () => clearInterval(id)
    }, [paused, slides.length])

    function getRelativePosition(targetIndex: number, currentIndex: number, total: number): number {
        let diff = targetIndex - currentIndex
        const half = Math.floor(total / 2)
        if (diff > half) diff -= total
        if (diff < -half) diff += total
        return diff
    }

    function computeStyle(relative: number): CSSProperties {
        const distance = Math.abs(relative)
        const clamped = Math.min(distance, 3)

        const offsetX = 240
        const depthStep = 120 
        const scaleBase = 1
        const scaleStep = 0.08
        const rotateStep = 6

        const x = relative * offsetX
        const z = -clamped * depthStep
        const scale = scaleBase - clamped * scaleStep
        const rotateY = -relative * rotateStep

        const zIndex = 100 - distance
        const opacity = distance === 0 ? 1 : 0.25

        return {
            transform: `translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex: Number(zIndex),
            pointerEvents: distance === 0 ? 'auto' : 'none',
        }
    }

    return (
        <Section id="section-two">
            <Title>Saiba mais</Title>
            <Subtitle>Visualize suas finanças de forma simples, interativa e organizada.</Subtitle>

            <CarouselFrame>
            <CarouselContainer
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <Stage>
                    {slides.map((s, i) => {
                        const relative = getRelativePosition(i, index, slides.length)
                        const style = computeStyle(relative)
                        return (
                            <SlideCard key={i} style={style} onClick={() => relative !== 0 && setIndex(i)}>
                                <div className="imageWrap">
                                    <img src={s.src} alt={s.alt} />
                                </div>
                                <div className="contentWrap">
                                    <div className="title">{s.alt}</div>
                                    <ul className="features">
                                        {Array.isArray((s as any).features) && (s as any).features.map((f: string, idx: number) => (
                                            <li key={idx}><span className="icon">✔️</span> {f}</li>
                                        ))}
                                    </ul>
                                </div>
                            </SlideCard>
                        )
                    })}
                </Stage>

                <NavButton className="prev" aria-label="Anterior" onClick={goPrev} style={{ pointerEvents: 'auto' }}>
                    ‹
                </NavButton>
                <NavButton className="next" aria-label="Próximo" onClick={goNext} style={{ pointerEvents: 'auto' }}>
                    ›
                </NavButton>

                <Dots>
                    {slides.map((_, i) => (
                        <Dot key={i} $active={i === index} onClick={() => setIndex(i)} />
                    ))}
                </Dots>
            </CarouselContainer>
            </CarouselFrame>
        </Section>
    )
}
