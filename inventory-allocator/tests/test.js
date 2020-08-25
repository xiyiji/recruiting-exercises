"use strict";

const {InventoryAllocator} = require("../InventoryAllocator");
const expect = require('chai').expect;

let allocator = new InventoryAllocator;

let testWarehouses = [
    {name: "San Jose", inventory: {apple: 4, banana: 2}},
    {name: "Sunnyvale", inventory: {apple: 2, pear: 2}}, 
    {name: "Stanford", inventory: {oranges: 8, beans: 5}},
    {name: "San Francisco", inventory: {pineapple: 2, banana: 2}},
    {name: "San Mateo", inventory: {pineapple: 4, grapes: 3}}
];

let test_no = 1;
describe(" Testing Inventory Allocator for warehouse shipping ", () => {
    describe(" computing possible orders", ()=> {
        it (" Should return an array of objects that ", (done) => {
            let testItems = {apple: 4, pear: 2, pineapple: 2};
            let expected_results = [
                {"San Jose": {apple: 4}},
                {"Sunnyvale": {pear: 2}},
                {"San Francisco": {pineapple: 2}}
            ];
            let results = allocator.calculateCheapest(testItems, testWarehouses);

            expect(results.length).to.equal(3);
            expect(JSON.stringify(results)).to.equal(JSON.stringify(expected_results));

            done();
        });
        it (" Should return an array of objects that contain the correct quantity of items required, sourced from a MULTIPLE warehouses (i.e. split) " , ( done ) => {
            let testItems= {apple: 6, pineapple: 6, banana: 4};
            let expected_results = [
                {"San Jose": {apple: 4}, "Sunnyvale": {apple: 2}},
                {"San Francisco": {pineapple: 2}, "San Mateo": {pineapple: 4}},
                {"San Jose": {banana: 2}, "San Francisco": {banana: 2}}
            ];
            let results = allocator.calculateCheapest(testItems, testWarehouses);
            
            expect(results.length).to.equal(3);
            expect(JSON.stringify(results)).to.equal(JSON.stringify(expected_results));
            done(); 
        });

        it (" Should return an array of objects that contain the correct quantity of items required, sourced from a MULTIPLE warehouses (i.e. split) " , ( done ) => {
            let testItems= {apple: 5, pineapple: 6, banana: 5};
            let expected_results = [
                {"San Jose": {apple: 4}, "Sunnyvale": {apple: 1}},
                {"San Francisco": {pineapple: 2}, "San Mateo": {pineapple: 4}},
            ];
            let results = allocator.calculateCheapest(testItems, testWarehouses);
            
            expect(results.length).to.equal(2);
            expect(JSON.stringify(results)).to.equal(JSON.stringify(expected_results));

            done(); 
        });
    });

    describe(" Computing impossible orders", () => {
        it ( " Should return an empty array as insufficient amount of inventory for each item was avaialble " , ( done ) => {
            let testItems = {apple: 7, pear: 3, pineapple: 10};
            let results = allocator.calculateCheapest(testItems, testWarehouses);
            expect(results.length).to.equal(0);
            done();
        });

        it ( " Should return an empty array as item is non-existent in any warehouse " , ( done ) => {
            let testItems = {sugar : 4, grapefruit: 2, carrots: 2};
            let results = allocator.calculateCheapest(testItems, testWarehouses);

            expect(results.length).to.equal(0);
            done();
        });

        it (" Should return an empty array as an empty object of items was given " , ( done ) => {
            let testItems = { };
            let results = allocator.calculateCheapest(testItems, testWarehouses);

            expect(results.length).to.equal(0);
            done();
        });

        it (" Should return an empty array as an empty array of warehosues was given ", (done) => {
            let testItems = {apple: 4, pear: 2, pineapple: 2};
            let testWarehouses = [];
            let results= allocator.calculateCheapest(testItems, testWarehouses);
            
            expect(results.length).to.equal(0);
            done();
        });
    });
})