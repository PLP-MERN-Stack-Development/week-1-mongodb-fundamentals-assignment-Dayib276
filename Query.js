// Connect to your database first:
const uri = 'mongodb+srv://dayibidris:Dayib14105@cluster0.sycal2r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// In MongoDB Shell: use plp_bookstore

// ------------------------------
// 📦 Task 2: Basic CRUD Operations
// ------------------------------

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// ------------------------------
// 🔍 Task 3: Advanced Queries
// ------------------------------

// 1. Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 2. Projection: return only title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 4. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 5. Pagination: limit to 5 books per page (e.g., page 2)
db.books.find()
  .skip(5)
  .limit(5);

// ------------------------------
// 🧮 Task 4: Aggregation Pipelines
// ------------------------------

// 1. Calculate average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  }
]);

// 2. Find the author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// ------------------------------
// 🧠 Task 5: Indexing and Performance
// ------------------------------

// 1. Create an index on the title field
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 3. Use explain() to demonstrate performance (e.g., with author)
db.books.find({ author: "George Orwell" }).explain("executionStats");
