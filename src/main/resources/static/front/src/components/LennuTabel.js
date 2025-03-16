import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LennuTabel = () => {
    const [lennud, setLennud] = useState([]);
    const navigate = useNavigate();
    const [filterLennud, setFilterLennud] = useState([]);
    const [otsiValjumiskoht, setOtsiValjumiskoht] = useState("");
    const [otsiSihtkoht, setOtsiSihtkoht] = useState("");
    const [maxHind, setMaxHind] = useState("");
    const [minHind, setMinHind] = useState("");
    useEffect(() => {
        fetch("http://localhost:8080/api/lennud")
            .then((vastus) => vastus.json())
            .then((andmed) => {
                setLennud(andmed);
                setFilterLennud(andmed);
            })
    }, []);

    useEffect(() => {
        let filtered = lennud;

        if (otsiValjumiskoht) {
            filtered = filtered.filter((lend) =>
                lend.valjumiskoht.toLowerCase().includes(otsiValjumiskoht.toLowerCase())
            );
        }
        if (otsiSihtkoht) {
            filtered = filtered.filter((lend) =>
                lend.sihtkoht.toLowerCase().includes(otsiSihtkoht.toLowerCase())
            );
        }

        if (minHind) {
            filtered = filtered.filter((lend) => lend.hind >= parseFloat(minHind));
        }
        if (maxHind) {
            filtered = filtered.filter((lend) => lend.hind <= parseFloat(maxHind));
            }


        setFilterLennud(filtered);
    }, [otsiValjumiskoht, otsiSihtkoht, minHind, maxHind, lennud]);


    return (
        <div className="konteiner">
            <h1>Lennuplaan</h1>
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Otsi väljumiskoha järgi"
                    value={otsiValjumiskoht}
                    onChange={(e) => setOtsiValjumiskoht(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Otsi sihtkoha järgi"
                    value={otsiSihtkoht}
                    onChange={(e) => setOtsiSihtkoht(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min hind (€)"
                    value={minHind}
                    onChange={(e) => setMinHind(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max hind (€)"
                    value={maxHind}
                    onChange={(e) => setMaxHind(e.target.value)}
                />

            </div>

            <table>
                <thead>
                <tr>
                    <th>Väljumiskoht</th>
                    <th>Sihtkoht</th>
                    <th>Kuupäev</th>
                    <th>Lennuaeg</th>
                    <th>Hind (€)</th>
                </tr>
                </thead>
                <tbody>
                {filterLennud.map((lend) => (
                    <tr
                        key={lend.id}
                        onClick={() => navigate(`/lend/${lend.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{lend.valjumiskoht}</td>
                        <td>{lend.sihtkoht}</td>
                        <td>{lend.kuupaev}</td>
                        <td>{lend.lennuaeg}</td>
                        <td>{lend.hind} €</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LennuTabel;