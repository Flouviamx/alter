import type { Answers, Step } from '../../../data/contactForm';
import StepHeader from './StepHeader';

interface Props {
  steps: Step[];
  answers: Answers;
  whatsappHref: string;
  onEdit: (index: number) => void;
  onSend: () => void;
}

/** Revisión final: cada respuesta se puede editar; el botón abre WhatsApp con el mensaje armado. */
export default function StepSummary({ steps, answers, whatsappHref, onEdit, onSend }: Props) {
  return (
    <div className="cf__step">
      <StepHeader question="Así le llegará tu mensaje al taller" id="cf-summary-q" />

      <dl className="cf__summary" aria-labelledby="cf-summary-q">
        {steps.map((step, i) =>
          answers[step.id]?.trim() ? (
            <div key={step.id} className="cf__summary-row">
              <dt className="display">{step.label}</dt>
              <dd>{answers[step.id]}</dd>
              <button type="button" className="cf__edit" onClick={() => onEdit(i)}>
                Editar
              </button>
            </div>
          ) : null,
        )}
      </dl>

      <div className="cf__actions">
        <a className="cf__send" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={onSend}>
          Enviar por WhatsApp <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
