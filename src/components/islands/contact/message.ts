// Arma el mensaje de WhatsApp a partir de las respuestas (solo pasos visibles y respondidos).
// WhatsApp interpreta *texto* como negritas.
import { personalize, type Answers, type Step } from '../../../data/contactForm';

export function buildWhatsAppMessage(steps: Step[], answers: Answers) {
  const lines = steps
    .filter((step) => answers[step.id]?.trim())
    .map((step) => `*${step.label}:* ${answers[step.id].trim()}`);

  return ['Hola Anter House, me gustaría agendar una cita.', '', ...lines].join('\n');
}

/** Pregunta lista para mostrarse (con el nombre ya insertado). */
export const questionOf = (step: Step, answers: Answers) => personalize(step.question, answers);
