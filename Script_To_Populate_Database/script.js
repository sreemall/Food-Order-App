const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'FoodOrderAppDB';

const readJsonFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`${filePath} file not found`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const insertUsers = async (db, users) => {
  const usersCollection = db.collection('users');
  const userInsertResults = await usersCollection.insertMany(users.map(({ id, ...rest }) => rest));
  console.log("Users inserted!");

  const userIdMap = {};
  Object.keys(userInsertResults.insertedIds).forEach(key => {
    const id = userInsertResults.insertedIds[key];
    const userId = users[key].id;
    userIdMap[userId] = id;
  });

  return userIdMap;
};

const insertUserSessions = async (db, userSessions, userIdMap) => {
  const userSessionsCollection = db.collection('usersessions');
  const userSessionsToInsert = userSessions.map(({ id, userId, ...rest }) => ({
    ...rest,
    userId: userIdMap[userId] 
}));

  await userSessionsCollection.insertMany(userSessionsToInsert);
  console.log("User sessions inserted!");
};

const insertCuisines = async (db, cuisines) => {
  const cuisinesCollection = db.collection('cuisines');
  const cuisineInsertResults = await cuisinesCollection.insertMany(cuisines.map(({ id, ...rest }) => rest));
  console.log("Cuisines inserted!");

  const cuisineIdMap = {};
  Object.keys(cuisineInsertResults.insertedIds).forEach(key => {
    const id = cuisineInsertResults.insertedIds[key];
    const cuisineId = cuisines[key].id;
    cuisineIdMap[cuisineId] = id;
  });

  return cuisineIdMap;
};

const insertCategories = async (db, categories) => {
  const categoriesCollection = db.collection('categories');
  const categoryInsertResults = await categoriesCollection.insertMany(categories.map(({ id, ...rest }) => rest));
  console.log("Categories inserted!");

  const categoryIdMap = {};
  Object.keys(categoryInsertResults.insertedIds).forEach(key => {
    const id = categoryInsertResults.insertedIds[key];
    const categoryId = categories[key].id;
    categoryIdMap[categoryId] = id;
  });

  return categoryIdMap;
};

const insertFooditems = async (db, fooditems, cuisineIdMap, categoryIdMap) => {
  const fooditemsCollection = db.collection('fooditems');
  const fooditemsToInsert = fooditems.map(({ id, cuisineId, categoryId,...rest }) => ({
    ...rest,
    cuisineId: cuisineIdMap[cuisineId],
    categoryId:categoryIdMap[categoryId]
}));

  const fooditemInsertResults = await fooditemsCollection.insertMany(fooditemsToInsert);
  console.log("Fooditems inserted!");

  const fooditemIdMap = {};
  Object.keys(fooditemInsertResults.insertedIds).forEach(key => {
    const id = fooditemInsertResults.insertedIds[key];
    const fooditemId = fooditems[key].id;
    fooditemIdMap[fooditemId] = id;
  });

  return fooditemIdMap;
};

const insertRestaurants = async (db, restaurants) => {
  const restaurantsCollection = db.collection('restaurants');
  const restaurantInsertResults = await restaurantsCollection.insertMany(restaurants.map(({ id, ...rest }) => rest));
  console.log("Restaurants inserted!");

  const restaurantIdMap = {};
  Object.keys(restaurantInsertResults.insertedIds).forEach(key => {
    const id = restaurantInsertResults.insertedIds[key];
    const restaurantId = restaurants[key].id;
    restaurantIdMap[restaurantId] = id;
  });

  return restaurantIdMap;
};

const insertMenus = async (db, menus, restaurantIdMap) => {
  const menusCollection = db.collection('menus');
  const menusToInsert = menus.map(({ id, restaurantId, ...rest }) => ({
    ...rest,
    restaurantId: restaurantIdMap[restaurantId],

}));

  const menuInsertResults = await menusCollection.insertMany(menusToInsert);
  console.log("Menus inserted!");

  const menuIdMap = {};
  Object.keys(menuInsertResults.insertedIds).forEach(key => {
    const id = menuInsertResults.insertedIds[key];
    const menuId = menus[key].id;
    menuIdMap[menuId] = id;
  });

  return menuIdMap;
};

const insertMenuItems = async (db, menuItems, menuIdMap, fooditemIdMap) => {
  const menuItemsCollection = db.collection('menuitems');
  const menuItemsToInsert = menuItems.map(({ id, menuId,fooditemId, ...rest }) => ({
    ...rest,
    menuId: menuIdMap[menuId],
    fooditemId : fooditemIdMap[fooditemId]

}));

  const menuItemInsertResults = await menuItemsCollection.insertMany(menuItemsToInsert);
  console.log("MenuItems inserted!");
};

