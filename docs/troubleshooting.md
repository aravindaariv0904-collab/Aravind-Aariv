# Troubleshooting Guide

Common issues and resolutions for the portfolio site.

---

## 1. Browser Performance

### Issue: The layout lag during page scroll
- **Symptom**: Scrolling on mobile devices feels heavy or frame rates drop.
- **Cause**: The backdrop blur filters and floating ambient gradient orbs consume substantial GPU memory on older mobile screens.
- **Resolution**:
  - Close other active browser tabs to allocate processing capacity.
  - Disable browser low-power modes which throttle graphics rendering.

---

## 2. Link Redirect Failures

### Issue: Repository links do not open
- **Symptom**: Clicking on project cards does not open the repository page.
- **Resolution**:
  - Check if your browser is blocking popups.
  - Links are configured with `target="_blank"` and `rel="noreferrer"` to open in separate tabs. Check your active tabs.
