import styled from 'styled-components';

export const Whapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: sticky;
    top: 0;
    min-height: 100vh;
    width: min(220px, 100%);
    border-right: 1px solid var(--color-border);

    .sep {
        height: 1px;
        width: 100%;
        background: var(--color-border);
        margin: 12px 0;
        align-self: stretch;
    }
`;

export const ProfileUser = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 12px 12px 0 12px;
    justify-content: center;

    p {
        font-size: 27px;
    }

    button {
        font-size: 20px;
        background: transparent;
        border: 0;
        color: var(--color-text-primary);
        cursor: pointer;
    }

`;

export const AvatarUser = styled.div`

    .img-avatar {
        display: flex;
        border-radius: 50px;
        width: 40px;
        height: 40px;
   }
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
    font-size: 25px;
    border-radius: 8px;
    color: var(--color-text-primary);
    cursor: pointer;

    &:hover {
        background: var(--color-elevated);
    }
`;
