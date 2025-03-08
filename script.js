const champions = [
    {
        edition: "First",
        generation: 1,
        championNumber: 1,
        printChance: 33,
        rarity: "Rare",
        name: "Flami",
        evolutions: "Flami, Flamurai, Flamiguaken",
        title: "",
        skin: "Classic",
        crafted: "",
        element: "Fire",
        ability: "Inferno",
        manaCost: 2,
        attack: 3,
        health: 3
    }
];

function ChampionCard({ champion }) {
    return (
        <div className="champion-card">
            <h2>{champion.name} ({champion.rarity})</h2>
            <p>Element: {champion.element}</p>
            <p>Ability: {champion.ability}</p>
            <p>Stats: {champion.manaCost} Mana | {champion.attack} ATK | {champion.health} HP</p>
            <button>Buy Now</button>
        </div>
    );
}

function App() {
    return (
        <div>
            {champions.map((champ, index) => (
                <ChampionCard key={index} champion={champ} />
            ))}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('champions-root'));
