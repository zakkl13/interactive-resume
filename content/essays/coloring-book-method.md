---
title: "The Coloring Book Method"
date: "2026-06-10"
summary: "How to make things with LLMs"
tags: ["ai-engineering", "agents"]
coverImage: "/essays/coloring-book-header.jpg"
coverAlt: "Three panels: a blank coloring book outline, the same scene scribbled past the lines in crayon, and a clean colored final"
---

The coloring book is an underrated piece of technology. My two-year-old can work inside one for an hour. Hand her the same crayons and a blank wall and the hour goes differently.

LLMs are the same.

Given a clear outline and a bounded task, a model will fill it in with surprising competence. Given a vague prompt and free rein, it will confidently produce a mural you did not ask for, in a room you did not want painted.

**Most LLM discourse fixates on the crayon.** Which model, which harness, which adversarial sub-agent orchestration pattern. The actual skill sits on either side of the model. The outline you hand it, the lines you draw, the page you've already framed. The careful erasing necessary to refine an LLM output into quality work.

This is how I produce high-quality things with LLMs. I outline what I want. The model fills in the outline. I verify and polish.

## The process

_Outline._ You decide the shape of the thing. What it is, what it isn't, where it ends. This is where intent lives.

![You draw the outline](/essays/coloring-book-outline.jpg)

An outline decomposes work. Sometimes this is a detailed spec for a complex software system, sometimes this is a list of questions you need answered or a series of stray thoughts to be examined. Always, an outline is a well-defined work breakdown the LLM can act on.

**Knowing what you want and describing it effectively is the critical skill.** Everything else is downstream.

_Fill._ The model does the interior. Tokens, lines of code, paragraphs, color. It will go past the lines. It will add a one-eyed monster you did not ask for. This is not a bug, it is the medium.

![The LLM fills it in](/essays/coloring-book-fill.jpg)

Better models, more reasoning tokens help. Better harness design helps. None of it saves a poor outline or removes the need to verify.

_Refine._ You take the eraser around the edges. The model went past the line, it always does, and you bring it back. You delete the monsters. You decide what stays.

![You refine, and decide what stays](/essays/coloring-book-refine.jpg)

First, you verify. Did it understand the task? Where did it color outside the lines? Verification scales by stakes. Production code gets read line by line. An HTML diagram is verified visually.  A one-off script gets skimmed and run. Facts and numbers get manually validated. In all cases, human verification in some form is non-negotiable. 

Then you polish and the work becomes yours again. You ask: is this legible? Does it extend cleanly? Does it fit the rest of the system? And the final question prior to shipping: *is this something I would proudly put my name on?*

## The loop is recursive

The outline → fill → refine loop builds upon itself.

The outline is rarely a thing you sit down and write from scratch. It is usually the polished output of a previous loop. You start with a vague intent, outline a set of research questions, let the model fill them, verify what came back, and polish the result into a spec. That spec is the outline for the next loop.

The polish step works the same way. You outline the changes you want, hand them back to the model, verify the new version, and polish again. Each polish round is its own miniature outline → fill → verify cycle.

This is true at every scale. Inside a one-off chat session. Inside an autonomous agent harness run. The format changes while the loop does not.

## Writing with LLMs

This essay was written in this manner.

The outline is the bold headlines you are reading and quick notes on what should exist in each one. I drew them up and the model filled them in. I edited the overshoot; cutting extra sentences and AI tics that bother readers, deleting parts that don't fit. I refined the prose until I felt confident in signing my name to it.

Writing and coding share the same structural problem. Technical writing, at least. Both are long-form artifacts assembled from smaller verifiable units. Both reward decomposition. Both punish the writer who hands the whole job to the model and the writer who refuses to hand any of it over.

The artifact changes; the loop is the same.

The coloring book method keeps you honest. The outline forces you to know what you wanted. The verification forces you to check what you got. The polish forces you to decide if it's good enough to ship.

The model can hold the crayon; it cannot decide what the picture is.
