import React, { useId, useState } from "react";
import { styled } from "styled-components";

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

const Wrapper = styled.div`
	width: 100%;
	margin-bottom: 10px;

	.input {
		background: var(--input-bg);
		border-radius: 8px;
		width: 100%;
		padding: 12px 14px;
		border: 1px solid var(--color-border);
		transition: all 0.2s;
		line-height: 1.5;
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-primary);

		&:hover {
			background: var(--color-surface-2);
		}

		&:focus {
			outline: none;
			border-color: var(--color-primary-active);
		}

		&.error {
			border-color: var(--color-danger);
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
`;

type InputTextProps = {
	label?: string;
	name: string;
	id?: string;
	required?: boolean;
	error?: string | null;
	disabled?: boolean;

	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;

	placeholder?: string;
	type?: string;
	autoComplete?: string;
	maxLength?: number;
};

export default function InputText({
	label,
	name,
	id,
	required,
	error,
	disabled,

	value,
	defaultValue,
	onValueChange,

	placeholder,
	type = "text",
	autoComplete,
	maxLength,
}: InputTextProps) {
	const autoId = useId();
	const inputId = id ?? autoId;

	const [uncontrolled, setUncontrolled] = useState<string>(
		defaultValue ?? ""
	);

	const textValue = value !== undefined ? value : uncontrolled;

	function emit(nextValue: string) {
		if (!onValueChange) return;
		onValueChange(nextValue);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const next = e.target.value;
		if (value !== undefined) {
			emit(next);
		} else {
			setUncontrolled(next);
			emit(next);
		}
	}

	return (
		<Wrapper>
			{label && (
				<FieldLabel htmlFor={inputId}>
					{label}
					{required && <RequiredMark>*</RequiredMark>}
				</FieldLabel>
			)}
			<input
				id={inputId}
				name={name}
				className={`input ${error ? "error" : ""}`}
				type={type}
				autoComplete={autoComplete}
				aria-invalid={!!error}
				aria-required={!!required}
				aria-label={label}
				disabled={disabled}
				value={textValue}
				onChange={handleChange}
				placeholder={placeholder}
				maxLength={maxLength}
			/>
			{error && <ErrorField>{error}</ErrorField>}
		</Wrapper>
	);
}


