import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { 
  LinkedinIcon, 
  GithubIcon, 
  DiscordIcon, 
  GoogleDevIcon, 
  CredlyIcon, 
  PortfolioIcon 
} from './Icons';
import { SOCIAL_PROFILES, type SocialProfile } from '../data/social-profiles';

export const SocialProfileCards: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, textToCopy: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const renderIcon = (type: SocialProfile['iconType'], color: string) => {
    switch (type) {
      case 'linkedin':
        return <LinkedinIcon size={20} className="text-[#38bdf8]" />;
      case 'github':
        return <GithubIcon size={20} className="text-[#a3e635]" />;
      case 'discord':
        return <DiscordIcon size={20} className="text-[#818cf8]" />;
      case 'email':
        return <Mail size={20} className="text-[#34d399]" />;
      case 'portfolio':
        return <PortfolioIcon size={20} className="text-[#c084fc]" />;
      case 'credly':
        return <CredlyIcon size={20} className="text-[#f97316]" />;
      case 'google-dev':
        return <GoogleDevIcon size={20} className="text-[#60a5fa]" />;
      default:
        return <Sparkles size={20} style={{ color }} />;
    }
  };

  const handlePortfolioClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="social-profiles-container">
      <div className="social-profiles-header-strip">
        <div className="social-strip-title">
          <ShieldCheck size={16} className="text-lime" />
          <span>Verified Digital Identities & Developer Profiles</span>
        </div>
        <span className="social-strip-count">
          7 Professional Access Points
        </span>
      </div>

      <div className="social-profiles-grid">
        {SOCIAL_PROFILES.map((profile) => {
          const isCopied = copiedId === profile.id;
          const isCredly = profile.id === 'credly';
          const isPortfolio = profile.id === 'portfolio';
          const isDiscord = profile.id === 'discord';
          const isEmail = profile.id === 'email';

          return (
            <div
              key={profile.id}
              className={`social-profile-card ${profile.isConfigured ? 'configured' : 'unconfigured'}`}
            >
              {/* Card Header: Icon + Badge + Arrow */}
              <div className="profile-card-top">
                <div 
                  className="profile-icon-box"
                  style={{ boxShadow: `0 0 20px ${profile.accentColor}18` }}
                >
                  {renderIcon(profile.iconType, profile.accentColor)}
                </div>

                <div className="profile-badges-row">
                  <span 
                    className="profile-category-badge"
                    style={{
                      backgroundColor: `${profile.accentColor}15`,
                      color: profile.accentColor,
                      border: `1px solid ${profile.accentColor}30`,
                    }}
                  >
                    {profile.badgeLabel}
                  </span>

                  {profile.isConfigured ? (
                    profile.isExternal ? (
                      <ArrowUpRight size={14} className="text-slate-400" aria-hidden="true" />
                    ) : null
                  ) : (
                    <span title="Verification pending">
                      <Clock size={13} className="text-amber-400" />
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body: Title + Description + Status Text */}
              <div className="profile-card-body">
                <h3 className="profile-platform-title">
                  {profile.name}
                </h3>
                <p className="profile-card-desc">
                  {profile.description}
                </p>

                {profile.statusText && (
                  <div className="profile-status-pill">
                    <span 
                      className="profile-status-dot"
                      style={{ backgroundColor: profile.accentColor }} 
                    />
                    <span>{profile.statusText}</span>
                  </div>
                )}
              </div>

              {/* Card Action Bar */}
              <div className="profile-card-action-bar">
                {isCredly ? (
                  <div className="profile-action-unconfigured">
                    Verification pending · Profile URL placeholder
                  </div>
                ) : isDiscord ? (
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(profile.id, profile.copyValue || 'aravind_aariv_00729', e)}
                      className="profile-action-btn discord"
                      style={{ flex: 1 }}
                      aria-label="Copy Discord handle aravind_aariv_00729"
                    >
                      {isCopied ? <Check size={13} className="text-lime" /> : <Copy size={13} />}
                      <span>{isCopied ? 'Copied @aravind_aariv_00729!' : 'Copy Discord'}</span>
                    </button>
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noreferrer"
                      className="profile-action-link primary"
                      style={{ width: 'auto', padding: '0.5rem 0.65rem' }}
                      title="Open Discord web app"
                      aria-label="Open Discord in new tab"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                ) : isEmail ? (
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    <a
                      href={profile.url}
                      className="profile-action-btn email"
                      style={{ flex: 1 }}
                      aria-label="Send email to aariv948@gmail.com"
                    >
                      <Mail size={13} />
                      <span>Send Mail</span>
                    </a>
                    <button
                      type="button"
                      onClick={(e) => handleCopy(profile.id, profile.copyValue || 'aariv948@gmail.com', e)}
                      className="profile-action-link primary"
                      style={{ width: 'auto', padding: '0.5rem 0.65rem' }}
                      title={isCopied ? 'Copied!' : 'Copy email address'}
                      aria-label="Copy email address"
                    >
                      {isCopied ? <Check size={13} className="text-lime" /> : <Copy size={13} />}
                    </button>
                  </div>
                ) : isPortfolio ? (
                  <button
                    type="button"
                    onClick={handlePortfolioClick}
                    className="profile-action-btn portfolio"
                    aria-label="Scroll smoothly to portfolio top"
                  >
                    <span>Return to Top</span>
                    <ArrowUpRight size={13} />
                  </button>
                ) : (
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="profile-action-link primary"
                    aria-label={profile.ariaLabel}
                  >
                    <span>{profile.actionLabel}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
