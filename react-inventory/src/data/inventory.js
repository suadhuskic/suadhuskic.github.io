import faker from 'faker';
import shortid from 'shortid';

const allInventory = [];

// partNumber,
// name
// title
// description
// cost,
// qty

for(let i=0; i<5; i++) {

  allInventory.push({
    id: shortid.generate(),
    partNumber: faker.random.number(),
    name: faker.commerce.productName(),
    title: faker.commerce.productMaterial(),
    description: faker.lorem.sentence(),
    cost: faker.commerce.price(),
    qty: faker.random.number({min: 5, max: 10})
  })
}
export default allInventory;
