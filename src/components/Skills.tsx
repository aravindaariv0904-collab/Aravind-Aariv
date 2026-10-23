import React from 'react';
import { 
  Code, 
  Brain, 
  Layout, 
  Database, 
  Cloud, 
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  Server
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const getCategoryIcon = (groupName: string) => {
    switch (groupName) {
      case 'Programming Languages': return <Code size={18} className="text-cyan" />;
      case 'AI & Machine Learning': return <Brain size={18} className="text-violet" />;
      case 'Frameworks & Full-Stack': return <Layout size={18} className="text-indigo" />;
      case 'Data & Backend Systems': return <Database size={18} className="text-emerald" />;
      default: return <Cloud size={18} className="text-amber" />;
    }
  };

  const getSkillIcon = (groupName: string) => {
    switch (groupName) {
      case 'Programming Languages': return <Terminal size={14} className="text-slate-400" />;
      case 'AI & Machine Learning': return <Cpu size={14} className="text-violet" />;
      case 'Frameworks & Full-Stack': return <Layers size={14} className="text-indigo" />;
      case 'Data & Backend Systems': return <Server size={14} className="text-emerald" />;
      default: return <Cloud size={14} className="text-cyan" />;
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header-block">
          <div className="section-pill">
            <Sparkles size={14} className="text-cyan" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="section-heading-text">
            Technical Stack & <span className="gradient-text-indigo">Core Toolchain</span>
          </h2>
          <p className="section-subheading-text">
            Technologies and frameworks applied across production deployments, research workflows, and system architectures.
          </p>
        </div>

        <div className="skills-categories-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.group} className="skill-category-card">
              <div className="category-header">
                <div className="category-icon-box">
                  {getCategoryIcon(category.group)}
                </div>
                <h3 className="category-name">{category.group}</h3>
              </div>

              <div className="category-skills-grid">
                {category.items.map((skill) => (
                  <div key={skill.name} className="skill-chip">
                    {getSkillIcon(category.group)}
                    <span className="skill-chip-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
