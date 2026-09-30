export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export interface ChatRequest {
  message: string
  history: ChatMessage[]
}

export interface ChatResponse {
  reply?: string // Present on non-streaming endpoint
  content?: string // Present on streaming SSE chunks
  blocked_by_guardrail: boolean
  guardrail_reason?: string | null
  sanitized_input?: string
  rag_context_used?: boolean
  error?: boolean
}

// Java Backend DTOs
export interface EvidenceRequest {
  activityType: string
  metadata: Record<string, unknown>
  // Assume a file URL or base64 if it's an image
  evidenceUrl?: string
}

export interface EvidenceResponse {
  trackingId: string
  status: "PENDING_AI_ANALYSIS" | "APPROVED" | "REJECTED"
  message: string
}

export interface RedeemedRewardDTO {
  id: string
  name: string
  cost: number
  date: string
}

export interface WalletState {
  ecoPoints: number
  individualCarbonSaved: number
  companyCarbonSaved: number
}
