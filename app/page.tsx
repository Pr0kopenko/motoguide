"use client";

import { useMemo, useState } from "react";

type DurationFilter = "all" | "short" | "medium" | "long";
type MoodFilter = "all" | "turns" | "views" | "escape";

type Route = {
  id: string;
  number: string;
  name: string;
  kicker: string;
  distance: number;
  hours: string;
  duration: Exclude<DurationFilter, "all">;
  moods: Exclude<MoodFilter, "all">[];
  moodLabel: string;
  effort: string;
  surface: string;
  start: string;
  score: string;
  description: string;
  warning: string;
  stops: { name: string; note: string }[];
  sources: { label: string; url: string }[];
};

const routes: Route[] = [
  {
    id: "oka",
    number: "01",
    name: "Окское кольцо",
    kicker: "главный выбор",
    distance: 470,
    hours: "9–11 ч",
    duration: "medium",
    moods: ["turns", "views"],
    moodLabel: "повороты · виды",
    effort: "средняя+",
    surface: "асфальт",
    start: "06:30",
    score: "9.2",
    description:
      "Высокий берег Оки, сосны и связка малых дорог вместо одного длинного транзита. Лучший баланс езды, остановок и возвращения до темноты.",
    warning:
      "Не пытайтесь собрать Тарусу, Поленово и Калугу в длинные прогулки: выберите одну главную остановку, иначе обратный участок придётся ехать уставшими.",
    stops: [
      { name: "Москва / юг МКАД", note: "полный бак, старт 06:30" },
      { name: "Серпухов", note: "короткий кофе, без заезда в центр" },
      { name: "Таруса", note: "вид на Оку, 35–45 минут" },
      { name: "Поленово", note: "точка выбора: музей или дорога дальше" },
      { name: "Алексин", note: "обед и контроль времени" },
      { name: "Калуга", note: "только если до 16:00" },
      { name: "Москва", note: "возврат по Киевскому направлению" },
    ],
    sources: [
      {
        label: "Маршруты выходного дня: Таруса и Поленово",
        url: "https://pedalny.ru/blog/marshruty-vyhodnogo-dnya-iz-moskvy",
      },
    ],
  },
  {
    id: "west",
    number: "02",
    name: "Западное малое",
    kicker: "короткий день",
    distance: 350,
    hours: "7–8,5 ч",
    duration: "short",
    moods: ["turns", "escape"],
    moodLabel: "ритм · без суеты",
    effort: "средняя",
    surface: "асфальт",
    start: "07:30",
    score: "8.7",
    description:
      "Руза, Можайск и маленькая Верея складываются в компактное кольцо. Много смены ритма и достаточно запаса, чтобы не превращать воскресенье в марафон.",
    warning:
      "На выезде по западному направлению быстро растёт дачный трафик. Если не вышли на МКАД до 08:00, разверните кольцо так, чтобы возвращаться через Минское шоссе.",
    stops: [
      { name: "Москва / запад МКАД", note: "старт до 07:30" },
      { name: "Руза", note: "вода и короткая пауза" },
      { name: "Можайск", note: "заправка" },
      { name: "Бородино", note: "видовая петля без длинной экскурсии" },
      { name: "Верея", note: "обед и высокий берег Протвы" },
      { name: "Москва", note: "возврат с запасом света" },
    ],
    sources: [
      {
        label: "Справка по связке Верея — Можайск",
        url: "https://routemaps.ru/r/5889-mozhaisk-vereya/",
      },
    ],
  },
  {
    id: "ugra",
    number: "03",
    name: "Угра и арт-поля",
    kicker: "вне привычного",
    distance: 510,
    hours: "10–12 ч",
    duration: "long",
    moods: ["views", "escape"],
    moodLabel: "простор · тишина",
    effort: "высокая",
    surface: "асфальт + грубый подъезд",
    start: "06:00",
    score: "8.9",
    description:
      "Калужские поля, Медынь и Никола-Ленивец. Это маршрут ради ощущения отрыва от города, а не ради быстрого темпа.",
    warning:
      "В отчётах райдеров последние 10–15 км описывались как щебень и разбитый асфальт. После дождя тяжёлому дорожнику и спортбайку лучше выбрать Окское кольцо.",
    stops: [
      { name: "Москва / юго-запад МКАД", note: "старт в 06:00" },
      { name: "Боровск", note: "кофе без долгой прогулки" },
      { name: "Медынь", note: "полный бак" },
      { name: "Никола-Ленивец", note: "2 часа на парк и обед" },
      { name: "Кондрово", note: "контроль усталости" },
      { name: "Малоярославец", note: "последняя пауза" },
      { name: "Москва", note: "не позже 20:00" },
    ],
    sources: [
      {
        label: "Личный мотопроезд: последние 10–15 км",
        url: "https://bikepost.ru/blog/95447/Nikola-Lenivets-dlja-tekh-kto-lenitsja-sezdit.html",
      },
      {
        label: "Личный маршрут длиной 470 км",
        url: "https://bikepost.ru/blog/56928/Nikola-Lenivets-art-park.html",
      },
    ],
  },
  {
    id: "konduki",
    number: "04",
    name: "Кондуки",
    kicker: "марсианский пейзаж",
    distance: 520,
    hours: "10–12 ч",
    duration: "long",
    moods: ["views"],
    moodLabel: "фото · масштаб",
    effort: "высокая",
    surface: "асфальт + грунтовая парковка",
    start: "06:00",
    score: "8.5",
    description:
      "Тульские второстепенные дороги приводят к терриконам и голубым карьерам. Сильная точка назначения, но меньше поворотов, чем на Оке.",
    warning:
      "Не съезжайте на сыпучие тропы вокруг карьеров на дорожной резине. Оставьте мотоцикл на твёрдом подъезде и последние виды соберите пешком.",
    stops: [
      { name: "Москва / юг МКАД", note: "старт до 06:00" },
      { name: "Кашира", note: "кофе и проверка ветра" },
      { name: "Венёв", note: "уход со скоростного транзита" },
      { name: "Кондуки", note: "1,5 часа на прогулку" },
      { name: "Богородицк", note: "обед и полный бак" },
      { name: "Серебряные Пруды", note: "пауза перед возвращением" },
      { name: "Москва", note: "возврат до темноты" },
    ],
    sources: [
      {
        label: "Мотопоездки в Кондуки по второстепенным дорогам",
        url: "https://bikepost.ru/tag/%D1%80%D0%BE%D0%BC%D0%B0%D0%BD%D1%86%D0%B5%D0%B2%D1%81%D0%BA%D0%B8%D0%B5%20%D0%B3%D0%BE%D1%80%D1%8B/",
      },
      {
        label: "Описание подъезда со стороны Богородицка",
        url: "https://moto.tours/stati/romantsevskie-gory-konduki/",
      },
    ],
  },
  {
    id: "volga",
    number: "05",
    name: "Верхняя Волга",
    kicker: "дальняя классика",
    distance: 500,
    hours: "10–12 ч",
    duration: "medium",
    moods: ["views", "escape"],
    moodLabel: "вода · путешествие",
    effort: "высокая",
    surface: "асфальт, качество меняется",
    start: "06:00",
    score: "8.4",
    description:
      "Калязин и Углич дают настоящее ощущение путешествия за один день: Волга, колокольня и длинные северные прогоны.",
    warning:
      "Отзывы по Р-104 противоречивы и быстро устаревают. Проверьте свежие комментарии о покрытии; заправляйтесь в Калязине до участка на Углич.",
    stops: [
      { name: "Москва / север МКАД", note: "старт в 06:00" },
      { name: "Дмитров", note: "кофе на выезде" },
      { name: "Калязин", note: "заправка и колокольня" },
      { name: "Углич", note: "обед, набережная, разворот 15:00" },
      { name: "Талдом", note: "альтернативный обратный ход" },
      { name: "Дубна", note: "пауза у Волги" },
      { name: "Москва", note: "длинный финальный отрезок" },
    ],
    sources: [
      {
        label: "Личный опыт Москва — Калязин — Углич",
        url: "https://bikepost.ru/blog/56342/Moskva-Kaljazin-Uglich.html",
      },
      {
        label: "Обсуждение состояния Р-104",
        url: "https://bmwclubmoto.ru/threads/41782/",
      },
    ],
  },
  {
    id: "suzdal",
    number: "06",
    name: "Суздаль в обход М7",
    kicker: "архитектура + дорога",
    distance: 540,
    hours: "11–13 ч",
    duration: "long",
    moods: ["turns", "views"],
    moodLabel: "поля · старые города",
    effort: "очень высокая",
    surface: "асфальт",
    start: "05:30",
    score: "8.6",
    description:
      "Киржач, Кольчугино, Суздаль и Юрьев-Польский собираются в большое кольцо без Переславля и почти без М7.",
    warning:
      "Это предел разумного однодневного формата. Если к 15:30 вы ещё в Суздале, возвращайтесь кратчайшим маршрутом и не добавляйте Юрьев-Польский.",
    stops: [
      { name: "Москва / восток МКАД", note: "старт 05:30" },
      { name: "Киржач", note: "кофе" },
      { name: "Кольчугино", note: "короткая техническая пауза" },
      { name: "Суздаль", note: "обед и прогулка до 90 минут" },
      { name: "Юрьев-Польский", note: "только если до 17:00" },
      { name: "Александров", note: "последняя заправка" },
      { name: "Москва", note: "длинный день, без запаса" },
    ],
    sources: [
      {
        label: "Справочная география маршрута",
        url: "https://yandex.ru/maps/?rtext=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0~%D0%9A%D0%B8%D1%80%D0%B6%D0%B0%D1%87~%D0%9A%D0%BE%D0%BB%D1%8C%D1%87%D1%83%D0%B3%D0%B8%D0%BD%D0%BE~%D0%A1%D1%83%D0%B7%D0%B4%D0%B0%D0%BB%D1%8C~%D0%AE%D1%80%D1%8C%D0%B5%D0%B2-%D0%9F%D0%BE%D0%BB%D1%8C%D1%81%D0%BA%D0%B8%D0%B9~%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2~%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0&rtt=auto",
      },
    ],
  },
];

