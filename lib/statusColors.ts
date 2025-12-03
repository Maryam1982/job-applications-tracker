import { CHART_COLORS } from "@/app/constants/colors";

export const statusColorMap: Record<string, string> = {
  Applied: "var(--color-status-applied)",
  "More Information Requested": "var(--color-status-more-info)",
  "Phone Interview": "var(--color-status-phone-interview)",
  "Technical Interview": "var(--color-status-technical-interview)",
  "Offer Received": "var(--color-status-offer)",
  Rejected: "var(--color-status-rejected)",
  "No Response": "var(--color-status-no-response)",
};

const fallbackPalette = CHART_COLORS.bar;
let fallbackIndex = 0;

export function getStatusColor(status: string) {
  // known status → CSS variable
  if (statusColorMap[status]) {
    return statusColorMap[status];
  }

  // unknown status → fallback color from palette
  const color = fallbackPalette[fallbackIndex % fallbackPalette.length];
  fallbackIndex++;

  // store it so it's stable for future renders
  statusColorMap[status] = color;

  return color;
}
