function indexList(members, type, location) {
  let indexes = [];
  for (const member of members) {
    indexes.push({ index: member, type: type, location: location });
  }
  return indexes;
}

function indexFaqItems() {
  let accordion_titles = document.querySelectorAll(".accordion-button");

  return indexList(
    Array.from(accordion_titles).map((el) => el.innerHTML),
    "FAQs",
    "/index.html#faqs"
  );
}

function indexTeamMembers(members, type) {
  return Array.from(members).map((member) => ({index:member,type:type,location:`/about_us.html#team-${member.split(" ")[0].toLowerCase()}`}) )
}

function queryIndexes(query) {
  let indexed = [];
  for (const index of INDEXES) {
    if (index.index.toLowerCase().includes(query.toLowerCase())) {
      console.log(index);

      indexed.push(`
            <p class="search-result-item"><strong>${index.type}:</strong> <a href="${index.location}">${index.index}</a></p>
            <hr/>
            `);
    }
  }
  return indexed;
}

function initSearchBox() {
  // listen to search input
  let search_input = document.querySelector("input.search-input");
  let search_box = document.querySelector(".search-box");
  search_box.classList.add("d-none");
  ["keyup", "change"].forEach((evt) => {
    search_input.addEventListener(evt, (e) => {
      if (search_input.value.length > 1) {
        let indexed = queryIndexes(search_input.value);
        if (indexed.length > 0) {
          
          search_box.classList.remove("d-none");
          search_box.focus();
          search_box.innerHTML = indexed;
        }
      } else {
        search_box.classList.add("d-none");
      }
    });
  });
}

const INDEXES = [
  // Pages
  { index: "Home", type: "Page", location: "/index.html" },
  {
    index: "Achievemens",
    type: "Page",
    location: "/index.html#achievements",
  },
  { index: "FAQs", type: "Page", location: "/index.html#faqs" },
  { index: "About us", type: "Page", location: "/about_us.html" },
  { index: "What We Are About", type: "Section", location: "/about_us.html#what-we-are-about" },
  { index: "What we offer", type: "Section", location: "/about_us.html#what-we-offer" },
  { index: "Rules we follow as a team", type: "Section", location: "/about_us.html#wrules-we-follow" },
  { index: "Meet Our Team Members", type: "Section", location: "/about_us.html#team-members" },

  // Team Members
  ...indexTeamMembers(
    ["Nintai Dick", "Bibiche Tchinda", "Okechukwu Obiakor", "Nadege Tabi", "Omoteso Olulanke","Valentine Githae", "Neng Cindy", "Ajua Columbus", "Innocent Ikpetha", "Rebecca Adeola"],
    "Team Member",
  ),

  // FAQ links
  ...indexFaqItems(),
];

initSearchBox();
