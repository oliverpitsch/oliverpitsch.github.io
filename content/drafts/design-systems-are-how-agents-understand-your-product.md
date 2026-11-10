---
# DRAFT. Lives outside content/articles, so it is not built or listed.
# To publish: fill the TODOs, check every claim, add a hero image,
# then move this file to content/articles/.
slug: design-systems-are-how-agents-understand-your-product
Title: 'Design Systems Are How Agents Understand Your Product'
author: Oliver Pitsch
date: TODO
description: Agents now build a growing share of every product. They only build it well when they understand it. After years of running design system families across teams, channels and countries, here is why the design system has become the most important thing a product leader can give an agent.
keywords:
  - design systems
  - design systems for AI agents
  - agent-ready design system
  - product leadership
  - AI-native product development
  - UX leadership
---

For most of my career, a design system had one audience: people. Designers who needed the same button twice. Engineers who needed to know which button that was. Product managers who needed a shared language for what "done" looks like.

That audience just grew. The newest members of every product team do not read Confluence, do not join the design critique and do not remember last quarter's decision about spacing. They are agents. And they are writing a growing share of the product.

## What a design system family taught me about scale

At Trusted Shops I spent eight years with design systems at the center of my work. Helios was not one library. It was a family: one foundation, shared in design and in code, carried across products, channels and touchpoints, and used by more than ten product teams in six countries.

TODO: one concrete story. A moment where Helios saved a launch, or where its absence would have cost you. Ideally with a number (products, components, time saved, consistency score).

What made it work was never the component count. It was three things:

1. **Shared decisions, written down.** Tokens, patterns and the reasons behind them, so a team in another country could make the same call without asking.
2. **Ownership inside the squads.** Design, content and engineering built it together. It was not a service a central team handed out.
3. **Governance that people trusted.** Clear rules for when to extend the system and when to push back.

Every one of those things turns out to be exactly what an agent needs.

## Agents have the same problem new hires have, at a thousand times the speed

An agent dropped into your codebase is a very fast new hire with no onboarding. It will happily ship a screen. It will also invent a fourth shade of blue, a new card style and a spacing scale that drifts a little further with every prompt.

The fix is not a better prompt. The fix is the same thing that worked for people: a system it can read.

At Ordio, as Head of Product, we made the design system agent-ready. TODO: what that meant in practice. For example: tokens exposed in a format agents read, pattern rules written as instructions, examples of correct and incorrect usage, checks that catch drift before review.

The result was that AI-generated output stayed aligned with product quality, patterns and system logic, instead of each team cleaning up after its agents. TODO: any measurable effect (review time, rework, consistency).

## What changes for product and design leaders

If agents build more of the product, the design system stops being a design team concern. It becomes product infrastructure, in the same league as your API contracts.

That shifts a few things:

- **The audience of documentation changes.** Write for a reader that takes every word literally and never asks a follow-up question.
- **Taste has to be explicit.** "It should feel calm" is not an instruction. Spacing rules, hierarchy rules and do and don't examples are.
- **Ownership moves into the squads.** The teams that work with agents every day see drift first. They need to own fixing it in the system, not in the screen.
- **Quality gates move earlier.** A hardcoded color should fail a check before a human ever sees it.

## The same system, from enterprise to solo

I see the same pattern in my own products. Claude and Codex build new screens for Joinride, Famili and neuerName from a design system they can read, and the screens come out on brand without me redrawing them. I wrote about that side in [Design Doesn't Start in Figma Anymore](/articles/design-doesnt-start-in-figma-anymore).

At enterprise scale the stakes are higher and the payoff is bigger. Ten teams, six countries and a handful of agents per team is a lot of output. A design system that people and agents both understand is how that output still feels like one product.

TODO: closing line in your voice. Possibly the question you ask a CPO in the first week: "Could an agent build a correct screen in your product today, using only what is written down?"
