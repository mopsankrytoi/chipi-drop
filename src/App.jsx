import { useState } from "react";
import {
  Gift, Home, Package, UserRound, Sparkles, ChevronRight,
  Leaf, ShieldCheck, Star, CircleHelp
} from "lucide-react";
import "./App.css";

const cases = [
  { id: "forest", name: "Лесная коллекция", subtitle: "Спокойствие в каждой детали", emoji: "🌿", tone: "forest" },
  { id: "royal", name: "Изумрудный набор", subtitle: "Блеск зелёных оттенков", emoji: "💚", tone: "emerald" },
  { id: "night", name: "Ночная коллекция", subtitle: "Мягкое сияние звёзд", emoji: "🌙", tone: "night" },
  { id: "garden", name: "Сад чудес", subtitle: "Маленькие приятные находки", emoji: "🌸", tone: "garden" }
];

const rewards = [
  { name: "Изумрудный лист", rarity: "Обычный", emoji: "🍃", color: "common" },
  { name: "Звёздный талисман", rarity: "Редкий", emoji: "🌟", color: "rare" },
  { name: "Лунный кристалл", rarity: "Особенный", emoji: "🔮", color: "special" },
  { name: "Корона леса", rarity: "Коллекционный", emoji: "👑", color: "collectible" },
  { name: "Маленький росток", rarity: "Обычный", emoji: "🌱", color: "common" },
  { name: "Сияющий цветок", rarity: "Редкий", emoji: "🌺", color: "rare" }
];

export default function App() {
  const [page, setPage] = useState("home");
  const [inventory, setInventory] = useState([]);
  const [opening, setOpening] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  function openCase(item) {
    if (opening) return;
    setSelectedCase(item);
    setResult(null);
    setOpening(true);
    window.setTimeout(() => {
      const prize = rewards[Math.floor(Math.random() * rewards.length)];
      const owned = { ...prize, id: `${Date.now()}-${Math.random()}` };
      setInventory((current) => [owned, ...current]);
      setResult(owned);
      setOpening(false);
    }, 1200);
  }

  function go(next) {
    setPage(next);
    setResult(null);
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <button className="brand" onClick={() => go("home")} aria-label="На главную">
          <span className="brand-mark"><Leaf size={19} /></span>
          <span>ЧИПИ <b>ДРОП</b></span>
        </button>
        <div className="demo-pill"><span /> ДЕМО-РЕЖИМ</div>
        <div className="top-profile"><div className="avatar-small">Ч</div></div>
      </header>

      <main className="main-content">
        {page === "home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={14} /> МИР МАЛЕНЬКИХ ОТКРЫТИЙ</div>
                <h1>Твоя коллекция.<br /><em>Твоя история.</em></h1>
                <p>Открывай бесплатные тематические наборы и собирай красивые цифровые предметы.</p>
                <button className="primary-button" onClick={() => go("cases")}>
                  Смотреть коллекции <ChevronRight size={17} />
                </button>
                <div className="hero-note"><ShieldCheck size={15} /> Только бесплатная демонстрационная коллекция</div>
              </div>
              <div className="hero-visual">
                <div className="orbit orbit-a" />
                <div className="orbit orbit-b" />
                <div className="hero-gift">🎁</div>
                <div className="float-leaf leaf-a">🍃</div>
                <div className="float-leaf leaf-b">✨</div>
                <div className="visual-caption">CHIPI COLLECTION <span>№ 001</span></div>
              </div>
            </section>

            <section className="section-block">
              <div className="section-heading">
                <div><div className="eyebrow">ВЫБОР ЧИПИ</div><h2>Популярные коллекции</h2></div>
                <button className="text-button" onClick={() => go("cases")}>Все коллекции <ChevronRight size={15} /></button>
              </div>
              <div className="collection-grid">
                {cases.slice(0, 3).map((item) => <CaseCard key={item.id} item={item} onClick={() => { setSelectedCase(item); go("cases"); }} />)}
              </div>
            </section>
          </>
        )}

        {page === "cases" && (
          <section className="section-block page-section">
            <div className="eyebrow">ВЫБЕРИ НАСТРОЕНИЕ</div>
            <h2>Коллекции</h2>
            <p className="section-description">Каждое открытие бесплатно. Предметы существуют только внутри этой демонстрационной коллекции.</p>
            <div className="collection-grid">
              {cases.map((item) => <CaseCard key={item.id} item={item} onClick={() => openCase(item)} />)}
            </div>
            {opening && <div className="opening-panel"><div className="spinner">✦</div><b>Готовим сюрприз...</b><span>{selectedCase?.name}</span></div>}
            {result && <div className="result-panel">
              <div className={`result-art ${result.color}`}>{result.emoji}</div>
              <div className="eyebrow">НОВАЯ НАХОДКА</div>
              <h3>{result.name}</h3><p>{result.rarity}</p>
              <button className="primary-button" onClick={() => setResult(null)}>Продолжить <ChevronRight size={16} /></button>
            </div>}
          </section>
        )}

        {page === "collection" && (
          <section className="section-block page-section">
            <div className="eyebrow">ТВОИ НАХОДКИ</div>
            <h2>Моя коллекция</h2>
            <p className="section-description">Здесь сохраняются предметы, которые ты нашёл в этой сессии.</p>
            {inventory.length ? <div className="collection-grid">
              {inventory.map((item) => <div className="item-card" key={item.id}><div className={`item-art ${item.color}`}>{item.emoji}</div><b>{item.name}</b><span>{item.rarity}</span></div>)}
            </div> : <div className="empty-state"><div>🌱</div><b>Коллекция пока пустая</b><p>Открой любую бесплатную коллекцию, чтобы найти первый предмет.</p><button className="primary-button" onClick={() => go("cases")}>К коллекциям <ChevronRight size={16} /></button></div>}
          </section>
        )}

        {page === "profile" && (
          <section className="section-block page-section profile-section">
            <div className="profile-avatar">🍀</div>
            <div className="eyebrow">ТВОЙ ПРОФИЛЬ</div>
            <h2>Участник Чипи Дроп</h2>
            <p className="section-description">Демонстрационный профиль</p>
            <div className="stats-row"><div><b>{inventory.length}</b><span>Предметов найдено</span></div><div><b>{cases.length}</b><span>Коллекций доступно</span></div></div>
            <div className="info-note"><CircleHelp size={17} /><span>Это первая версия приложения. Прогресс пока хранится только до перезагрузки страницы.</span></div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        <NavButton icon={<Home />} label="Главная" active={page === "home"} onClick={() => go("home")} />
        <NavButton icon={<Gift />} label="Коллекции" active={page === "cases"} onClick={() => go("cases")} />
        <NavButton icon={<Package />} label="Мои находки" active={page === "collection"} onClick={() => go("collection")} />
        <NavButton icon={<UserRound />} label="Профиль" active={page === "profile"} onClick={() => go("profile")} />
      </nav>
      <footer className="footer"><span>ЧИПИ ДРОП</span><span>DEMO COLLECTION · 2026</span></footer>
    </div>
  );
}

function CaseCard({ item, onClick }) {
  return <button className="case-card" onClick={onClick}>
    <div className={`case-art ${item.tone}`}><span>{item.emoji}</span><div className="art-glow" /></div>
    <div className="case-card-copy"><b>{item.name}</b><span>{item.subtitle}</span></div>
    <div className="case-card-action"><span>Бесплатно</span><ChevronRight size={16} /></div>
  </button>;
}

function NavButton({ icon, label, active, onClick }) {
  return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}>{icon}<span>{label}</span></button>;
}