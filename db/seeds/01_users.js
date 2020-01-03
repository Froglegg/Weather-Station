exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          userName: "froggleg",
          email: "frogboi@gmail.com",
          password: "pass123",
          primaryLocation: "Atlanta",
          locations: JSON.stringify({
            locations: [
              "Atlanta",
              "Asheville",
              "Boone",
              "San Diego",
              "Nanjing",
              "Yosemite",
              "Prague"
            ]
          }),
          hobby: "doing stuff"
        }
      ]);
    });
};
