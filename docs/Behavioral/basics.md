import TOCInline from '@theme/TOCInline';


# Basics
# <TOCInline toc={toc} />

## Give me an example of a project you completed successfully.
I'll use the **STAR method** (Situation → Task → Action → Result):

- **Situation**: In my previous role, the team had a legacy monolithic application that was becoming a bottleneck — deployments took hours and any change risked breaking unrelated features.
- **Task**: I was asked to lead the migration of the most critical module (order management) to a standalone Spring Boot microservice.
- **Action**: I defined the API contract first using OpenAPI/Swagger, extracted the domain logic, set up a CI/CD pipeline with Jenkins, and coordinated with the front-end team to switch over gradually using a feature flag.
- **Result**: Deployment time for that module dropped from 2 hours to under 10 minutes. The team adopted the same approach for two more modules in the following quarter.

> **Tip**: Choose a project where you had a clear impact. Quantify the result whenever possible.

## Tell me about a time when you had to solve a difficult technical problem.
- **Situation**: Our production application started experiencing random `OutOfMemoryError` crashes every 2–3 days. The issue was intermittent and not reproducible in staging.
- **Task**: Identify the root cause and fix it without taking the service down.
- **Action**: I enabled JVM heap dump on crash (`-XX:+HeapDumpOnOutOfMemoryError`), analyzed the dump with Eclipse MAT, and discovered a cache that was holding references to large objects indefinitely — it was never evicted because the TTL configuration was being overridden by a default Spring Boot property.
- **Result**: I fixed the cache configuration and added a monitoring alert for heap usage above 80%. The crashes stopped immediately and we gained visibility we didn't have before.

> **Tip**: Show your debugging process — interviewers care about *how* you think, not just that you fixed it.

## Describe a situation when you disagreed with a colleague and how you resolved it.
- **Situation**: A senior colleague proposed using a shared database between two microservices to avoid duplicating data. I believed this violated the independence principle of microservices.
- **Task**: Advocate for the right architectural approach without creating conflict.
- **Action**: Instead of a direct confrontation, I prepared a short document with pros/cons of both approaches, referenced Martin Fowler's microservices patterns, and proposed a meeting with the tech lead to discuss. I acknowledged the short-term cost of data duplication and suggested event-driven synchronization as the middle ground.
- **Result**: The team agreed to use an event-driven approach. My colleague appreciated that I backed my position with data rather than opinion, and we collaborated closely on the implementation.

> **Tip**: Show that you can hold your ground professionally while remaining open to dialogue.

## What would you do if you were given a project that you didn't know how to complete?
1. **Break it down**: Divide the project into smaller, well-understood pieces and identify exactly which parts are unknown.
2. **Research**: Use official documentation, reputable sources, and similar open-source projects as references.
3. **Ask early**: Raise unknowns with the team or the tech lead as soon as possible — never stay blocked silently.
4. **Prototype**: Build a small proof-of-concept for the most uncertain part before committing to a full implementation.
5. **Iterate**: Deliver incrementally, getting feedback along the way rather than waiting until everything is "perfect".

> I see being given an unknown project as an opportunity to grow. The ability to learn quickly and adapt is more valuable than knowing everything upfront.

## How would you handle a difficult customer?
1. **Listen first**: Let them explain their concern fully without interrupting. Most frustration comes from feeling unheard.
2. **Acknowledge**: Show empathy — "I understand this is frustrating, and I want to help resolve it."
3. **Clarify**: Ask precise questions to understand the real underlying need versus the stated complaint.
4. **Set clear expectations**: Be honest about what is possible and in what timeframe — overpromising makes things worse.
5. **Follow up**: After resolving the issue, check back to confirm they're satisfied.

> The goal is to turn a difficult interaction into a trust-building opportunity. Staying calm and solution-focused is key.

