import { ArrowRight, CircleCheck, TrendingUp } from "lucide-react";
import type { ProblemQuestion } from "@/types/playbook";

type BenefitsScreenProps = { problems: ProblemQuestion[]; onNext: () => void };

export function BenefitsScreen({ problems, onNext }: BenefitsScreenProps) {
  return (
    <section className="screen">
      <div className="screen-heading">
        <div>
          <p className="eyebrow"><TrendingUp size={15} aria-hidden="true" />Value</p>
          <h2 className="screen-title">Benefits</h2>
        </div>
        <span className="selection-count">{problems.length} problem{problems.length === 1 ? "" : "s"}</span>
      </div>
      <div className="benefit-list">
        {problems.map((problem) => (
          <article key={problem.id} className="benefit-item">
            <p className="benefit-question">{problem.question}</p>
            <p className="benefit-solution">{problem.solution}</p>
            {problem.benefits.length ? (
              <div className="benefit-details">
                <h3>How Gumlet helps</h3>
                <ul className="benefit-points">
                  {problem.benefits.map((benefit) => (
                    <li key={benefit}><CircleCheck size={18} aria-hidden="true" /><span>{benefit}</span></li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <div className="action-bar">
        <span className="action-status"><CircleCheck size={16} aria-hidden="true" />Selected problems</span>
        <button className="primary-button" onClick={onNext} type="button">
          Next: Demo<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
