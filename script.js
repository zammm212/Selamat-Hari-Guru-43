
const namaGuru = [
  "Bu Fauziah",
  "Bu Sri Karyati",
  "Bu Yunia",
  "Bu Hartati",
  "Bu Kustriani",
  "Bu Kis",

  "Bu Wiwin",
  "Bu Maryanah",
  "Bu Mahsunah",
  "Pak Zainul",
  "Bu Kafinah",
  "Bu Susi",

  "Bu Sumirah",
  "Mam Reni",
  "Bu Yulita",
  "Pak Ula",
  "Bu Fitri",
  "Bu Nurul"
];

const greetings = Array.from({ length: 30 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  const classes = [
    "7A", "7B", "7C", "7D", "7E", "7F",
    "8A", "8B", "8C", "8D", "8E", "8F",
    "9A", "9B", "9C", "9D", "9E", "9F"
  ];

  let from;
  let to;

  if (index < 18) {
    from = `Kelas ${classes[index]}`;
    to = namaGuru[index];
  } else if (index < 30) {
    from = "Keluarga SMPN 43";
    const namaTK = [
  "Bu Siti Sumarwati",
  "Bu Khoer",
  "Bu Aisyah",
  "Bu Irma",
  "Pak fathul",
      "Pak Paryono",
      "Bu Indah",
     "Pak Restu",
      "Bu There",
      "Bu Nisa",
      "Pak Bagus"
];

to = namaTK[index - 18];
  } else {
    from = "Keluarga SMPN 43";
    to = `Keluarga SMPN 43 ${index - 22}`;
  }

  return {
    id: index + 1,
    from,
    to,
    photo: index < 18
  ? `assets/foto/guru-${classes[index]}.jpg`
  : `assets/foto/guru-mapel-${String(index - 17).padStart(2, "0")}.jpg`,
    video: "",
    ratio: ["4 / 5", "3 / 4", "1 / 1", "4 / 3", "5 / 4"][index % 5]
  };
});

const gallery = document.getElementById("gallery");
const visibleCount = document.getElementById("visibleCount");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");

let activeCategory = "7";

function showPage(page) {
  document.querySelectorAll(".page").forEach(element => {
    element.classList.remove("active");
  });

  if (page === "gallery") {
    document.getElementById("galleryPage").classList.add("active");
    renderCards(greetings);
  } else {
    document.getElementById("home").classList.add("active");
  }
}

function showCategory(category) {
  activeCategory = category;
  renderCards(greetings);
}

function renderCards(items) {
  gallery.innerHTML = "";

  gallery.classList.remove("category-animate");
  void gallery.offsetWidth;
  gallery.classList.add("category-animate");
  
  const categories = [
    { id: "7", name: "Angkatan 7" },
    { id: "8", name: "Angkatan 8" },
    { id: "9", name: "Angkatan 9" },
    { id: "tk", name: "Guru Lainnya" },
  ];

  const nav = document.createElement("div");
  nav.className = "category-nav";

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category.name;

    if (activeCategory === category.id) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      showCategory(category.id);
    });

    nav.appendChild(button);
  });

  gallery.appendChild(nav);

  let members = [];

  if (["7", "8", "9"].includes(activeCategory)) {
    const start = (Number(activeCategory) - 7) * 6;

    members = items.filter(item =>
      item.id >= start + 1 &&
      item.id <= start + 6
    );
  } else if (activeCategory === "tk") {
    members = items.filter(item =>
      item.id >= 19 && item.id <= 30
    );
  }

  const heading = document.createElement("h2");
  heading.textContent = categories.find(
    category => category.id === activeCategory
  ).name;

  gallery.appendChild(heading);

  const grid = document.createElement("div");
  grid.className = "gallery-group-cards";

  members.forEach(item => {
    const card = document.createElement("button");
    card.className = "video-card";
    card.type = "button";

    const photo = document.createElement("div");
    photo.className = "card-photo";

    const placeholder = document.createElement("div");
    placeholder.className = "photo-placeholder";

    const number = document.createElement("span");
    number.className = "photo-index";
    number.textContent = String(item.id).padStart(2, "0");

    const small = document.createElement("small");
    small.textContent = "FOTO UCAPAN";

    placeholder.append(number, small);
    photo.appendChild(placeholder);

    if (item.photo) {
      const img = document.createElement("img");
      img.src = item.photo;
      img.alt = `Foto ${item.to}`;
      img.loading = "lazy";

      img.onload = () => {
        placeholder.style.display = "none";
        photo.classList.add("has-image");
      };

      photo.appendChild(img);
    }

    const meta = document.createElement("div");
    meta.className = "card-meta";

    const from = document.createElement("span");
    from.textContent = `FROM · ${item.from}`;

    const arrow = document.createElement("span");
    arrow.className = "card-arrow";
    arrow.textContent = "↗";

    meta.append(from, arrow);

    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = `To ${item.to}`;

    card.append(photo, meta, title);

    card.addEventListener("click", () => openVideo(item));

    grid.appendChild(card);
    const directions = [
  ["-100vw", "0"],
  ["100vw", "0"],
  ["0", "-100vh"],
  ["0", "100vh"],
  ["-100vw", "-100vh"],
  ["100vw", "100vh"],
  ["100vw", "-100vh"],
  ["-100vw", "100vh"]
];

const direction = directions[Math.floor(Math.random() * directions.length)];

card.style.setProperty("--x", direction[0]);
card.style.setProperty("--y", direction[1]);
  });

  gallery.appendChild(grid);

  visibleCount.textContent = members.length;
  emptyState.hidden = members.length !== 0;
}

function openVideo(item) {
  document.getElementById("modalTitle").textContent =
    `${item.from} → ${item.to}`;

  document.getElementById("modalFrom").textContent =
    `FROM: ${item.from}`;

  document.getElementById("modalTo").textContent =
    `TO: ${item.to}`;

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  if (item.video) {
    modalVideo.src = item.video;
    modalVideo.classList.add("ready");
    videoPlaceholder.hidden = true;
    modalVideo.load();
  } else {
    modalVideo.classList.remove("ready");
    videoPlaceholder.hidden = false;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  document.body.style.overflow = "";
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  const filtered = greetings.filter(item =>
    `${item.from} ${item.to}`.toLowerCase().includes(query)
  );

  renderCards(filtered);
});

document.getElementById("closeModal")
  .addEventListener("click", closeVideo);

modal.addEventListener("click", event => {
  if (event.target.dataset.close === "true") {
    closeVideo();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeVideo();
  }
});

renderCards(greetings);
