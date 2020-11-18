#!/usr/bin/env node
//occam's razor

const chalk = require("chalk");
const boxen = require("boxen");
const fs = require('fs');
const fetch = require('node-fetch')
const pokemonNames = process.argv[2];

var pokeContent = (fs.readFileSync(pokemonNames).toString()).split("\n");
pokeContent = pokeContent.map(pokemonName => pokemonName.toLowerCase());

 let atributes = (pokeContent) => {
     pokeContent.forEach(element => {
            var name = element;
            fetch(`https://pokeapi.co/api/v2/pokemon/${element}`)
                .then(response => response.json())
                .then(data => {
                    let pokeTypes = data.types;
                    name = name[0].toUpperCase() + name.substr(1,name.length).toLowerCase();
                    let output = name + ":";
                    pokeTypes.forEach(typeObject => {
                        if (typeObject.slot == 1) {
                            output = output + " " + typeObject.type.name
                        } else {
                            output = output + ", " + typeObject.type.name
                        }
                    });
                    console.log(output);
                });
     });
 }

atributes(pokeContent);




// const greeting = chalk.white.bold("Hello!");

// const boxenOptions = {
//  padding: 1,
//  margin: 1,
//  borderStyle: "round",
//  borderColor: "green",
//  backgroundColor: "#555555"
// };
// const msgBox = boxen( atributes(pokeContent), boxenOptions );

// console.log(msgBox);