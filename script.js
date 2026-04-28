// --- 1. DATA LOAD ---

db.orders.insertMany([
  { "Order ID": "CA-2016-152156", "Category": "Furniture", "Region": "South", "Sales": 261.96, "Profit": 41.91, "Ship Mode": "Second Class" },
  { "Order ID": "CA-2016-138688", "Category": "Office Supplies", "Region": "West", "Sales": 14.62, "Profit": 6.87, "Ship Mode": "Second Class" },
  { "Order ID": "US-2015-108966", "Category": "Furniture", "Region": "South", "Sales": 957.57, "Profit": -383.03, "Ship Mode": "Standard Class" },
  { "Order ID": "CA-2014-115812", "Category": "Technology", "Region": "West", "Sales": 907.15, "Profit": 90.71, "Ship Mode": "First Class" },
  { "Order ID": "CA-2017-114412", "Category": "Office Supplies", "Region": "South", "Sales": 15.55, "Profit": 5.44, "Ship Mode": "Standard Class" }
  // We can add more rows here from given CSV
]);

// --- 2. THE 10 QUERIES ---

// Q1: Retrieve and print all documents
print("Q1: All Documents:", db.orders.find().toArray());

// Q2: Count and display total number of documents
print("Q2: Total Count:", db.orders.countDocuments());

// Q3: Fetch all orders from the 'West' region
print("Q3: West Region Orders:", db.orders.find({ "Region": "West" }).toArray());

// Q4: Find orders where Sales is greater than 500
print("Q4: Sales > 500:", db.orders.find({ "Sales": { $gt: 500 } }).toArray());

// Q5: Fetch top 3 orders with the highest Profit
print("Q5: Top 3 Profit:", db.orders.find().sort({ "Profit": -1 }).limit(3).toArray());

// Q6: Update all orders with Ship Mode 'First Class' to 'Premium Class'
db.orders.updateMany({ "Ship Mode": "First Class" }, { $set: { "Ship Mode": "Premium Class" } });
print("Q6: Update complete.");

// Q7: Delete all orders where Sales is less than 50
db.orders.deleteMany({ "Sales": { $lt: 50 } });
print("Q7: Delete complete.");

// Q8: Group by Region and calculate total sales per region
print("Q8: Total Sales by Region:", db.orders.aggregate([
  { $group: { _id: "$Region", totalSales: { $sum: "$Sales" } } }
]).toArray());

// Q9: Fetch all distinct values for Ship Mode
print("Q9: Distinct Ship Modes:", db.orders.distinct("Ship Mode"));

// Q10: Count the number of orders for each category
print("Q10: Order Count by Category:", db.orders.aggregate([
  { $group: { _id: "$Category", count: { $sum: 1 } } }
]).toArray());
