import styled from 'styled-components'
import { useState } from 'react'

export type Question = { question: string; answer: string }

const Section = styled.section`
    padding: 84px 0 24px 0;
    min-height: 100vh;
    box-sizing: border-box;
    scroll-margin-top: 84px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h2`
    margin: 0 0 16px 0;
    font-size: 28px;
    font-weight: 800;
`

const List = styled.div`
    width: 100%;
    max-width: 800px;
`

const QuestionItem = styled.div<{ $active: boolean }>`
    padding: 15px 0;
    border-bottom: 1px solid var(--color-border, rgba(255,255,255,0.12));

    h3 {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        padding: 10px 48px 10px 0;
        position: relative;
        cursor: pointer;
    }

    .answer {
        display: ${p => (p.$active ? 'block' : 'none')};
        margin-top: 8px;
        opacity: .9;
        line-height: 1.6;
    }
`

const Toggle = styled.span<{ $active: boolean }>`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;

    &::before, &::after {
        content: '';
        position: absolute;
        left: 20%;
        top: 50%;
        width: 60%;
        height: 3px;
        background: var(--color-text-primary);
        border-radius: 6px;
        transition: transform .2s ease;
    }

    &::after { 
        transform: ${p => (p.$active ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(90deg)')}; 
    }

    &::before { 
        transform: translateY(-50%); 
    }
`

export default function FaqSection({ questions }: { questions: Question[] }) {
    const [active, setActive] = useState<number | null>(null)

    return (
        <Section id="faq-section">
            <Title>Dúvidas Frequentes</Title>
            <List>
                {questions?.map((q, index) => {
                    const isActive = active === index
                    return (
                        <QuestionItem key={index} $active={isActive}>
                            <h3 onClick={() => setActive(isActive ? null : index)}>
                                {q.question}
                                <Toggle $active={isActive} />
                            </h3>
                            <div className="answer">
                                <p>{q.answer}</p>
                            </div>
                        </QuestionItem>
                    )
                })}
            </List>
        </Section>
    )
}


