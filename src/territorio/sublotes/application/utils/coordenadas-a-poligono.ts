import { CoordenadaDto } from "../dto/coordenada.dto";

// Convierte los puntos digitados en un GeoJSON Polygon cerrado ([lng, lat]).
export function coordenadasAPoligono(coordenadas: CoordenadaDto[]): object {
  const anillo = coordenadas.map((c) => [c.lng, c.lat]);
  const primero = anillo[0];
  const ultimo = anillo[anillo.length - 1];

  if (primero[0] !== ultimo[0] || primero[1] !== ultimo[1]) {
    anillo.push([...primero]);
  }

  return { type: "Polygon", coordinates: [anillo] };
}
