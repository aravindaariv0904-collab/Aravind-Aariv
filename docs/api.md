# API & Data Reference

This document maps out the structured JSON profiles and projects metadata schemas that feed the portfolio.

---

## 1. Projects Schema

Projects are defined in a schema to enable unified loops:
```typescript
interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  link: string; // GitHub repo link
  icon: React.ReactNode;
}
```

---

## 2. Profile Details

Defines core metadata:
```typescript
const PROFILE = {
  name: "Aravind Aariv",
  title: "Principal AI Engineer & Full-Stack Architect",
  email: "aravindaariv0904@gmail.com",
  location: "Pune / Noida, India",
  github: "https://github.com/aravindaariv0904-collab",
  bio: "..."
};
```
