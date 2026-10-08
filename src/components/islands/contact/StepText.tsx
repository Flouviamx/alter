import type { RefObject } from 'react';
import type { TextStep } from '../../../data/contactForm';
import StepHeader from './StepHeader';

interface Props {
  step: TextStep;
  number: number;
  question: string;
  value: string;
  error: string;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

/** Paso de texto: input de una línea o textarea. Enter avanza; en textarea, Shift + Enter hace salto. */
export default function StepText({ step, number, question, value, error, inputRef, onChange, onSubmit }: Props) {
  const fieldId = `cf-${step.id}`;
  const headingId = `${fieldId}-q`;
  const errorId = `${fieldId}-error`;
  const multiline = step.kind === 'textarea';

  const common = {
    id: fieldId,
    className: 'cf__input',
    value,
    placeholder: step.placeholder,
    'aria-labelledby': headingId,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    onChange: (event: { target: { value: string } }) => onChange(event.target.value),
  };

  return (
    <div className="cf__step">
      <StepHeader number={number} question={question} help={step.help} id={headingId} />

      {multiline ? (
        <textarea {...common} ref={inputRef as RefObject<HTMLTextAreaElement>} rows={3} />
      ) : (
        <input {...common} ref={inputRef as RefObject<HTMLInputElement>} type="text" autoComplete="given-name" />
      )}

      {error && (
        <p id={errorId} className="cf__error" role="alert">
          {error}
        </p>
      )}

      <div className="cf__actions">
        <button type="button" className="cf__ok" onClick={onSubmit}>
          OK <span aria-hidden="true">✓</span>
        </button>
        <span className="cf__hint">
          {multiline ? (
            <>
              <kbd>Enter</kbd> para seguir · <kbd>Shift</kbd> + <kbd>Enter</kbd> salto de línea
            </>
          ) : (
            <>
              pulsa <kbd>Enter ↵</kbd>
            </>
          )}
        </span>
      </div>
    </div>
  );
}
