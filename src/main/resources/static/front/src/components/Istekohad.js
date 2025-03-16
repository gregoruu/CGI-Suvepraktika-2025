import React, { useState, useEffect } from "react";
import "../Istekohad.css";

const Istekohad = ({ onValiIstekohad }) => {
    const [hoivatudIstekohad, sethoivatudIstekohad] = useState([]);
    const [valitudIstekohad, setValitudIstekohad] = useState([]);
    const [piletiteArv, setPiletiteArv] = useState(1);
    const [soovibAknakohta, setSoovibAknakohta] = useState(false);
    const [soovibVahekaigukohta, setSoovibVahekaigukohta] = useState(false);
    const [soovibRohkemJalaruumi, setSoovibRohkemJalaruumi] = useState(false);
    const [soovibValjapaasulLahedale, setsoovibValjapaasulLahedale] = useState(false);
    const [soovibKoosIstuda, setSoovibKoosIstuda] = useState(false);
    const [soovitatudKohad, setSoovitatudKohad] = useState([]);

    const read = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const veerud = 6;

    useEffect(() => {
        if (hoivatudIstekohad.length === 0) {
            const hõivatud = [];
            for (let i = 0; i < 15; i++) {
                const row = read[Math.floor(Math.random() * read.length)];
                const col = Math.floor(Math.random() * veerud) + 1;
                hõivatud.push(`${row}${col}`);
            }
            sethoivatudIstekohad(hõivatud);
        }
    }, []);

    useEffect(() =>{
        const leiaSoovitatudKohad = ()=>{
            let võimalikudKohad = read.flatMap((row) =>
                Array.from({ length: veerud }, (_, col) => `${row}${col + 1}`)
            ).filter((iste) => !hoivatudIstekohad.includes(iste));

            if (!(soovibAknakohta || soovibVahekaigukohta || soovibRohkemJalaruumi || soovibValjapaasulLahedale || soovibKoosIstuda)) {
                return [];
            }

            let sobivadKohad =võimalikudKohad;

            if (soovibAknakohta){
                sobivadKohad = sobivadKohad.filter((iste) => iste.endsWith("1") || iste.endsWith("6"));
            }
            if (soovibVahekaigukohta){
                sobivadKohad = sobivadKohad.filter((iste) => iste.endsWith("3") || iste.endsWith("4"));
            }
            if (soovibRohkemJalaruumi){
                sobivadKohad = sobivadKohad.filter((iste) => iste.startsWith("A"));
            }
            if (soovibValjapaasulLahedale){
                sobivadKohad = sobivadKohad.filter((iste) => ["A", "B", "G", "H"].some((rida) => iste.startsWith(rida)));
            }

            if (piletiteArv > 1){
                let soovitatudGrupid=[];

                read.forEach((row) =>{
                    let järjestikusedKohad = [];

                    for (let col = 1; col <= veerud; col++) {
                        const iste = `${row}${col}`;

                        if (sobivadKohad.includes(iste)){
                            järjestikusedKohad.push(iste);

                            if (järjestikusedKohad.length ===piletiteArv) {
                                soovitatudGrupid.push([...järjestikusedKohad]);
                                break;
                            }
                        } else {
                            järjestikusedKohad = [];
                        }
                    }
                });

                return soovitatudGrupid.length ? soovitatudGrupid[0] : [];
            }

            return sobivadKohad;
        };

        setSoovitatudKohad(leiaSoovitatudKohad());
    }, [piletiteArv, soovibAknakohta, soovibVahekaigukohta, soovibRohkemJalaruumi, soovibValjapaasulLahedale, soovibKoosIstuda, hoivatudIstekohad]);

    const valiIste = (iste) =>{
        if (hoivatudIstekohad.includes(iste)) return;
        const uusValik = valitudIstekohad.includes(iste)
            ? valitudIstekohad.filter((i) => i !== iste)
            : [...valitudIstekohad, iste];
        setValitudIstekohad(uusValik);
        onValiIstekohad(uusValik);
    };

    return (
        <div className="istekohad-container">
            <h2>Vali istekoht</h2>

            <div className="filtrid">
                <label>
                    Piletite arv:
                    <input type="number" min="1" max="6" value={piletiteArv} onChange={(e) => setPiletiteArv(Number(e.target.value))} />
                </label>
                <label>
                    <input type="checkbox" checked={soovibAknakohta} onChange={() => setSoovibAknakohta(!soovibAknakohta)} />
                    Akna all
                </label>
                <label>
                    <input type="checkbox" checked={soovibVahekaigukohta} onChange={() => setSoovibVahekaigukohta(!soovibVahekaigukohta)} />
                    Vahekäigus
                </label>
                <label>
                    <input type="checkbox" checked={soovibRohkemJalaruumi} onChange={() => setSoovibRohkemJalaruumi(!soovibRohkemJalaruumi)} />
                    Rohkem jalaruumi
                </label>
                <label>
                    <input type="checkbox" checked={soovibValjapaasulLahedale} onChange={() => setsoovibValjapaasulLahedale(!soovibValjapaasulLahedale)} />
                    Lähedal väljapääsule
                </label>
                <label>
                    <input type="checkbox" checked={soovibKoosIstuda} onChange={() => setSoovibKoosIstuda(!soovibKoosIstuda)} />
                    Istuge kõrvuti
                </label>
            </div>

            <div className="istekohad-grid">
                {read.map((row) => (
                    <div key={row} className="istekohad-row">
                        <span className="row-label">{row}</span>
                        {Array.from({ length: veerud }, (_, col) => {
                            const iste = `${row}${col + 1}`;
                            return (
                                <button
                                    key={iste}
                                    className={`istekoht 
                                        ${hoivatudIstekohad.includes(iste) ? "hõivatud" : ""}
                                        ${valitudIstekohad.includes(iste) ? "valitud" : ""}
                                        ${soovitatudKohad.includes(iste) ? "soovitatud" : ""}`}
                                    onClick={() => valiIste(iste)}
                                >
                                    {col + 1}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Istekohad;
