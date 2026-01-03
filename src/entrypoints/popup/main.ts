import "./style.css";

import {
  ExclusionPattern,
  loadPatterns,
  STORAGE_KEY,
  urlClipr,
} from "@/utils/clipr";
import { browser, storage } from "#imports";

const patternInput = getElement("patternInput", HTMLInputElement);
const addBtn = getElement("addBtn", HTMLButtonElement);
const patternsList = getElement("patternsList", HTMLUListElement);
const emptyState = getElement("emptyState", HTMLParagraphElement);
const copyUrlBtn = getElement("copyUrlBtn", HTMLButtonElement);
const copyUrlIcon = getElement("copyUrlIcon", HTMLSpanElement);
const copyUrlText = getElement("copyUrlText", HTMLSpanElement);

async function savePatterns(patterns: ExclusionPattern[]): Promise<void> {
  await storage.setItem(STORAGE_KEY, patterns);
}

async function renderPatterns(): Promise<void> {
  const patterns = await loadPatterns();

  if (patterns.length === 0) {
    patternsList.style.display = "none";
    emptyState.style.display = "block";
  } else {
    patternsList.style.display = "block";
    emptyState.style.display = "none";

    patternsList.innerHTML = patterns
      .map(
        (p) => `
        <li class="pattern-item">
          <span class="pattern-text">${escapeHtml(p.pattern)}</span>
          <button class="delete-btn" data-id="${p.id}">x</button>
        </li>
      `,
      )
      .join("");
  }
}

async function addPattern(pattern: string): Promise<void> {
  const trimmed = pattern.trim();
  if (!trimmed) return;

  const patterns = await loadPatterns();

  if (patterns.some((p) => p.pattern === trimmed)) {
    alert("This pattern already exists!");
    return;
  }

  const newPattern: ExclusionPattern = {
    id: crypto.randomUUID(),
    pattern: trimmed,
  };

  patterns.push(newPattern);
  await savePatterns(patterns);
  await renderPatterns();

  patternInput.value = "";
  patternInput.focus();
}

async function deletePattern(id: string): Promise<void> {
  const patterns = await loadPatterns();
  const filtered = patterns.filter((p) => p.id !== id);
  await savePatterns(filtered);
  await renderPatterns();
}

function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

addBtn.addEventListener("click", () => {
  addPattern(patternInput.value);
});

patternInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addPattern(patternInput.value);
  }
});

// Use event delegation for delete buttons
patternsList.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("delete-btn")) {
    const id = (target as HTMLButtonElement).dataset.id!;
    await deletePattern(id);
  }
});

copyUrlBtn.addEventListener("click", async () => {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab.url) {
      alert("No URL found!");
      return;
    }

    const patterns = await loadPatterns();
    const cleanedURL = urlClipr(
      tab.url,
      patterns.map((p) => p.pattern),
    );
    await navigator.clipboard.writeText(cleanedURL);

    const originalIcon = copyUrlIcon.innerHTML;
    const originalText = copyUrlText.textContent;

    copyUrlIcon.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    copyUrlText.textContent = "Copied!";

    setTimeout(() => {
      copyUrlIcon.innerHTML = originalIcon;
      copyUrlText.textContent = originalText;
    }, 1000);
  } catch (error) {
    console.error("Failed to copy URL:", error);
    alert("Failed to copy URL");
  }
});

storage.watch<ExclusionPattern[]>(STORAGE_KEY, async () => {
  await renderPatterns();
});

renderPatterns();

function getElement<T extends HTMLElement>(id: string, type: { new (): T }): T {
  const el = document.getElementById(id);
  if (!el || !(el instanceof type)) {
    throw new Error(`Element #${id} not found or wrong type`);
  }
  return el;
}
