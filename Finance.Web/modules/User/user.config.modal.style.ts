import styled from 'styled-components';


export const Whapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
`;

export const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 200px;
    min-width: 180px;
    border-right: 2px solid var(--neutral-700);
    padding: 10px 12px;
`;

export const SideBarItem = styled.div<{ $active?: boolean }>`
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    background-color: ${({ $active }) => ($active ? '#e0e0e0' : 'transparent')};
    color: ${({ $active }) => ($active ? '#000' : '#666')};

    &:hover {
      background-color: var(--neutral-700);
    }
`;

export const Content = styled.div`
    flex: 1;
    padding: 8px 12px;
    color: var(--color-text-primary);
    min-height: 160px;

    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
`;
