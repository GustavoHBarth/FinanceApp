import React, { useEffect, useId, useState, useMemo } from "react";
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


type InputCurrencyProps = {
    label?: string;
    name: string;
    id?: string;
    required?: boolean;
    error?: string | null;
    disabled?: boolean;

    value?: number;
    defaultValue?: number;
    onValueChange?: (value: number) => void;

    prefix?: string;
    allowNegative?: boolean;
    min?: number;
    max?: number;
    returnInCents?: boolean;
    placeholder?: string;
};

export default function InputCurrency({
    label,
    name,
    id,
    required,
    error,
    disabled,

    value,
    defaultValue,
    onValueChange,

    prefix = 'R$',
    allowNegative = false,
    min,
    max,
    returnInCents = false,
    placeholder = '0,00'
}: InputCurrencyProps) {
    const autoId = useId();
    const inputId = id ?? autoId;

    const [uncontrolled, setUncontrolled] = useState<number>(   
        defaultValue ?? 0
    );

    const numericValue = value !== undefined ? value : uncontrolled;

    const displayText = useMemo(() => {
        const abs = Math.abs(numericValue || 0);
        const numberText = Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(abs);

        const withPrefix = prefix ? `${prefix} ${numberText}` : numberText;
        return (numericValue ?? 0) < 0 ? `- ${withPrefix}` : withPrefix;
    }, [numericValue]);

    function parseToNumber(text: string) : number {
        const raw = text.replace(/\s/g, "");
		const isNeg = allowNegative && raw.startsWith("-");
		const digits = raw.replace(/[^\d]/g, "");
		const cents = digits ? parseInt(digits, 10) : 0;
		const decimal = cents / 100;
		return isNeg ? -decimal : decimal;
    }

    function clamp(n: number) : number {
        let x = n;
        if (min !== undefined) x = Math.max(min, x);
        if (max !== undefined) x = Math.min(max, x);
        return x;
    }

    function emit(valueDecimal: number) {
		if (!onValueChange) return;
		if (returnInCents) {
			onValueChange(Math.round(valueDecimal * 100));
		} else {
			onValueChange(valueDecimal);
		}
	}

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const n = clamp(parseToNumber(e.target.value));
		if (value !== undefined) {
			// controlado
			emit(n);
		} else {
			// não-controlado
			setUncontrolled(n);
			emit(n);
		}
	}
    
    function handleBlur() {
		// Apenas reforça formatação/limites ao sair do campo
		const n = clamp(numericValue || 0);
		if (value !== undefined) {
			emit(n);
		} else {
			setUncontrolled(n);
			emit(n);
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
            type="text"
            inputMode="decimal"
            autoComplete="off"
            aria-invalid={!!error}
            aria-required={!!required}
            aria-label={label}
            disabled={disabled}
            value={displayText}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
        />
        {error && <ErrorField>{error}</ErrorField>}
    </Wrapper>
    )
}