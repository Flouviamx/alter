import type { ChoiceStep } from '../../../data/contactForm';
import StepHeader from './StepHeader';

interface Props {
  step: ChoiceStep;
  number: number;
  question: string;
  value: string;
  onChoose: (option: string) => void;
}

export const letterOf = (index: number) => String.fromCharCode(65 + index);

/** Paso de opción única: cada opción lleva su tecla (A, B, C…), como en Typeform. */
export default function StepChoice({ step, number, question, value, onChoose }: Props) {
  const headingId = `cf-${step.id}-q`;

  return (
    <div className="cf__step">
      <StepHeader number={number} question={question} help={step.help} id={headingId} />

      <div className="cf__options" role="radiogroup" aria-labelledby={headingId}>
        {step.options.map((option, i) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              className="cf__option"
              onClick={() => onChoose(option)}
            >
              <kbd className="cf__key">{letterOf(i)}</kbd>
              <span>{option}</span>
              {selected && (
                <span className="cf__check" aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
