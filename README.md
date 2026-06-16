# GitHub Team Workflow Guide

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

## 2. Create Your Branch

Always create your own branch before starting work.

```bash
git checkout -b feature-your-task
```

Example:

```bash
git checkout -b feature-login-page
```

---

## 3. Make Your Changes

Edit files and save your work.

Check your changes:

```bash
git status
```

---

## 4. Commit Your Changes

Add files:

```bash
git add .
```

Commit them:

```bash
git commit -m "Added login page"
```

---

## 5. Push Your Branch

```bash
git push -u origin feature-your-task
```

Example:

```bash
git push -u origin feature-login-page
```

---

## 6. Create a Pull Request (PR)

1. Open the repository on GitHub.
2. Click **Compare & Pull Request**.
3. Add a title and description.
4. Click **Create Pull Request**.

---

## 7. Review and Merge

* Team members review the Pull Request.
* Make any requested changes.
* After approval, merge the Pull Request into `main`.

---

## 8. Get the Latest Changes

Before starting a new task:

```bash
git checkout main
git pull origin main
```

Then create a new branch:

```bash
git checkout -b feature-new-task
```

---

## Team Rules

✅ Create a new branch for every task.

✅ Commit often with clear messages.

✅ Create a Pull Request before merging.

✅ Review teammates' Pull Requests.

❌ Do not work directly on the `main` branch.

❌ Do not merge your own code without review.

---

## Quick Reference

```bash
# Create branch
git checkout -b feature-name

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push branch
git push -u origin feature-name

# Update main branch
git checkout main
git pull origin main
```
