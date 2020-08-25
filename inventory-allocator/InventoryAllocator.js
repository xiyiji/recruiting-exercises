class InventoryAllocator {

    constructor(){};

    calculateCheapest(items, warehouses) {
        let results = [];

        if (Object.keys(items).length == 0 || warehouses.length ==0) {
            return results;
        } 
        for (let current_item of Object.keys(items)) {
            let {[current_item]: amount_required} = items;
            let stock_found = {};
            let index = 0;

            while (amount_required >0 && index < warehouses.length) {
                let {name : warehouse_name} = warehouses[index];
                let {inventory: {[current_item]: amount_available} } = warehouses[index];
                let amount_taken = 0;
                if (amount_available != undefined && amount_available > 0) {
                    if (amount_available > amount_required) {
                        warehouses[index].inventory[warehouse_name] = amount_available - amount_required;
                        amount_taken = amount_available - amount_required;
                        amount_required = 0;
                    }else {
                        warehouses[index].inventory[warehouse_name] = 0;
                        amount_taken = amount_available;
                        amount_required -= amount_available;
                    }
                    stock_found[warehouse_name] = {[current_item]: amount_taken};
                }
                index++;
            }
            if (Object.keys(stock_found).length > 0 && amount_required == 0) {
                results.push(stock_found);
            } 
        }
        return results;
    }
};

module.exports.InventoryAllocator = InventoryAllocator;