const insertCarts = async (db, carts, restaurantIdMap, userIdMap) => {
  const cartsCollection = db.collection('carts');
  const cartsToInsert = carts.map(({ id, restaurantId, userId, ...rest }) => ({
    ...rest,
    restaurantId: restaurantIdMap[restaurantId],
    userId: userIdMap[userId]

}));

  const cartInsertResults = await cartsCollection.insertMany(cartsToInsert);
  console.log("Carts inserted!");

  const cartIdMap = {};
  Object.keys(cartInsertResults.insertedIds).forEach(key => {
    const id = cartInsertResults.insertedIds[key];
    const cartId = carts[key].id;
    cartIdMap[cartId] = id;
  });

  return cartIdMap;
};

const insertCartItems = async (db, cartItems, cartIdMap, fooditemIdMap) => {
  const cartItemsCollection = db.collection('cartItems');
  const cartItemsToInsert = cartItems.map(({ id, cartId,fooditemId, ...rest }) => ({
    ...rest,
    cartId: cartIdMap[cartId],
    fooditemId : fooditemIdMap[fooditemId]

}));

  const cartItemInsertResults = await cartItemsCollection.insertMany(cartItemsToInsert);
  console.log("CartItems inserted!");
};

const insertShippingDetails = async (db, shippingDetails) => {
  const shippingDetailsCollection = db.collection('shippingDetails');
  const shippingDetailsToInsert = shippingDetails.map(({ id, ...rest }) => rest);

  const shippingDetailInsertResults = await shippingDetailsCollection.insertMany(shippingDetailsToInsert);
  console.log("ShippingDetails inserted!");

  const shippingDetailIdMap = {};
  Object.keys(shippingDetailInsertResults.insertedIds).forEach(key => {
    const id = shippingDetailInsertResults.insertedIds[key];
    const shippingDetailId = shippingDetails[key].id;
    shippingDetailIdMap[shippingDetailId] = id;
  });

  return shippingDetailIdMap;
};

const insertOrders = async (db, orders, restaurantIdMap, userIdMap, shippingDetailsIdMap) => {
  const ordersCollection = db.collection('orders');
  const ordersToInsert = orders.map(({ id, restaurantId, userId, shippingDetailsId, ...rest }) => ({
    ...rest,
    restaurantId: restaurantIdMap[restaurantId],
    userId: userIdMap[userId],
    shippingDetailsId: shippingDetailsIdMap[shippingDetailsId]

}));

  const orderInsertResults = await ordersCollection.insertMany(ordersToInsert);
  console.log("Orders inserted!");

  const orderIdMap = {};
  Object.keys(orderInsertResults.insertedIds).forEach(key => {
    const id = orderInsertResults.insertedIds[key];
    const orderId = orders[key].id;
    orderIdMap[orderId] = id;
  });

  return orderIdMap;
};

const insertOrderItems = async (db, orderItems, orderIdMap, fooditemIdMap) => {
  const orderItemsCollection = db.collection('orderItems');
  const orderItemsToInsert = orderItems.map(({ id, orderId,fooditemId, ...rest }) => ({
    ...rest,
    orderId: orderIdMap[orderId],
    fooditemId : fooditemIdMap[fooditemId]

}));

  const orderItemInsertResults = await orderItemsCollection.insertMany(orderItemsToInsert);
  console.log("OrderItems inserted!");
};

const main = async () => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to the database!");

    const db = client.db(dbName);

    // Reading JSON data     
    const users = readJsonFile('data/users.json');
    const userSessions = readJsonFile('data/userSessions.json');
    const cuisines = readJsonFile('data/cuisines.json');
    const categories = readJsonFile('data/categories.json');
    const fooditems = readJsonFile('data/fooditems.json');
    const restaurants = readJsonFile('data/restaurants.json');
    const menus = readJsonFile('data/menus.json');
    const menuItems = readJsonFile('data/menuitems.json');
    const carts = readJsonFile('data/carts.json');
    const cartItems = readJsonFile('data/cartitems.json');
    const shippingDetails = readJsonFile('data/shippingDetails.json');
    const orders = readJsonFile('data/orders.json');
    const orderItems = readJsonFile('data/orderItems.json');
    
    // Insert data
    const userIdMap = await insertUsers(db, users);
    await insertUserSessions(db, userSessions, userIdMap);
    const categoryIdMap = await insertCategories(db, categories);
    const cuisineIdMap = await insertCuisines(db, cuisines);
    const fooditemIdMap = await insertFooditems(db, fooditems, cuisineIdMap, categoryIdMap);
    const restaurantIdMap = await insertRestaurants(db, restaurants);
    const menuIdMap = await insertMenus(db, menus, restaurantIdMap);
    await insertMenuItems(db, menuItems, menuIdMap, fooditemIdMap);
    const cartIdMap = await insertCarts(db, carts, restaurantIdMap, userIdMap);
    await insertCartItems(db, cartItems, cartIdMap, fooditemIdMap);
    const shippingDetailsIdMap = await insertShippingDetails(db, shippingDetails);
    const orderIdMap = await insertOrders(db, orders, restaurantIdMap, userIdMap, shippingDetailsIdMap);
    await insertOrderItems(db, orderItems, orderIdMap, fooditemIdMap);
    
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

main();