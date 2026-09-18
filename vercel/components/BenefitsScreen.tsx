import { ArrowRight, CircleCheck, TrendingUp } from "lucide-react";
import type { ProblemQuestion } from "@/types/playbook";
import { groupBenefitProblems } from "@/lib/benefit-groups.mjs";
import { ContentTag } from "./ContentTag";

type BenefitsScreenProps = { problems: ProblemQuestion[]; onNext: () => void };

export function BenefitsScreen({ problems, onNext }: BenefitsScreenProps) {
  const groups = groupBenefitProblems(problems);
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
        {groups.map((group) => (
          <article key={group.problems[0].id} className="benefit-item">
            <div className="benefit-questions">
              {group.problems.map((problem) => (
                <p key={problem.id} className="benefit-question">{problem.question}<ContentTag tag={problem.tag} /></p>
              ))}
            </div>
            <p className="benefit-solution">{group.solution}</p>
            {group.benefits.length ? (
              <div className="benefit-details">
                <h3>How Gumlet helps</h3>
                <ul className="benefit-points">
                  {group.benefits.map((benefit) => (
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
