import styled from 'styled-components'

export const Wrapper = styled.div`
	background: var(--color-bg);
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
`

export const Content = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;
	width: min(100%, 480px);
	padding: 16px;
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 1px solid var(--color-border);
	justify-content: center;
	text-align: center;

	.icon-btn {
		background: transparent;
		border: 0;
		padding: 4px;
		margin: 0;
		border-radius: 6px;
		cursor: pointer;
		color: var(--color-text-secondary);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	p {
		font-size: 35px;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
		padding: 0;
		text-align: center;
	}

	img {
		height: 56px;
		max-width: 100%;
	}
`

export const Box = styled.div`
	background: var(--card-bg);
	padding: 32px;
	width: 100%;
	border-radius: 20px;
	border: 1px solid var(--card-border);
	box-sizing: border-box;

	.title {
		font-size: 20px;
		margin-bottom: 15px;
		color: var(--color-text-primary);
	}

	form {
		display: flex;
		flex-direction: column;   
		align-items: center;   
		gap: 12px;      
	}

	input {
		width: 100%;
		padding: 12px 16px;
		font-size: 16px;
		font-family: inherit;

		color: var(--color-text-primary);
		background-color: var(--input-bg);
		border: 1px solid var(--input-border);
		border-radius: 8px;

		outline: none;
		transition: all 0.2s ease;
		appearance: none;
		-webkit-appearance: none;
	}

	button { 
		cursor: pointer; 
		width: 50%;
		height: 40px;
		font-size: 16px;
		border-radius: 10px;
		background: var(--btn-bg);
		color: var(--btn-fg);
		font-weight: 600;
		transition: background .15s ease;
	}

	.switch {
		background: transparent;
		border: 0;
		font-weight: 600;
		color: var(--color-text-primary);
		cursor: pointer;
	}
`


