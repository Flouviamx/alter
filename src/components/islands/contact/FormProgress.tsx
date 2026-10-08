interface Props {
  value: number;
  label: string;
}

/** Barra fina de progreso + contador "2 / 6". */
export default function FormProgress({ value, label }: Props) {
  return (
    <div className="cf__progress">
      <span className="cf__progress-track" aria-hidden="true">
        <span className="cf__progress-fill" style={{ transform: `scaleX(${value})` }} />
      </span>
      <span className="cf__progress-label">{label}</span>
    </div>
  );
}