const durationOptions: { id: DurationFilter; label: string }[] = [
  { id: "all", label: "любой день" },
  { id: "short", label: "до 8,5 часов" },
  { id: "medium", label: "9–12 часов" },
  { id: "long", label: "длинный день" },
];

const moodOptions: { id: MoodFilter; label: string }[] = [
  { id: "all", label: "всё" },
  { id: "turns", label: "повороты" },
  { id: "views", label: "виды" },
  { id: "escape", label: "без людей" },
];

function mapUrl(route: Route) {
  const points = route.stops.map((stop) => stop.name.split(" / ")[0]).join("~");
  return `https://yandex.ru/maps/?rtext=${encodeURIComponent(points)}&rtt=auto`;
}

export default function Home() {
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [mood, setMood] = useState<MoodFilter>("all");
  const [selectedId, setSelectedId] = useState("oka");

  const visibleRoutes = useMemo(
    () =>
      routes.filter(
        (route) =>
          (duration === "all" || route.duration === duration) &&
          (mood === "all" || route.moods.includes(mood)),
      ),
    [duration, mood],
  );

  const selected =
    visibleRoutes.find((route) => route.id === selectedId) ??
    visibleRoutes[0] ??
    routes.find((route) => route.id === selectedId) ??
    routes[0];

  const resetFilters = () => {
    setDuration("all");
    setMood("all");
    setSelectedId("oka");
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ВИРАЖ — на главную">
          <span className="brand-mark">V</span>
          <span>ВИРАЖ</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#routes">Маршруты</a>
          <a href="#method">Как выбирать</a>
          <a href="#checklist">Перед стартом</a>
        </nav>
        <span className="edition">Выпуск 01 · Москва</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Roadbook для одного светового дня</p>
          <h1>
            Не «куда»,
            <br />
            а <em>по какой дороге.</em>
          </h1>
          <p className="hero-lead">
            Шесть кольцевых маршрутов из Москвы — с честной нагрузкой,
            характером дороги и точкой, где пора разворачиваться.
          </p>
          <a className="primary-link" href="#routes">
            Выбрать маршрут <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="hero-map" aria-label="Схематичная карта маршрутов вокруг Москвы">
          <div className="map-grid" aria-hidden="true" />
          <div className="map-orbit orbit-one" aria-hidden="true" />
          <div className="map-orbit orbit-two" aria-hidden="true" />
          <div className="route-line line-one" aria-hidden="true" />
          <div className="route-line line-two" aria-hidden="true" />
          <span className="map-pin pin-center">Москва</span>
          <span className="map-pin pin-north">Волга</span>
          <span className="map-pin pin-east">Суздаль</span>
          <span className="map-pin pin-south">Ока</span>
          <span className="map-pin pin-west">Угра</span>
          <div className="map-caption">
            <span>56°00′ N</span>
            <span>37°37′ E</span>
          </div>
        </div>

        <div className="hero-stats" aria-label="Параметры каталога">
          <div><strong>6</strong><span>колец</span></div>
          <div><strong>350–540</strong><span>км от МКАД</span></div>
          <div><strong>1</strong><span>световой день</span></div>
        </div>
      </section>

      <section className="route-section" id="routes">
        <div className="section-heading">
          <p className="eyebrow">01 / Выбор</p>
          <h2>Какой день вам нужен?</h2>
          <p>
            Сначала ограничьте время. Потом выберите, за чем именно выезжаете.
          </p>
        </div>

        <div className="filter-panel" aria-label="Фильтры маршрутов">
          <fieldset>
            <legend>Сколько времени</legend>
            <div className="filter-row">
              {durationOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={duration === option.id}
                  onClick={() => setDuration(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Ради чего едем</legend>
            <div className="filter-row">
              {moodOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  aria-pressed={mood === option.id}
                  onClick={() => setMood(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
          <button className="reset-button" type="button" onClick={resetFilters}>
            Сбросить
          </button>
        </div>

        <div className="catalog-layout">
          <div className="route-catalog" aria-live="polite">
            <div className="catalog-meta">
              <span>{visibleRoutes.length} из {routes.length}</span>
              <span>оценка от МКАД</span>
            </div>
            {visibleRoutes.length ? (
              visibleRoutes.map((route) => {
                const isSelected = route.id === selected.id;
                return (
                  <button
                    className="route-card"
                    data-route-card
                    data-selected={isSelected}
                    type="button"
                    key={route.id}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(route.id)}
                  >
                    <span className="route-number">{route.number}</span>
                    <span className="route-main">
                      <span className="route-kicker">{route.kicker}</span>
                      <strong>{route.name}</strong>
                      <span className="route-mood">{route.moodLabel}</span>
                    </span>
                    <span className="route-distance">
                      <strong>{route.distance}</strong>
                      <span>км</span>
                    </span>
                    <span className="route-time">{route.hours}</span>
                    <span className="selected-label">
                      {isSelected ? "Выбран" : "Открыть"} <span aria-hidden="true">↗</span>
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="empty-state">
                <strong>Такого дня пока нет.</strong>
                <p>Снимите одно ограничение — и маршрут появится.</p>
                <button type="button" onClick={resetFilters}>Показать все</button>
              </div>
            )}
          </div>

          <aside className="route-detail" aria-labelledby="detail-title">
            <div className="detail-topline">
              <span>Roadbook / {selected.number}</span>
              <span className="route-score" aria-label={`Редакционная оценка ${selected.score} из 10`}>
                {selected.score}<small>/10</small>
              </span>
            </div>
            <h3 id="detail-title">{selected.name}</h3>
            <p className="detail-description">{selected.description}</p>

            <dl className="detail-metrics">
              <div><dt>Старт</dt><dd>{selected.start}</dd></div>
              <div><dt>Весь день</dt><dd>{selected.hours}</dd></div>
              <div><dt>Нагрузка</dt><dd>{selected.effort}</dd></div>
              <div><dt>Покрытие</dt><dd>{selected.surface}</dd></div>
            </dl>

            <ol className="roadbook">
              {selected.stops.map((stop, index) => (
                <li key={`${selected.id}-${stop.name}`}>
                  <span className="stop-index">{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{stop.name}</strong><small>{stop.note}</small></span>
                </li>
              ))}
            </ol>

            <div className="warning-box">
              <span>Главный риск</span>
              <p>{selected.warning}</p>
            </div>

            <a className="map-button" href={mapUrl(selected)} target="_blank" rel="noreferrer">
              Открыть цепочку точек
              <span aria-hidden="true">↗</span>
            </a>

            <div className="source-list">
              <span>Опыт путешественников</span>
              {selected.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                  {source.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-intro">
          <p className="eyebrow">02 / Метод</p>
          <h2>Красивая дорога — это не одна цифра.</h2>
          <p>
            Мы не называем маршрут лучшим только потому, что в конце есть
            известный город. Оцениваем сам день в седле.
          </p>
        </div>
        <div className="method-grid">
          <article><span>01</span><h3>Ритм</h3><p>Сколько в маршруте смен темпа, связок и малых дорог вместо прямого транзита.</p></article>
          <article><span>02</span><h3>Виды</h3><p>Вода, открытые поля, высокий берег и точки, ради которых хочется остановиться.</p></article>
          <article><span>03</span><h3>Трафик</h3><p>Не обещаем пустоту, но избегаем маршрутов, где большая часть дня проходит среди фур.</p></article>
          <article><span>04</span><h3>Запас</h3><p>Хороший маршрут оставляет силы и свет на обратный участок, а не только красивую первую половину.</p></article>
        </div>
      </section>

      <section className="not-route">
        <div>
          <p className="eyebrow">Отдельный формат</p>
          <h2>Нижний? Да.<br />Но не сегодня обратно.</h2>
        </div>
        <p>
          Около 850–900 км туда-обратно — это марш-бросок, а не однодневный
          roadbook. Оставьте Нижний Новгород на поездку с ночёвкой: город
          заслуживает вечера, а вы — свежей головы на обратной дороге.
        </p>
      </section>

      <section className="checklist-section" id="checklist">
        <div className="section-heading checklist-heading">
          <p className="eyebrow">03 / Перед стартом</p>
          <h2>Пять минут, которые спасают день.</h2>
          <p>Данные маршрута — редакционная оценка, не live-навигация.</p>
        </div>
        <ol className="checklist">
          <li><span>01</span><div><strong>Погода по всему кольцу</strong><p>Проверьте не только Москву, но и дальнюю точку плюс время возвращения.</p></div></li>
          <li><span>02</span><div><strong>Ремонты и перекрытия</strong><p>Откройте маршрут в навигаторе утром. Особенно Р-104, подъезды к Угре и Кондукам.</p></div></li>
          <li><span>03</span><div><strong>Топливо</strong><p>Планируйте заправку на 60–80 км раньше резерва и синхронизируйте запас обоих мотоциклов.</p></div></li>
          <li><span>04</span><div><strong>Время разворота</strong><p>Назначьте его до старта. Если опоздали — сокращайте остановки, а не запас света.</p></div></li>
          <li><span>05</span><div><strong>Состояние райдера</strong><p>После обеда отдельно оцените концентрацию. Усталость — достаточная причина укоротить кольцо.</p></div></li>
        </ol>
      </section>

      <footer>
        <div className="footer-brand">ВИРАЖ</div>
        <div>
          <p>Кураторский мотогайд по дорогам вокруг Москвы.</p>
          <p>Редакционная проверка: 14 июля 2026</p>
        </div>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
