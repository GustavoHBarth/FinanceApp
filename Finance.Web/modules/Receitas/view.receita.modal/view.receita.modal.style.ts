import styled from 'styled-components';

export const Whapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 8px;
`;

export const SectionUp = styled.div`
    display: grid;
    gap: 8px;
`;

export const InfoList = styled.dl`
    display: grid;
    grid-template-columns: max-content 1fr;
    column-gap: 16px;
    row-gap: 8px;
    margin: 0;

    dt {
        font-weight: 600;
    }

    dd {
        margin: 0;
    }
`;

export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const InfoItem = styled.dl`
    display: grid;
    grid-template-rows: auto auto;
    row-gap: 4px;
    margin: 0;

    dt {
        font-weight: 600;
        color: var(--color-text-secondary);
        font-size: 14px;
    }

    dd {
        margin: 0;
        color: var(--color-text-primary);
        font-size: 16px;
    }
`;

export const SectionTitle = styled.div`
    margin: 0 0 16px 0;
	font-size: 18px;
	font-weight: 600;
	color: var(--color-text-primary);
	border-bottom: 1px solid var(--color-border);
	padding-bottom: 8px;
`;

export const SectionDown = styled.div`

`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
`;

export const EditButton = styled.div`
    padding: 10px 20px;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    
    &:hover {
        background-color: var(--primary-600);
    }
`;

