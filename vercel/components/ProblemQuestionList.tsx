"use client";

import { ArrowRight, CheckCheck, ChevronDown, Lightbulb, MessageSquare } from "lucide-react";
import type { ProblemQuestion } from "@/types/playbook";

type ProblemQuestionListProps = {
  problems: ProblemQuestion[];
  selectedProblemIds: string[];
  onToggleProblem: (problemId: string) => void;
  onNext: () => void;
};

export function ProblemQuestionList({ problems, selectedProblemIds, onToggleProblem, onNext }: ProblemQuestionListProps) {
  const selected = new Set(selectedProblemIds);

  return (
    <section className="screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow"><MessageSquare size={15} aria-hidden="true" />Discovery</p>
          <h2 className="screen-title">Problem questions</h2>
        </div>
        <span className="selection-count" aria-live="polite"><strong>{selected.size}</strong> selected</span>
      </div>
      <div className="question-list">
        {problems.map((problem) => {
          const isSelected = selected.has(problem.id);
          const solutionId = `solution-${problem.id}`;
          return (
            <article key={problem.id} className={`question-item ${isSelected ? "is-selected" : ""}`}>
              <label className="question-row">
                <input type="checkbox" className="question-checkbox" checked={isSelected}
                  aria-controls={isSelected ? solutionId : undefined}
                  onChange={() => onToggleProblem(problem.id)} />
                <span className="question-text">{problem.question}</span>
                <ChevronDown className="question-chevron" size={19} aria-hidden="true" />
              </label>
              {isSelected ? (
                <div className="solution-block" id={solutionId}>
                  <div className="solution-label"><Lightbulb size={14} aria-hidden="true" />Solution</div>
                  {problem.note ? <p className="problem-note">{problem.note}</p> : null}
                  <p className="solution-text">{problem.solution}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
      <div className="action-bar">
        <span className="action-status"><CheckCheck size={16} aria-hidden="true" />
          {selected.size === 0 ? "No problems selected" : `${selected.size} problem${selected.size === 1 ? "" : "s"} selected`}
        </span>
        <button className="primary-button" disabled={selected.size === 0} onClick={onNext} type="button">
          Next: Benefits<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
