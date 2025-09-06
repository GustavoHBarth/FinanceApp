import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { IoChevronUp, IoChevronDown } from 'react-icons/io5'

const FieldLabel = styled.label`
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
	color: var(--color-text-secondary);
`;

const RequiredMark = styled.span`
	margin-left: 4px;
	color: var(--color-danger);
`;

const ErrorField = styled.div`
	margin-top: 6px;
	font-size: 12px;
	color: var(--color-danger);
`;

const Wrapper = styled.div<{ variant: InputSelectorVariantTypes }>`
	user-select: none;
	cursor: pointer;
	width: 100%;
	position: relative;
	margin-bottom: 10px;

	.option-selected {
		background: var(--input-bg);
		border-radius: 8px;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		font-size: 14px;
		font-weight: 600;
		gap: 15px;
		width: 100%;
		padding: 12px 14px;
		border: 1px solid var(--color-border);
		transition: all 0.2s;
		line-height: 1.5;

		.option {
			width: 100%;
		}
		
		svg {
			--size: 18px;
			width: var(--size);
			min-width: var(--size);
			height: var(--size);
			margin-right: -2px;
			
			path {
				stroke: var(--color-text-primary);
			}
		}
		
		&.active {
			border-color: var(--color-primary-active);
			background: var(--color-primary-active);
		}

		&:hover {
			background: var(--color-surface-2);
		}

		${({ variant }) => variant === "default" && `
		`};

		${({ variant }) => variant === "critical" && `
			border-color: var(--color-danger);
		`};

		${({ variant }) => variant === "warning" && `
			border-color: var(--color-warning);
		`};

		${({ variant }) => variant === "success" && `
			border-color: var(--color-success);
		`};
	}

	.options {
		margin-top: 4px;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid var(--color-border);
		background: var(--color-surface-2);
		position: absolute;
		top: 100%;
		width: calc(100% + 10px);
		margin-left: -5px;
		z-index: 1000;
		max-height: 200px;
		overflow-y: auto;
		
		.option-item {
			padding: 10px 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-family: 'Inter', sans-serif;
			margin: 5px;
			border-radius: 6px;
			background: transparent;

			transition: 100ms ease-in-out;
			
			&:hover {
				background: var(--color-surface-1);
			}
			
			&.selected {
				font-weight: 700;
				border: var(--color-surface-1);
			}
		}

	}
`;

type OptionType = string | { title: string; value: any; };

export type InputSelectorVariantTypes = "critical" | "warning" | "success" | "default"; 

interface InputSelectorProps {
	variant?: InputSelectorVariantTypes,
	icon?: any;
	initialValue?: any;
	options?: OptionType[];
	cb: (newOption: any) => Promise<boolean> | void;
    label?: string;
    error?: string | null | any;
    required?: boolean;
}

export default function InputSelector({ variant = "default", icon, initialValue, options = [], cb, label, error, required }: InputSelectorProps) {
	const defaultText = "Selecione";
	
	const getTitleByValue = (value: any): string => {
		if (value === undefined || value === null) {
			return defaultText;
		}
		const foundOption = options.find(opt => {
			const optValue = typeof opt === "string" ? opt : opt.value;
			return optValue === value;
		});
		if (foundOption) {
			return typeof foundOption === "string" ? foundOption : foundOption.title;
		}
		return defaultText;
	};

	const [selectedValue, setSelectedValue] = useState<any>(initialValue);
	const [opened, setOpened] = useState(false);
	
	useEffect(() => {
		if (initialValue) {
			setSelectedValue(initialValue);
		}
	}, [initialValue]);
	
	async function onChangeOption(newOptionValue: any) {
		setOpened(false);
		const previousOption = selectedValue;
		setSelectedValue(newOptionValue);
		
		const updated = await cb(newOptionValue);
		if (updated === false) {
			setSelectedValue(previousOption);
		}
	}
	
	function handleToggleOpen(e: React.MouseEvent) {
		e.stopPropagation();
		setOpened(prev => !prev);
	}
	
	function handleOptionClick(e: React.MouseEvent, optionValue: string) {
		e.stopPropagation();
		onChangeOption(optionValue);
	}
	
	return (
		<Wrapper variant={variant} onClick={handleToggleOpen}>
            
			<FieldLabel>
                {label}
                {required && <RequiredMark>*</RequiredMark>}
            </FieldLabel>

            <div className={`option-selected ${opened ? "active" : ""}`}>
				{ icon ? icon : <></> }
                <div className="option">{getTitleByValue(selectedValue)}</div>
                { opened ? <IoChevronUp /> : <IoChevronDown /> }
            </div>
		
            {opened && (
                <div className="options">
					{options.map((opt, i) => {
						const optionTitle = typeof opt === "string" ? opt : opt.title;
						const optionValue = typeof opt === "string" ? opt : opt.value;
						const isSelected = optionValue === selectedValue;
						
						return (
							<div
							key={i}
							className={`option-item ${isSelected ? "selected" : ""}`}
							onClick={(e) => handleOptionClick(e, optionValue)}
							>
							{optionTitle}
							</div>
						);
					})}
                </div>
            )}
            {error && <ErrorField>{error}</ErrorField>}
		</Wrapper>
	);
}

