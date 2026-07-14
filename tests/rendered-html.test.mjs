import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Russian motoguide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang=["']ru["']/i);
  assert.match(html, /<title>ВИРАЖ — мотомаршруты одного дня из Москвы<\/title>/i);
  assert.match(html, /Не «куда»/);
  assert.match(html, /Какой день вам нужен/);
  assert.match(html, /Нижний\? Да/);
  assert.match(html, /Редакционная проверка: 14 июля 2026/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Codex is working/i);
});

test("renders six comparable route cards and a usable roadbook", async () => {
  const response = await render();
  const html = await response.text();

  assert.equal((html.match(/data-route-card/g) ?? []).length, 6);
  for (const routeName of [
    "Окское кольцо",
    "Западное малое",
    "Угра и арт-поля",
    "Кондуки",
    "Верхняя Волга",
    "Суздаль в обход М7",
  ]) {
    assert.match(html, new RegExp(routeName));
  }

  assert.match(html, /Roadbook \/ (?:<!-- -->)?01/);
  assert.match(html, /Главный риск/);
  assert.match(html, /Открыть цепочку точек/);
  assert.match(html, /https:\/\/yandex\.ru\/maps\/\?rtext=/);
  assert.match(html, /target=["']_blank["']/);
});

test("keeps product documentation and acceptance criteria in the repository", async () => {
  const product = await readFile(
    new URL("../docs/PRODUCT.md", import.meta.url),
    "utf8",
  );

  assert.match(product, /## 3\. Продуктовая защита/);
  assert.match(product, /## 6\. Критерии приёмки/);
  assert.match(product, /## 7\. Тестовый набор/);
  assert.match(product, /T12/);
});
