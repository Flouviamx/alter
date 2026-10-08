interface Props {
  number?: number;
  question: string;
  help?: string;
  id: string;
}

/** Número + pregunta + ayuda. El id permite asociar la pregunta con su campo o grupo. */
export default function StepHeader({ number, question, help, id }: Props) {
  return (
    <header className="cf__header">
      {number !== undefined && (
        <span className="cf__number">
          {number}
          <span aria-hidden="true"> →</span>
        </span>
      )}
      <h3 id={id} className="cf__question display">
        {question}
      </h3>
      {help && <p className="cf__help">{help}</p>}
    </header>
  );
}
