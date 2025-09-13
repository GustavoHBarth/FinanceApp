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

type InputDateProps = {
	label?: string;
	name: string;
	id?: string;
	required?: boolean;
	error?: string | null;
	disabled?: boolean;

	value?: Date | string;
	defaultValue?: Date | string;
	onValueChange?: (value: Date) => void;

	min?: Date | string;
	max?: Date | string;
};

function toInputValue(value?: Date | string): string {
	if (!value) return "";
	const d = typeof value === "string" ? new Date(value) : value;
	if (Number.isNaN(d.getTime())) return "";
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

function fromInputValue(text: string): Date | null {
	if (!text) return null;
	// Evita timezone issues: força meio-dia UTC
	const d = new Date(`${text}T12:00:00`);
	if (Number.isNaN(d.getTime())) return null;
	return d;
}

function clampDate(date: Date, min?: Date | string, max?: Date | string): Date {
	let result = date;
	if (min) {
		const minDate = typeof min === "string" ? new Date(min) : min;
		if (!Number.isNaN(minDate.getTime()) && result < minDate) result = minDate;
	}
	if (max) {
		const maxDate = typeof max === "string" ? new Date(max) : max;
		if (!Number.isNaN(maxDate.getTime()) && result > maxDate) result = maxDate;
	}
	return result;
}

export default function InputDate({
	label,
	name,
	id,
	required,
	error,
	disabled,

	value,
	defaultValue,
	onValueChange,

	min,
	max,
}: InputDateProps) {
	const autoId = useId();
	const inputId = id ?? autoId;

	const [uncontrolled, setUncontrolled] = useState<string>(
		toInputValue(defaultValue)
	);

	const inputValue = value !== undefined ? toInputValue(value) : uncontrolled;

	function emit(d: Date | null) {
		if (!onValueChange || !d) return;
		onValueChange(d);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const raw = e.target.value;
		const parsed = fromInputValue(raw);
		if (parsed) {
			const clamped = clampDate(parsed, min, max);
			if (value !== undefined) {
				emit(clamped);
			} else {
				setUncontrolled(toInputValue(clamped));
				emit(clamped);
			}
		} else {
			if (value === undefined) setUncontrolled("");
		}
	}

	function handleBlur() {
		const parsed = fromInputValue(inputValue);
		if (!parsed) return;
		const clamped = clampDate(parsed, min, max);
		if (value !== undefined) {
			emit(clamped);
		} else {
			setUncontrolled(toInputValue(clamped));
			emit(clamped);
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
				type="date"
				aria-invalid={!!error}
				aria-required={!!required}
				aria-label={label}
				disabled={disabled}
				value={inputValue}
				onChange={handleChange}
				onBlur={handleBlur}
				min={toInputValue(min)}
				max={toInputValue(max)}
			/>
			{error && <ErrorField>{error}</ErrorField>}
		</Wrapper>
	);
}


