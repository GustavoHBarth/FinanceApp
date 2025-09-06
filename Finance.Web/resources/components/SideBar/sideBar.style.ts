import styled from 'styled-components';

export const Whapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: sticky;
    top: 64px;
    min-height: calc(100vh - 64px);
    width: min(220px, 100%);
    border-right: 1px solid var(--color-border);
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;
`;

export const MenuButton = styled.div`
    display: flex;
    padding: 10px;
    gap: 15px;
    font-size: 20px;
    border-radius: 8px;
    color: var(--color-text-primary);
    cursor: pointer;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--neutral-700);

    &:hover {
        background: var(--color-elevated);
    }
`;
