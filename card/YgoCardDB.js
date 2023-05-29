import sqlite from "sqlite3";
import YgoCard from "./YgoCard.js";
import fs from "fs";

const sqlite3 = sqlite.verbose();

function initDB() {
    fs.mkdirSync('./db', {recursive: true});// create the directory if missing
    let ygoCardDb = new sqlite3.Database('./db/YgoCardDB.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    let createTableSQL = 'CREATE TABLE IF NOT EXISTS ygoCards ( id NUMERIC PRIMARY KEY, name VARCHAR , numberOwned INTEGER , type VARCHAR,race VARCHAR)';
    ygoCardDb.exec(createTableSQL);
    return ygoCardDb;
}

function closeDB(ygoCardDb) {
    ygoCardDb.close((err) => {
        if (err) {
            return console.error(err.message);
        }
    });
}


export function loadAllCards() {
    let ygoCardDb = initDB();
    let cards = [];
    let loadAllCardsSql = 'select * from ygoCards order by id';

    ygoCardDb.all(loadAllCardsSql, (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            let ygoCard = new YgoCard(row.id,row.name,row.numberOwned,row.type,row.race);
            cards.push(ygoCard);
        });
    });
    closeDB(ygoCardDb);
    return cards;
}

export function addCard(card) {
    let ygoCardDb = initDB();
    let cards = [];
    ygoCardDb.run('INSERT INTO ygoCards(id,name,numberOwned,type,race) values(?,?,?,?,?)',
        card.id,card.name,card.numberOwned,card.type,card.race);

    closeDB(ygoCardDb);
    return cards;
}

export function deleteCard(id) {
    let ygoCardDb = initDB();
    let cards = [];
    ygoCardDb.run('DELETE FROM ygoCards WHERE ID is ?', id);

    closeDB(ygoCardDb);
    return cards;
}

export function updateCard(id, numberOwned) {
    let ygoCardDb = initDB();
    let cards = [];
    ygoCardDb.run('UPDATE ygoCards SET numberOwned=? WHERE ID is ?', numberOwned, id);

    closeDB(ygoCardDb);
    return cards;
}

