import styled from 'styled-components';

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background-color: var(--color-surface-1);
    border-radius: 12px;
    padding: 24px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow: auto;
    border: 1px solid var(--color-border);
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 16px;
`;

export const ModalTitle = styled.h2`
    margin: 0;
    color: var(--color-text-primary);
    font-size: 24px;
    font-weight: 600;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-text-secondary);
    padding: 4px;
    
    &:hover {
        color: var(--color-text-primary);
    }
`;

export const ModalContent = styled.div`
    margin-bottom: 20px;
`;

export const ContaTitle = styled.h3`
    margin: 0 0 16px 0;
    color: var(--color-text-primary);
    font-size: 18px;
    font-weight: 500;
`;

export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 20px;
`;

export const InfoItem = styled.div``;

export const InfoLabel = styled.label`
    display: block;
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: 4px;
`;

export const InfoValue = styled.div`
    font-size: 16px;
    color: var(--color-text-primary);
    
    &:first-child {
        font-size: 20px;
        font-weight: 600;
    }
`;

export const ParcelasSection = styled.div`
    margin-top: 20px;
`;

export const ParcelasTitle = styled.h4`
    margin: 0 0 12px 0;
    color: var(--color-text-primary);
    font-size: 16px;
    font-weight: 500;
`;

export const ParcelasContainer = styled.div`
    background-color: var(--color-surface-2);
    border-radius: 8px;
    padding: 16px;
`;

export const ParcelaItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
    
    &:last-child {
        border-bottom: none;
    }
`;

export const ParcelaInfo = styled.span`
    color: var(--color-text-primary);
`;

export const ParcelaDetails = styled.span`
    color: var(--color-text-secondary);
`;

export const ModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--color-border);
`;

export const EditButton = styled.button`
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

export const CloseModalButton = styled.button`
    padding: 10px 20px;
    background-color: var(--color-surface-2);
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    
    &:hover {
        background-color: var(--color-surface-1);
        color: var(--color-text-primary);
    }
`;
