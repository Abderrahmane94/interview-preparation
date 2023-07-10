import TOCInline from '@theme/TOCInline';


# Git
# <TOCInline toc={toc} />

## Can you explain what Git is and how it's used in software development?
Git is a **version control system** that enables developers to keep **track** of **changes** they make to their code, share code, and undo changes if necessary,
## Can you explain the difference between Git and SVN?
- **SVN** is a **centralized** version control system, with a **single repository** that all developers access
- **Git** is a **distributed** version control system, that is faster and more flexible than SVN,
## Can you explain the difference between a merge and rebase, and when would you use either?
- **merge** combines changes from different branches into one.
- **rebase** applies changes from one branch to another.
merges are best for **combining changes**, while rebases keep things in a **straight line**.
## Git branching strategies
Git branching strategies are approaches for organizing and managing branches in a Git repository. Here are three commonly used branching strategies:

1. **Feature Branching**: Create a new **branch** for each new **feature** or task. Developers work on their respective branches, isolate changes, and merge them back into the main branch (often called "master" or "main") when the feature is complete.

2. **GitFlow**: GitFlow defines a strict branching model with specific branch names and purposes. It utilizes two main branches: "**master**" (stable production code) and "**develop**" (integration branch for ongoing development). Feature branches are created from "**develop**" and merged back into it. **Releases** and **hotfixes** are managed using dedicated **branches**.

3. **Trunk-Based Development**: In this strategy, most development happens **directly** on the **main branch**. Developers commit changes frequently, and continuous integration/continuous deployment (CI/CD) processes are used to validate and deploy changes rapidly. Feature flags or toggles may be employed to selectively enable or disable new features.

The **choice** of branching strategy depends on factors such as **team size**, **project complexity**, **release frequency**, and **development practices**.