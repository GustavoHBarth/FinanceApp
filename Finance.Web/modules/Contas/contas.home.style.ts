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
        border-radius: 50%;
    }

    .btn-icons button {
        background: transparent;
        color: var(--color-text-primary);
        border: none;
        cursor: pointer;
        font-size: 30px;
        padding: 8px;
        transition: all 0.2s ease;

        &:hover {
            color: var(--color-primary);
        }
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
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 24px;
    padding: 16px;
    background: var(--color-surface-1);
    border-radius: 12px;
    border: 1px solid var(--color-border);

    .wrapper {
        flex: 1;
        text-align: center;

        .valor {
            font-size: 24px;
            font-weight: 600;
            color: var(--color-text-primary);
        }

        .descricao {
            font-size: 14px;
            color: var(--color-text-secondary)
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