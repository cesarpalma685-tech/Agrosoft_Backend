/**
 * Únicos programas de formación permitidos. Se guardan como enum nativo de
 * Postgres (programa_formacion_nombre_enum).
 */
export enum ProgramaFormacionNombre {
  ADSO = "ADSO",
  AGRICULTORES = "AGRICULTORES",
}

export const PROGRAMA_FORMACION_LABELS: Record<ProgramaFormacionNombre, string> =
  {
    [ProgramaFormacionNombre.ADSO]: "Análisis y Desarrollo de Software",
    [ProgramaFormacionNombre.AGRICULTORES]: "Agricultores",
  };

export function esProgramaFormacionNombre(
  valor: unknown,
): valor is ProgramaFormacionNombre {
  return Object.values(ProgramaFormacionNombre).includes(
    valor as ProgramaFormacionNombre,
  );
}