## What would you do if a project you were working on was suddenly cancelled?
1. **Accept the decision**: Business priorities change — cancellation is not a personal failure.
2. **Document and archive**: Ensure all work is properly committed, documented, and stored so it can be referenced or resumed later.
3. **Extract learnings**: Write a short retrospective on what went well and what to avoid next time.
4. **Communicate**: Notify all stakeholders (front-end, QA, ops) who may have dependencies on the cancelled work.
5. **Move on productively**: Redirect energy toward the next priority without dwelling on the cancelled effort.

> Showing maturity and professionalism when things don't go as planned is one of the most valued qualities in a developer.

## Tell me about your computer science degree and what you learned
My degree gave me a strong foundation in:
- **Core fundamentals**: Algorithms, data structures, complexity analysis (Big-O), and discrete mathematics — the building blocks behind every technical problem.
- **Software engineering**: Object-oriented design, UML modeling, and software lifecycle (requirements → design → implementation → testing).
- **Systems**: Operating systems (processes, threads, memory management), networking (TCP/IP, HTTP), and databases (relational model, SQL, normalization).
- **Practical skills**: Working in teams on multi-month projects, using version control, and writing technical documentation.

Beyond the coursework, what I value most is that it taught me *how to think* about problems — to decompose complexity, reason about trade-offs, and question assumptions.

## What are your best qualities?
- **Problem-solving mindset**: I enjoy breaking down complex technical problems into manageable parts and finding clean solutions.
- **Continuous learning**: I actively follow tech blogs, read documentation, and work on side projects to stay current.
- **Collaboration**: I communicate well with teammates, am comfortable giving and receiving feedback, and value collective intelligence over individual heroics.
- **Attention to detail**: I care about code quality, write meaningful tests, and document my work so others can maintain it.
- **Reliability**: I deliver what I commit to, flag risks early, and don't hesitate to ask for help when needed.

## Why should we hire you?
- I bring solid hands-on experience with the Java/Spring ecosystem — the core of your stack.
- I'm not just a coder: I think about architecture, maintainability, and the impact on the team downstream.
- I adapt quickly — when I don't know something, I learn it efficiently without needing hand-holding.
- I'm a team player who communicates proactively and contributes beyond my individual ticket.
- I'm genuinely interested in this role specifically — not just looking for any job, but the right one.

> **Tip**: Tailor this to the company you're interviewing at. Reference something specific about their product, stack, or culture.

## What is one solution that you are most proud of?
A performance optimization I implemented on a REST API that was timing out under load:

- The endpoint was fetching related data with N+1 queries — one query per row returned.
- I rewrote the JPA repository to use a single JOIN FETCH query and added a second-level Hibernate cache for the read-heavy reference data.
- Response time dropped from ~3 seconds to under 200ms under the same load.

What I'm proud of isn't just the result, but the process: I measured first (with JProfiler), confirmed the root cause, fixed it in the right layer, and added a test to prevent regression.

## Where do you see yourself in 5 years?
In 5 years, I see myself as a **senior developer or tech lead**, with:
- Deep expertise in distributed systems and cloud-native Java applications.
- The ability to make architectural decisions and mentor junior developers.
- A track record of delivering complex projects end-to-end, not just individual features.

I'm not just chasing a title — I want to grow in a place where I'm challenged, where the team cares about quality, and where I can contribute to meaningful products.

## What are your weaknesses?
**Perfectionism**: I sometimes spend more time than necessary refining something before sharing it, because I want it to be right before others see it.

I've been actively working on this by:
- Adopting a "good enough to share" mindset for drafts and WIP branches.
- Using time-boxing — I set a limit on how long I'll spend on a non-critical detail before moving on.
- Reminding myself that feedback early is more valuable than a polished output late.

> **Tip**: Always pair a weakness with a concrete action you're taking to address it. Never say "I work too hard" — interviewers see through it.

## When you are blocked in a ticket, how did you react?
1. Bring it to the attention of the Scrum team during the appropriate forum, such as the Daily Scrum or a team meeting.
2. Seek help from the relevant team members, such as the Scrum Master, Product Owner, or other developers who might have the knowledge or expertise to assist in resolving the blockage.
3. Together with the team, discuss and evaluate potential solutions to overcome the blockage (**collective intelligence to find a solution**).
