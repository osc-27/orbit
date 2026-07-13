import type { OfferAdapter } from "../types";
import { oppfiAdapter } from "./oppfi";
import { engineAdapter } from "./engine";
import { directPartnerAdapter } from "./directPartner";

// The registry. Add a source by adding an adapter here — the orchestrator fans
// out across all of them automatically.
export const adapters: OfferAdapter[] = [oppfiAdapter, engineAdapter, directPartnerAdapter];
