import styled from 'styled-components'

export const Whapper = styled.div`
    padding: 20px;
    margin: 0 50px;
`;

export const ContasHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    h1 {
        font-size: 35px;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0;
    }

    .btn-icons {
        display: flex;
        gap: 12px;
        align-items: center;
    }
`;

export const ContasMonth = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    justify-content: space-between; 
    
    .month-display {
        font-size: 40px;
        font-weight: 600;
        color: var(--color-text-primary);
        min-width: 120px;
        text-align: center;
        text-transform: uppercase;       
    }
    
    .month-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        color: var(--color-text-primary);
        font-size: 60px;
        border-radius: 50%;
        cursor: pointer;
        margin: 0 70px 0 70px;
    }
`;

export const ResumoContas = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 24px;
    margin-bottom: 24px;

    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px;
        background: var(--color-surface-2);
        border-radius: 12px;
        border: 1px solid var(--color-border);
        position: relative;

        &:not(:last-child)::after {
            content: '';
            position: absolute;
            right: -12px;
            top: 50%;
            transform: translateY(-50%);
            width: 1px;
            height: 60%;
            background: var(--color-border);
        }

        .valor {
            font-size: 28px;
            font-weight: 700;
            color: var(--color-text-primary);
            margin-bottom: 8px;
        }

        .descricao {
            font-size: 14px;
            color: var(--color-text-secondary);
            text-align: center;
            line-height: 1.4;
        }

        .subtitulo {
            font-size: 12px;
            color: var(--color-text-muted);
            text-align: center;
            margin-top: 8px;
            font-style: italic;
        }
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 20px;

        .wrapper {
            padding: 16px;

            &:not(:last-child)::after {
                display: none;
            }
        }
    }
`;

export const ContasTable = styled.div`
    background: var(--color-surface-1);
    border-radius: 12px;
    border: 1px solid var(--color-border);
    overflow: hidden;
    display: flex;
    justify-content: center;

    .contas-table {
        width: 100%;
        border-collapse: collapse;
        
        th, td {
            padding: 16px;
            text-align: center;
            border-bottom: 1px solid var(--color-border);
            vertical-align: middle;
            color: var(--color-text-primary);
            font-size: 14px;
        }
        
        th {
            background: var(--color-surface-2);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid var(--color-border);
        }
        
        td {
            .empty {
                text-align: center;
                padding: 40px;
                display: block;
                font-size: 20px;
                color: var(--color-text-secondary);
            }

            .the-view {
                color: var(--color-text-secondary);
            }
        }

        tbody tr {
            transition: background-color 0.2s ease;
            
            &:hover {
                background: var(--color-surface-2);
            }
            
            &:last-child td {
                border-bottom: none;
            }
        }
        
        .actions {
            text-align: center;
            
            button {
                display: inline-block;
                margin: 0 4px;
                padding: 6px 12px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
                
                &.btn-view {
                    background: transparent;
                    color: var(--color-text-secondary);
                    padding: 6px 8px;
                    border: 1px solid var(--color-border);
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    
                    &:hover {
                        background: var(--color-surface-2);
                        border-color: var(--color-text-secondary);
                        color: var(--color-text-secondary);
                    }
                }
                
                &.btn-edit {
                    background: var(--color-primary);
                    color: white;
                    
                    &:hover {
                        background: var(--primary-600);
                    }
                }
                
                &.btn-delete {
                    background: #f44336;
                    color: white;
                    
                    &:hover {
                        background: #d32f2f;
                    }
                }
            } 
        }

        
    }
`;

export const FilterActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
`;

export const NovaContaButton = styled.button`
    padding: 12px 24px;
    background: var(--color-surface-1);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    min-width: 140px;
    justify-content: center;

    &:hover {
        background: var(--color-surface-2);
        border-color: var(--color-text-secondary);
        color: var(--color-text-secondary);
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
        background: var(--color-surface-2);
        cursor: not-allowed;
        opacity: 0.6;
        border-color: var(--color-text-muted);
        color: var(--color-text-muted);
        transform: none;
        box-shadow: none;
    }

    svg {
        font-size: 16px;
        flex-shrink: 0;
    }
`;