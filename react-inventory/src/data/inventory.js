import faker from 'faker';

const allInventory = [];

// partNumber,
// name
// title
// description
// cost,
// qty

for(let i=0; i<5; i++) {

  allInventory.push({
    partNumber: faker.random.number(),
    name: faker.commerce.productName(),
    title: faker.commerce.productMaterial(),
    description: faker.lorem.sentence(),
    cost: faker.commerce.price(),
    qty: faker.random.number({min: 5, max: 10})
  })
}

console.log(allInventory);

export default allInventory;
