/**
 * Únicos roles permitidos en Agrosoft. Se guardan como enum nativo de Postgres
 * (rol_nombre_enum), así que la base rechaza cualquier otro valor.
 */
export enum RolNombre {
  ADMINISTRADOR = "ADMINISTRADOR",
  APRENDIZ = "APRENDIZ",
  ENCARGADO_TECNICO = "ENCARGADO_TECNICO",
}

export const ROL_NOMBRE_LABELS: Record<RolNombre, string> = {
  [RolNombre.ADMINISTRADOR]: "Administrador",
  [RolNombre.APRENDIZ]: "Aprendiz",
  [RolNombre.ENCARGADO_TECNICO]: "Encargado Técnico",
};

export const ROL_DESCRIPCIONES: Record<RolNombre, string> = {
  [RolNombre.ADMINISTRADOR]: "Administrador del sistema",
  [RolNombre.APRENDIZ]: "Estudiante en formación",
  [RolNombre.ENCARGADO_TECNICO]: "Personal técnico de la granja",
};

// El Administrador solo se crea por seeder; nunca desde el registro público.
export const ROLES_ASIGNABLES_EN_REGISTRO = [
  RolNombre.APRENDIZ,
  RolNombre.ENCARGADO_TECNICO,
] as const;

export function esRolNombre(valor: unknown): valor is RolNombre {
  return Object.values(RolNombre).includes(valor as RolNombre);
}
