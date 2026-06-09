/**
 * CONTEXT INJECTION LAYER
 *
 * This module assembles all personal context that gets injected into
 * the system prompt. In Stage 1 each module returns an empty string.
 *
 * Stage 2 checklist — populate these files to ground the AI in real content:
 *   projects.ts    → project descriptions, tech stack, outcomes
 *   philosophy.ts  → worldview, principles, mental models
 *   notes.ts       → raw thinking, fleeting ideas, observations
 *   resume.ts      → structured experience, education, achievements
 *
 * To inject: add content to any module below. buildContextBlock()
 * concatenates everything automatically — no other changes needed.
 */

import { projectsContext }  from "./projects";
import { philosophyContext} from "./philosophy";
import { notesContext }     from "./notes";
import { resumeContext }    from "./resume";

export function buildContextBlock(): string {
  const blocks = [
    projectsContext(),
    philosophyContext(),
    notesContext(),
    resumeContext(),
  ].filter(Boolean);

  return blocks.join("\n\n");
}
