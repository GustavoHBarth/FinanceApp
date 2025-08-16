import { createGlobalStyle } from 'styled-components'

export const ThemeVariables = createGlobalStyle`
  /* Sistema de cores - Dark theme por padrão */
  :root {
    /* Backgrounds e superfícies */
    --color-bg: #0B0F14;
    --color-surface-1: #11161D;
    --color-surface-2: #151C24;
    --color-elevated: #1B2530;
    --color-overlay: rgba(0, 0, 0, 0.55);
    --color-border: #243040;

    /* Texto */
    --color-text-primary: #E6E9EE;
    --color-text-secondary: #B4BFCC;
    --color-text-muted: #8A97A6;
    --color-text-inverse: #0B0F14;

    /* Paleta primária (verde - contexto financeiro) */
    --primary-100: #DCFCE7;
    --primary-200: #BBF7D0;
    --primary-300: #86EFAC;
    --primary-400: #4ADE80;
    --primary-500: #22C55E;
    --primary-600: #16A34A;
    --primary-700: #15803D;
    --primary-800: #166534;
    --primary-900: #14532D;
    --color-primary: var(--primary-500);
    --color-primary-hover: var(--primary-400);
    --color-primary-active: var(--primary-600);
    --color-primary-contrast: #0A0F14;

    /* Estados e feedbacks */
    --success-500: #22C55E;
    --warning-500: #F59E0B;
    --danger-500: #EF4444;
    --info-500: #3B82F6;
    --success-600: #16A34A;
    --warning-600: #D97706;
    --danger-600: #DC2626;
    --info-600: #2563EB;
    --color-success: var(--success-500);
    --color-warning: var(--warning-500);
    --color-danger: var(--danger-500);
    --color-info: var(--info-500);

    /* Acento e destaque */
    --accent-500: #14B8A6;
    --accent-600: #0D9488;
    --color-accent: var(--accent-500);

    /* Neutros para bordas/linhas/sombras sutis */
    --neutral-100: #F1F5F9;
    --neutral-200: #E2E8F0;
    --neutral-300: #CBD5E1;
    --neutral-400: #94A3B8;
    --neutral-500: #64748B;
    --neutral-600: #475569;
    --neutral-700: #334155;
    --neutral-800: #1F2937;
    --neutral-900: #0F172A;

    /* Componentes */
    --btn-bg: var(--color-primary);
    --btn-bg-hover: var(--color-primary-hover);
    --btn-fg: #0B0F14;
    --input-bg: var(--color-surface-1);
    --input-border: var(--color-border);
    --input-placeholder: var(--color-text-muted);
    --card-bg: var(--color-surface-1);
    --card-border: var(--color-border);
    --link: var(--color-info);
    --link-hover: #60A5FA;
  }

  /* Suporte opcional a troca de tema por data-attribute */
  [data-theme="dark"] {
    color-scheme: dark;
  }
`


