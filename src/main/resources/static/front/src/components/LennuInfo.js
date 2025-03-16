import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Istekohad from "./Istekohad";
import "../LennuInfo.css";


const LennuInfo = () => {
    const { id } = useParams();
    const [lend, setLend] = useState(null);
    const [loading, setLoading] = useState(true);
    const [valitudIstekohad, setValitudIstekohad] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/lennud/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setLend(data);
                setLoading(false);
            })
    }, [id]);

    if (loading) return <p>Laadimine...</p>;

    return (
        <div className="lennuinfo-wrapper">
                <h1>Lennuinfo</h1>
                <div className="info-container">
                <p><strong>Väljumiskoht:</strong> {lend.valjumiskoht}</p>
                <p><strong>Sihtkoht:</strong> {lend.sihtkoht}</p>
                <p><strong>Kuupäev:</strong> {lend.kuupaev}</p>
                <p><strong>Lennuaeg:</strong> {lend.lennuaeg}</p>
                <p><strong>Hind:</strong> {lend.hind} €</p>
                </div>
            <div className="istekohad-container">
                <Istekohad onValiIstekohad={setValitudIstekohad} />

            {valitudIstekohad.length > 0 && (
                <p className="valitud-istekohad">
                    <strong>Valitud istekohad:</strong> {valitudIstekohad.join(", ")}
                </p>
            )}
            </div>
        </div>
    );
};

export default LennuInfo;
