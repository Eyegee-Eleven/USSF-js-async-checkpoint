#!/usr/bin/env node
//occam's razor

const fs = require('fs');
const fetch = require('node-fetch')
const pokemonNames = process.argv[2];

var pokeContent = (fs.readFileSync(pokemonNames).toString()).split("\n");
pokeContent = pokeContent.map(i => i.toLowerCase());

 let atributes = (pokeContent) => {
     pokeContent.forEach(element => {
            var name = element;
            fetch(`https://pokeapi.co/api/v2/pokemon/${element}`)
                .then(response => response.json())
                .then(data => {
                    let pokeTypes = data.types;
                    name = name[0].toUpperCase() + name.substr(1,name.length).toLowerCase();
                    let output = name + ":";
                    pokeTypes.forEach(j => {
                        if (j.slot == 1) {
                            output = output + " " + j.type.name
                        } else {
                            output = output + ", " + j.type.name
                        }
                    });
                    console.log(output);
                });
     });
 }

atributes(pokeContent);


// const chalk = require("chalk");
// const boxen = require("boxen");

// const greeting = chalk.white.bold("Hello!");

// const boxenOptions = {
//  padding: 1,
//  margin: 1,
//  borderStyle: "round",
//  borderColor: "green",
//  backgroundColor: "#555555"
// };
// const msgBox = boxen( greeting, boxenOptions );

// console.log(msgBox);