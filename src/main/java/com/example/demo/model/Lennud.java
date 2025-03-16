package com.example.demo.model;


import jakarta.persistence.*;

@Entity
@Table(name = "lennud")
public class Lennud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String valjumiskoht;
    private String sihtkoht;
    private String kuupaev;
    private String lennuaeg;
    private int hind;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValjumiskoht() {
        return valjumiskoht;
    }

    public void setValjumiskoht(String valjumiskoht) {
        this.valjumiskoht = valjumiskoht;
    }

    public String getSihtkoht() {
        return sihtkoht;
    }

    public void setSihtkoht(String sihtkoht) {
        this.sihtkoht = sihtkoht;
    }

    public String getKuupaev() {
        return kuupaev;
    }

    public void setKuupaev(String kuupaev) {
        this.kuupaev = kuupaev;
    }

    public String getLennuaeg() {
        return lennuaeg;
    }

    public void setLennuaeg(String lennuaeg) {
        this.lennuaeg = lennuaeg;
    }

    public int getHind() {
        return hind;
    }

    public void setHind(int hind) {
        this.hind = hind;
    }
}
